import React, { useState, Fragment, useEffect } from "react";

import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { APIUrl, APIImage } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { VwUserProductSearch } from "../../model/viewModel/VwUserAssetSearch";
import { useHistory } from "react-router-dom";
import Image from "../../components/Image";
import formatAndEncCurrency from "../../helper/formatCurrency";
import { MessageTypes } from "../../model/general";

type UserFavouritesProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;

const UserFavourites = (props: UserFavouritesProps) => {
  let history = useHistory();

  const [FavAssest, setFavAssest] = useState<VwUserProductSearch[]>([]);
  const [ShowStarTool, setShowStarTool] = useState(false);

  const ToggleStarTool = (newVal: boolean) => {
    setShowStarTool(newVal);
  };
  function gotoMain() {
    history.push("/");
  }
  const stars = (star: number) => {
    let mod = 5 - star;
    var result = [];
    for (let i = 0; i < star; i++) {
      result.push(<span className="Product_Card_Star"></span>);
    }

    if (mod > 0) {
      for (let i = 0; i < mod; i++) {
        result.push(<span className="Product_Card_Star_Gray"></span>);
      }
    }
    return <Fragment>{result}</Fragment>;
  };

  const UserStarSelect = (assetId: string) => {
    function SelectStarCount(count: number) {
      const data = {
        AssetId: assetId,
        StarCount: count,
      };
      fetch(APIUrl + "/UserOpinion/SaveStar/", {
        method: "POST",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0)
            props.addMessage([
              {
                msg: "رای شما با موفقیت ثبت شد",
                msgType: MessageTypes.Success,
              },
            ]);
          else
            props.addMessage([
              { msg: responseModel.message, msgType: MessageTypes.Success },
            ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    var result = [];
    for (let i = 1; i <= 5; i++) {
      result.push(
        <span
          onClick={() => SelectStarCount(i)}
          className="hover-full-star"
        ></span>
      );
    }

    return <Fragment>{result}</Fragment>;
  };
  

  useEffect(() => {
    const getFavs = () => {
      props.UserLoad(true);
      fetch(APIUrl + "/UserFavouriteAsset/GetFavAssets?Lang=" + props.lang.abr, {
        method: "GET",
        headers: {
                  'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      })
        .then((response) => {
          props.checkStatus(response);
          return response;
        })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0) setFavAssest(responseModel.data);
          props.UserLoad(false);
        })
        .catch((error) => {
          console.log(error);
          props.UserLoad(false);
        });
    };
    
    getFavs();
  }, []);

  function gotoAsset(assetId: string) {
    history.push("/product/" + assetId.replace(/\s+/g, "-"));
  }

  return (
    <div>
      <div className="text-right caption-header mr-2">
        {
          <li
            onClick={() => history.push({ pathname: "/user/panel" })}
            className="fa fa-arrow-right back-arrow"
          ></li>
        }
        علاقمندی های من{" "}
      </div>
      {FavAssest.length <= 0 ? (
        <div className="row">
          <div className="col-lg-8">
            <div className="large-message-box inner-center">
              <img
                className="img-fluid"
                src={require("../../img/ic_error_outline_24px.png")}
                alt=""
              />
              {/* </div> */}
              <p className="large-message">موردی برای نمایش وجود ندارد!</p>
              <p>محصولات مورد علاقه خود را از بین محصولات انتخاب کنید.</p>
              <button className="btn btn-orange" onClick={() => gotoMain()}>فروشگاه اتوچار</button>
            </div>
          </div>
          <div className="col-lg-4">
            <img
              className="d-none d-sm-block"
              src={require("../../img/Group 208.png")}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="user-fav-container">
              <div className="fav-asset-list">
                {FavAssest.map((item) => (
                  <div className="row">
                    <div className="col-lg-4 col-4">
                      {item.mainPic ? (
                        <div className="asset-image-conatiner">
                          <Image
                            fallbackSrc={APIImage + "/default.png"}
                            alt={""}
                            src={APIImage + item.mainPic}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="col-lg-8 col-8">
                      <div className="asset-title ">{item.sign}</div>
                      <div className="asset-price mt-2">
                        {formatAndEncCurrency(item.currentPrice.toString())}{" "}
                        تومان
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-12 text-right">
                          <div
                            onMouseOver={() => ToggleStarTool(true)}
                            onMouseOut={() => ToggleStarTool(false)}
                            className="Best_Selling_Card_ContainerStar mt-1 mb-1 ltr"
                          >
                            {!ShowStarTool
                              ? stars(item.star)
                              : UserStarSelect(item.assetId)}
                          </div>
                        </div>
                        <div className="col-lg-12 col-12 text-left">
                          <button
                            onClick={() => gotoAsset(item.assetId)}
                            className="btn btn-orange "
                          >
                            مشاهده محصول
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4  d-none d-sm-block">
            <img
              className="favimg"
              src={require("../../img/Group 209.png")}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserFavourites as any);
