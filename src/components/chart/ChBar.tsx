import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
type ChartProps = any & { action: string; title: string; lable: string };
const ChBar = (props: ChartProps) => {
  const [lables, setlables] = useState();
  const [values, setvalues] = useState();
  
  useEffect(() => {
    function SalesMonth() {
      fetch(APIUrl + "/User/"+props.action, {
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
  const data = {
    labels: lables,
    datasets: [
      {
        label: props.lable,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: values,
      },
    ],
  };

  return (
   
      <div>
        {/* <h5 className="horizontalBarTitr">

        </h5> */}


        <Bar
          data={data}
          width={500}
          height={300}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ChBar as any);
