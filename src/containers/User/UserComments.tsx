import React, { useEffect, useState, Fragment } from "react";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { APIUrl, APIImage } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { useHistory } from "react-router";
import Image from "../../components/Image";
import { VwUserProductSearch } from "../../model/viewModel/VwUserAssetSearch";

type UserOrderProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;

const UserStaredAssets = (props: UserOrderProps) => {
  let history = useHistory();

  const [isLoading, ] = useState(false);
  const [StaredAssets, setStaredAssets] = useState<VwUserProductSearch[]>([]);
  //const [View, setView] = useState(1);

  function gotoAsset(assetId: string) {
    history.push("/product/" + assetId);
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
 

  useEffect(() => {
    function getUserStaredAssets() {
      // setIsLoading(true);
      props.UserLoad(true);
      fetch(APIUrl + "/UserOpinion/GetUserStars", {
        method: "GET",
        headers: {
                  'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      })
        .then((response) => {
          props.checkStatus(response);
          return response;
        })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0)
            setStaredAssets(responseModel.data);
          // setIsLoading(false);
          props.UserLoad(false);
        })
        .catch((error) => {
          // setIsLoading(false);
          props.UserLoad(false);
          console.log(error);
        });
    }
    
    getUserStaredAssets();
  }, []);

  //const sendPrice = "";
  // const GrayTick = (
  //   <div className="gray-status-line">
  //     <div className="gray-tick float-left">
  //       <i className="fa fa-check "></i>
  //     </div>
  //   </div>
  // );

  return isLoading ? (
    <div className="spinner-grow text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div className="ucoomentcontainer">
      <div>
        <div className="text-center caption-header">
          {
            <li
              onClick={() => props.history.push({ pathname: "/user/panel" })}
              className="fa fa-arrow-right back-arrow"
            ></li>
          }
          نظرات من{" "} 
        </div>
        {StaredAssets.length === 0 ? (
          <div className="row">
            <div className="col-lg-8">
              <div className="large-message-box inner-center">
                <div className="section-header">نظرات من</div>
                <img
                  src={require("../../img/ic_error_outline_24px.png")}
                  alt=""
                />
                <div className="large-message">
                  موردی برای نمایش وجود ندارد !
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <img src={require("../../img/Group 329.png")} alt="" />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8  bg-comment">
              <div className="text-center w-100">
                <div className="section-header">نظرات من</div>
                <div className="comment-list">
                  {StaredAssets.map((item: VwUserProductSearch, index) => (
                    <div className="row br-comment">
                      <div className="col-lg-3">
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
                      <div className="col-lg-9">
                        <div className="row">
                          <div className="col-lg-7">
                            <div className="asset-title mt-3">{item.sign}</div>
                          </div>
                          <div className="col-lg-5">
                            <div className="asset-title-scare mt-3">
                              امتیاز من به محصول
                            </div>
                            <div className="Best_Selling_Card_ContainerStar mt-1 mb-1 ltr">
                              {stars(item.star)}
                            </div>
                          </div>
                          {/* <div className="col-lg-4">
                          
                          </div> */}
                          <div className="text-left w-100">
                            <button
                              onClick={() => gotoAsset(item.assetId)}
                              className="btn btn-orange btn-orange-ml"
                            >
                              مشاهده
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <img src={require("../../img/Group 329.png")} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserStaredAssets as any);
