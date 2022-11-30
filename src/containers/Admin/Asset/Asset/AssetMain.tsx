import * as UserStore from "../../../../store/User";
import { RouteComponentProps } from "react-router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as UserInfo from "../../../../store/UserInfo";
import { ApplicationState } from "../../../../store";

import Product_Header from "../../../../components/user/ProductHeader";
import { APIUrl } from "../../../../helper/config";
import { responseModel } from "../../../../model/general/responseModel";
import { VwUserProductSearch } from "../../../../model/viewModel/VwUserAssetSearch";
import ProductItem from "../../../../components/user/ProductItem";
import HomeTools from "../../../../components/user/HomeTools";

type UserProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & RouteComponentProps<{}>;

const AssetMain = (props: UserProps) => {
  const [BestSellingAssets, setBestSellingAssets] = useState<
    VwUserProductSearch[]
  >([]);
  const [, setMostPopularAssets] = useState<
    VwUserProductSearch[]
  >([]);
  const [, setNewestAssets] = useState<VwUserProductSearch[]>([]);
  const [, setMostVisitedAssets] = useState<
    VwUserProductSearch[]
  >([]);

  const getSelectedAssets = (selectionType: string) => {
    fetch(
      APIUrl +
        "/AssetSelectionType/GetSelectedAssets/?SelectionTypeCode=" +
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
        if (selectionType === "1") setBestSellingAssets(responseModel.data);
        if (selectionType === "2") setMostPopularAssets(responseModel.data);
        if (selectionType === "3") setNewestAssets(responseModel.data);
        if (selectionType === "4") setMostVisitedAssets(responseModel.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getSelectedAssets("1");
    //props.UserLoad(false);
    // getSelectedAssets("2");
    // getSelectedAssets("3");
    // getSelectedAssets("4");
  }, []);

  return (
    <div>
      <div className="container">
        <div className="bg-pattern2" />
      </div>
      <Product_Header />
      <div className="container">
        <div className="bg-pattern2" />
      </div>

      <div className="container">
        <div className="outer-center">
          <div className="inner-center">
            <div className="row ">
              <div className="col">
                <div className="featured-cat">
                  <div className="featured-cat-icon">
                    <img
                      src={require("../../../../img/Kitchen.png")}
                      alt="لوازم آشپزخانه"
                    />
                  </div>
                  <div>لوازم آشپزخانه</div>
                </div>
              </div>
              <div className="col">
                <div className="featured-cat">
                  <div className="featured-cat-icon">
                    <img
                      src={require("../../../../img/Washing Machine.png")}
                      alt="شستشو و نظافت"
                    />
                  </div>
                  <div>شستشو و نظافت</div>
                </div>
              </div>
              <div className="col">
                <div className="featured-cat">
                  <div className="featured-cat-icon">
                    <img
                      src={require("../../../../img/TV Show-595b40b75ba036ed117d8f96.png")}
                      alt="صوتی و تصویری"
                    />
                  </div>
                  <div>صوتی و تصویری</div>
                </div>
              </div>
              <div className="col">
                <div className="featured-cat">
                  <div className="featured-cat-icon">
                    <img
                      src={require("../../../../img/Brd.png")}
                      alt="برندها"
                    />
                  </div>
                  <div>برندها</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="mainpage" className="list-bg row">
          <div className="outer-center">
            <div className="inner-center">
              <ProductItem
                {...{
                  selectedProduct: BestSellingAssets,
                  codeType: 4,
                  header: "جدیدترین‌ ها",
                }}
              />
            </div>
          </div>
          <div className="container autochar-features">
            <HomeTools {...{ props: props }} />
          </div>
        </div>
      </div>

      <div className="outer-center m-3">
        <div className="inner-center">
          <img
            className="img-fluid"
            src={require("../../../../img/refs.png")}
            alt=""
          />
        </div>
      </div>

      <div className="container second-features-container">
        <div className="outer-center">
          <div className="inner-center">
            <div className=" hot-container">
              <ProductItem
                {...{
                  selectedProduct: BestSellingAssets,
                  codeType: 1,
                  header: "پرفروش ترین ها",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(
  (state: ApplicationState) => state.users,
  UserStore.actionCreators
)(AssetMain as any);
