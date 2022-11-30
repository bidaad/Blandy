import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
type ChartProps = any & { action: string; title: string; lable: string };

const ChHorizontalBar = (props: ChartProps) => {
  const [lables, setlables] = useState();
  const [values, setvalues] = useState();
  
  const data = {
    labels: lables,
    datasets: [
      {
        label: props.lable,
        backgroundColor: "rgba(10,40,200,0.2)",
        borderColor: "rgba(10,40,200,1)",
        borderWidth: 1,
        font: "irsans",
        hoverBackgroundColor: "rgba(10,40,200,0.4)",
        hoverBorderColor: "rgba(10,40,200,1)",
        data: values,
      },
    ],
  };
  useEffect(() => {
    function SalesMonth() {
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
        .catch(() => {});
    }
    
    SalesMonth();
  }, []);
  return (

      <HorizontalBar data={data}  width={500}
          height={300} />

  );
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ChHorizontalBar as any);
