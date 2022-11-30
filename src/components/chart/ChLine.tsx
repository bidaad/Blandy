import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
type ChartProps = any & { action: string; title: string; lable: string };


const ChLine = (props: ChartProps) => {
    const [lables, setlables] = useState();
    const [values, setvalues] = useState();
    
    const data = {
        labels: lables,
        datasets: [
          {
            label: props.lable,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:values,
          },
        ],
      };
    useEffect(() => {
      function VisitedUser() {
         
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
          .catch((error) => {
               
          });
      }
      
        VisitedUser();
      }, []);
  return (

      <Line data={data as any}  width={500}
          height={300} />

  );
};
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
  )(ChLine as any);

