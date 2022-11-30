import React, { useEffect } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
type ChartProps = any & { action: string; title: string; lable: string };

const ChPie = (props: ChartProps) => {
  const [lables, setlables] = useState();
  const [values, setvalues] = useState();


  function VisitedBrand() {
     
    fetch(APIUrl + "/User/" + props.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.data) {
           
          setlables(
            responseModel.data.map(function (v: any) {
              return v.lable;
            })
          );
          setvalues(
            responseModel.data.map(function (v: any) {
              return v.value1;
            })
          );

    
        }
      })
      .catch(() => {
        
      });
  }



  const data = {
    labels:lables,
    datasets: [{
        data: values,
        backgroundColor: [
          '#ff0000',
          '#ff8000',
          '#ffff00',
          '#00ff40',
          '#00bfff',
          '#8000ff',
          '#ff00bf',
          '#0080ff',
          '#ffbf00',
          '#4000ff'
      ],
        hoverBackgroundColor:[
          '#ff0000',
          '#ff8000',
          '#ffff00',
          '#00ff40',
          '#00bfff',
          '#8000ff',
          '#ff00bf',
          '#ff0000',
          '#ffbf00',
          '#4000ff'
      ]
    }]
};
  useEffect(() => {
    VisitedBrand();
  }, []);
  return <Pie data={data as any} width={500} height={300} />;
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ChPie as any);
