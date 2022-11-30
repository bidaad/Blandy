import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { responseModel } from "../../model/general/responseModel";
import { APIUrl } from "../../helper/config";
import * as UserInfo from "../../store/UserInfo";
import { VwCategorySelectionType } from "../../model/viewModel/VwCategorySelectionType";

import { connect } from "react-redux";
import { ApplicationState } from "../../store";
export interface VwHoomTools {
  brands: any;
  brand: string;
  brandName: string;
  products: any;
  product: string;
  productName: string;
  seacrh: boolean;
}
type UserProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & { match: any; location: any; history: any };
// type UserProps = { props: any };
const HomeTools = (props: UserProps) => {
  const [,setHomeTools] = useState<VwHoomTools>({
    brand: "",
    brandName: "",
    brands: [],
    products: [],
    product: "",
    productName: "",
    seacrh: false,
  });
  const [, setSelectedCats] = useState<VwCategorySelectionType[]>(
    []
  );

  const getSelectedCats = (selectionType: string) => {
    fetch(
      APIUrl +
      "/CategorySelectionType/GetSelectedCategories/?SelectionTypeCode=" +
      selectionType,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {

        if (selectionType === "5") {

          setSelectedCats(responseModel.data);
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getBrands(props);
    getSelectedCats("5");
  }, []);
  async function getBrands(props: any) {
    fetch(APIUrl + "/Brand/GetBrandsForCarSearch?pageSize=1000&Lang=fa", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setHomeTools({
            brands: (responseModel as responseModel).data,
            brand: "",
            brandName: "",
            product: "",
            productName: "",
            products: [],
            seacrh: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="outer-center">
      <div className="inner-center">


        <div className="second-features">

          <div className="row ">
            <div className="col">
              <div className="featured-cat featured-cat-zemanat">
                <div className="featured-cat-icon">
                  <img
                    src={require("../../img/Return-Purchase.png")}
                    alt="ضمانت بازگشت"
                  />
                </div>
                <div>
                  ضمانت بازگشت
            </div>
              </div>
            </div>
            <div className="col">
              <div className="featured-cat featured-cat-zemanat">
                <div className="featured-cat-icon">
                  <img
                    src={require("../../img/Warranty-Card.png")}
                    alt="ضمانت اصل بودن کالا"
                  />
                </div>
                <div>
                  ضمانت اصل بودن کالا
            </div>
              </div>
            </div>
            <div className="col">
              <div className="featured-cat featured-cat-zemanat">
                <div className="featured-cat-icon">
                  <img
                    src={require("../../img/Online-Support.png")}
                    alt="پشتیبانی 24 ساعته"
                  />
                </div>
                <div>
                  پشتیبانی 24 ساعته
            </div>
              </div>
            </div>
            <div className="col">
              <div className="featured-cat featured-cat-zemanat">
                <div className="featured-cat-icon">
                  <img
                    src={require("../../img/Deliver-Food.png")}
                    alt="تحویل سریع"
                  />
                </div>
                <div>
                  تحویل سریع
                  </div>
              </div>
            </div>
            <div className="col">
              <div className="featured-cat featured-cat-zemanat">
                <div className="featured-cat-icon">
                  <img
                    src={require("../../img/Cash-In-Hand.png")}
                    alt="پرداخت محل"
                  />
                </div>
                <div>
                  پرداخت محل
                  </div>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(HomeTools as any);
