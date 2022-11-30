import { VwUser } from "../../../../model/viewModel/VwUser";
import { RouteComponentProps } from "react-router";
import { stateBase } from "../../../../model/general/stateBase";
import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import $ from "jquery";
import IncDec from "../../../../components/IncDec";
import * as UserInfo from "../../../../store/UserInfo";
import { APIUrl, APIImage } from "../../../../helper/config";
import { responseModel } from "../../../../model/general/responseModel";
import formatAndEncCurrency from "../../../../helper/formatCurrency";
import { VwAssetAttribute } from "../../../../model/viewModel/VwAssetAttribute";
import MenuHierarchy from "../../../../components/MenuHierarchy";
import { VwDocument } from "../../../../model/viewModel/VwDocument";
import { VwUserOpinion } from "../../../../model/viewModel/VwUserOpinion";
import { VwGuarantee } from "../../../../model/viewModel/VwGuarantee";
import { MessageTypes } from "../../../../model/general";
import { VwSurveySubjectResult } from "../../../../model/viewModel/VwSurveySubjectResult";
import { AssetInfo } from "../../../../model/viewModel/VwAssetDetail";
import { MenuItem } from "../../../../model/viewModel/MenuItem";
import { VwProductAttribute } from "../../../../model/viewModel/VwProductAttribute";
import ReactImageMagnify from "react-image-magnify";
import ProductCardBootstrap from "../../../../components/user/ProductCardBootstrap";

export interface IHash {
  [details: string]: string;
}

type ScoreSelectorProps = { parameterId: string; items: any; setScore: any };

export const ScoreSelector = (props: ScoreSelectorProps) => {
  ;
  const [selectedId, setSelectedId] = useState("");
  return (
    <Fragment>
      <div className="row row-cols-5">
        {props.items.map((score: any) => (
          <span
            onClick={() => {
              setSelectedId(score.id);
              props.setScore(props.parameterId, score.id);
            }}
            className={
              selectedId === score.id
                ? " AutoChar_Modal_Content_Button selected-score"
                : " AutoChar_Modal_Content_Button "
            }
          >
            {score.sign}
          </span>
        ))}
      </div>
    </Fragment>
  );
};

type AssetDetailProps = UserInfo.UserInfoState &
  stateBase<VwUser> &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & { match: any; location: any; history: any };

const AssetDetail = (props: AssetDetailProps) => {
  const [assetInfo, setAssetInfo] = useState({
    id: "",
    price: 0,
    name: "",
    star: 0,
    productId: "",
  });
  const [assetAttributes, setAssetAttributes] = useState<VwAssetAttribute[]>(
    []
  );
  const [productAttributes, setProductAttributes] = useState<
    VwProductAttribute[]
  >([]);
  const [assetDocuments, setAssetDocuments] = useState<VwDocument[]>([]);
  const [userOpinions, setUserOpinions] = useState<VwUserOpinion[]>([]);
  const [similarAssets, setsimilarAssets] = useState([]);
  const [Guarantees, setGuarantees] = useState<VwGuarantee[]>([]);
  const [SurveyResults, setSurveyResults] = useState<VwSurveySubjectResult[]>(
    []
  );
  const [SurveyParameters, setSurveyParameters] = useState([]);
  const [newItemCount, setNewItemCount] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [showFullSpec, setShowFullSpec] = useState(false);
  const [IsFavourite, setIsFavourite] = useState(false);
  const [SurveySubjectId, setSurveySubjectId] = useState("");
  const [UserScoreLoading] = useState(false);
  const [BreadCrumb, setBreadCrumb] = useState<MenuItem[]>([]);
  const [UserComment, setUserComment] = useState("");
  const [ParameterValues, SetParameterValues] = useState(
    new Map<string, string>()
  );

  // let filtersCnd = new Map<string, string>();
  console.log(props.location.pathname);
  var strLocation: string = props.location.pathname;
  var n: number = strLocation.search(/product/);
  const assetId = strLocation.substring(n + 8, n + 8 + 36);

  // var ParameterValues: IHash = {};

  const addToFav = (assetId: string) => {
    fetch(
      APIUrl +
        "/UserFavouriteAsset/UserFavourite?AssetId=" +
        assetId +
        "&Lang=" +
        props.lang.abr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) setIsFavourite(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleComment(event: any) {
    setUserComment(event.target.value);
  }


  const submitScores = () => {
    ;
    var strScores: string = "";
    for (let entry of ParameterValues.values()) {
      if (strScores === "") strScores = entry;
      else strScores += ";" + entry;
    }
    const data = {
      AssetId: assetInfo.id,
      SurveySubjectId: SurveySubjectId,
      Scores: strScores,
      Opinion: UserComment,
    };

    props.UserLoad(true);
    fetch(APIUrl + "/UserSurvey/SaveScores", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
    })
      .then((response) => {
        ;
        props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        ;
        props.UserLoad(false);
        if (responseModel.messageCode === 0) {
          // submitOpinion();
          props.addMessage([
            { msg: "نظر شما با موفقیت ثبت شد", msgType: MessageTypes.Success },
          ]);
        } else {
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
        }
      })
      .catch((error) => {
        props.UserLoad(false);
        console.log(error);
      });
  };

  const setScore = (parameterId: string, id: string) => {
    ;
    console.log(id);
    ParameterValues.set(parameterId, id);
    SetParameterValues(ParameterValues);
    // ParameterValues[parameterId] = id;
    console.log(ParameterValues);
  };

  const getUserOpinions = () => {
    fetch(
      APIUrl +
        "/User/GetUserOpinions/?AssetId=" +
        assetId +
        "&Lang=" +
        props.lang.abr,
      {
        method: "GET",
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setUserOpinions(responseModel.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // $(".Technical_Specifications_TabContent_Text_Plus").closest('div').nextAll().hide();
    // $("div.Tab_CNT").hide();
    // $("#Technical_Specifications_TabContent").show();

    //const productId = '11aa353b-923f-4724-b00f-6c9cf1ffa5a4'
    //setProductInfo({ id: productId, price: 667000 })

    const fetchData = async () => {
      //console.log('catid=' + catId);
      props.UserLoad(true);
      fetch(
        APIUrl + "/Asset/Detail?AssetId=" + assetId + "&Lang=" + props.lang.abr,
        {
          method: "GET",
        }
      )
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          const assetInfo = responseModel.data as AssetInfo;
          setAssetInfo({
            id: assetInfo.detail.assetId,
            price: assetInfo.detail.currentPrice,
            name: assetInfo.detail.sign,
            productId: assetInfo.detail.productId,
            star: assetInfo.detail.star ? assetInfo.detail.star : 0,
          });
          setAssetAttributes(assetInfo.assetAttributes);
          setProductAttributes(assetInfo.productAttributes);
          setAssetDocuments(assetInfo.documents);
          setGuarantees(assetInfo.guarantees);
          if (assetInfo.detail.isFavourite) setIsFavourite(true);
          props.UserLoad(false);
          const strBreadCrumbs = assetInfo.breadCrumbs;
          const BreadCrumbsArray = strBreadCrumbs.split(",");
          var BreadCrumbsArr: MenuItem[] = [];
          BreadCrumbsArr.push({ title: "فروشگاه اتوچار", path: "/" });
          for (let i = BreadCrumbsArray.length - 1; i >= 0; i--) {
            const element = BreadCrumbsArray[i];
            const ElementBC = element.split(";");
            BreadCrumbsArr.push({
              title: ElementBC[0],
              path: "/cat/" + ElementBC[1],
            });
          }
          setBreadCrumb(BreadCrumbsArr);

          // if (assetInfo.documents.length > 0) {
          //     const mainDocs = assetInfo.documents.filter(c => c.mainDoc === true)
          //     if (mainDocs.length > 0) {
          //         setMainImage(mainDocs[0].filePath)
          //     }
          //     else
          //         setMainImage(assetInfo.documents[0].filePath) //set main image to first one when no main image is specified

          // }
          setMainImage(assetInfo.detail.mainImage);
        })
        .catch((error) => {
          console.log(error);
        });

      getUserOpinions();

      fetch(APIUrl + "/SurveySubject/GetSurveyParameters?SurveyDomainCode=1", {
        method: "GET",
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.data.length > 0) {
            console.log("ss=" + responseModel.data[0].surveySubjectId);
            const surveySubjectId = responseModel.data[0].surveySubjectId;
            setSurveySubjectId(responseModel.data[0].surveySubjectId);
            ;
            setSurveyParameters(responseModel.data);

            fetch(
              APIUrl +
                "/SurveySubject/GetResult/?AssetId=" +
                assetId +
                "&SurveySubjectId=" +
                surveySubjectId +
                "&Lang=" +
                props.lang.abr,
              {
                method: "GET",
              }
            )
              .then((response) => response.json() as Promise<responseModel>)
              .then((responseModel) => {
                ;
                setSurveyResults(responseModel.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(
        APIUrl +
          "/Asset/GetSimilarAsset/?AssetId=" +
          assetId +
          "&Lang=" +
          props.lang.abr,
        {
          method: "GET",
        }
      )
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          ;
          setsimilarAssets(responseModel.data);
          console.log(similarAssets);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const addtoBasket = (assetid: string, price: number, title: string) => {
    props.addToBasket(assetid, mainImage, price, newItemCount, title);
  };

  function updateCount(newCount: number) {
    setNewItemCount(newCount);
  }

  const gotoCompare = (productId: string) => {
    const { history } = props;
    history.push("/asset/compare/" + productId);
  };

  const Handler_Add_Comment = () => {
    $(".AutoChar_Modal").fadeIn();
  };
  const Handler_Modal_Hide = () => {
    $(".AutoChar_Modal").fadeOut();
  };
  // let curentImage = require('../../../../img/product/Image 2@3x.png');
  // let miniImage = require('../../../../img/product/Image 20@3x.png');
  const SurveyRes = function (x: any) {
    ;
    if (x.score > 0 && x.score <= 10) {
      return (
        <div className="row">
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy">
            <div className="line-openion-circle-Blandy"></div>
            <div className="line-openion-circle-left-Blandy"></div>
          </div>
          <div className="col-2">
            <div className="blandy-opnion-span">{x.name}</div>
          </div>
        </div>
      );
    }
    if (x.score > 10 && x.score <= 20) {
      return (
        <div>
          <div className="row">
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
              <div className="line-openion-circle-left-Blandy"></div>
            </div>
            <div className="col-2">
              <div className="blandy-opnion-span">{x.name}</div>
            </div>
          </div>
        </div>
      );
    }
    if (x.score > 20 && x.score <= 30) {
      return (
        <div>
          <div className="row">
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
              <div className="line-openion-circle-left-Blandy"></div>
            </div>
            <div className="col-2">
              <div className="blandy-opnion-span">{x.name}</div>
            </div>
          </div>
        </div>
      );
    }
    if (x.score > 30 && x.score <= 40) {
      return (
        <div>
          <div className="row">
            <div className="col-2 line-openion-part-Blandy-Gray">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
              <div className="line-openion-circle-left-Blandy"></div>
            </div>
            <div className="col-2">
              <div className="blandy-opnion-span">{x.name}</div>
            </div>
          </div>
        </div>
      );
    }
    if (x.score > 40) {
      return (
        <div>
          <div className="row">
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
            </div>
            <div className="col-2 line-openion-part-Blandy">
              <div className="line-openion-circle-Blandy"></div>
              <div className="line-openion-circle-left-Blandy"></div>
            </div>
            <div className="col-2">
              <div className="blandy-opnion-span">{x.name}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
          </div>
          <div className="col-2 line-openion-part-Blandy-Gray">
            <div className="line-openion-circle-Blandy"></div>
            <div className="line-openion-circle-left-Blandy"></div>
          </div>
          <div className="col-2">
            <div className="blandy-opnion-span">{x.name}</div>
          </div>
        </div>
      </div>
    );
  };
  const starsDiv = function (x: any) {
    let st = [];

    let mx = 5 - x;
    for (let index = 0; index < mx; index++) {
      st.push(
        <img
          className="blandy-star"
          src={require("../../../../img/starGray.png")}
          alt="star product"
        />
      );
    }
    for (let index = 0; index < x; index++) {
      st.push(
        <img
          className="blandy-star"
          src={require("../../../../img/star.png")}
          alt="star product"
        />
      );
    }
    return st;
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="">
              <MenuHierarchy items={BreadCrumb} />
            </div>
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5  Product_Detail_Col1">
                <div className="Product_Detail_Col1_Header">
                  {assetInfo.name}
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-xl-8">
                    {Guarantees.map((item: VwGuarantee) => (
                      <span className="gur-span">{item.sign}</span>
                    ))}
                  </div>
                  <div className="col-xl-4">
                    {assetInfo.star ? starsDiv(assetInfo.star) : null}
                  </div>
                </div>
                <div className="Product_Detail_Col1_Header2"></div>
                {/* <div className="gray-line-thin"></div> */}
                <div className="row">
                  <div className="col-6">
                    <div className="attribute-Title-Asset-Blandy">
                      ویژگی های کالا
                    </div>
                    <div>
                      {productAttributes !== undefined
                        ? productAttributes
                            .slice(0, 5)
                            .map((item: VwProductAttribute) => (
                              <Fragment>
                                <div className="Technical_Specifications_TabContent">
                                  <span className="attribute-Asset-Blandy">
                                    {item.sign}:
                                  </span>
                                  <span className="attribute-Asset-Blandy">
                                    {item.value}
                                  </span>
                                </div>
                              </Fragment>
                            ))
                        : null}
                      <div className="Technical_Specifications_TabContent">
                        {assetAttributes !== undefined
                          ? assetAttributes.map((item: VwAssetAttribute) => (
                              <div>
                                <span className="attribute-Asset-Blandy">
                                  {item.attributeTitleSign}
                                </span>
                                :{" "}
                                <span className="attribute-Asset-Blandy">
                                  {item.value}
                                </span>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2 mt-3"></div>
                      <div className="col-10  mt-3">
                        <IncDec
                          initVal={1}
                          UpdateCount={(newCount) => updateCount(newCount)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mb-4 mt-2">
                    <span className="Product_Detail_Price_Text_Blandy">
                      {" "}
                      {formatAndEncCurrency(assetInfo.price / 10)} تومان
                      <button
                        onClick={() =>
                          addtoBasket(
                            assetInfo.id,
                            assetInfo.price,
                            assetInfo.name
                          )
                        }
                        className="btn btn-orange btn-addtobasket btn-add-blandy"
                      >
                        افزودن به سبد خرید
                      </button>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="featured-cat-product col-2">
                    <div className="asset-detail-feature-icon">
                      <img
                        src={require("../../../../img/Return Purchase-595b40b75ba036ed117d89c3.png")}
                        alt="ضمانت بازگشت"
                      />
                    </div>
                    <div className="lbl-feature">ضمانت بازگشت</div>
                  </div>

                  <div className="featured-cat-product col-2">
                    <div className="asset-detail-feature-icon">
                      <img
                        src={require("../../../../img/Warranty Card-595b40b85ba036ed117de91f.png")}
                        alt="ضمانت اصل بودن کالا"
                      />
                    </div>
                    <div className="lbl-feature">ضمانت اصل بودن کالا</div>
                  </div>
                  <div className="featured-cat-product col-2">
                    <div className="asset-detail-feature-icon">
                      <img
                        src={require("../../../../img/Online Support-595b40b75ba036ed117d8e03.png")}
                        alt="پشتیبانی 24 ساعته"
                      />
                    </div>
                    <div className="lbl-feature">پشتیبانی 24 ساعته</div>
                  </div>
                  <div className="featured-cat-product  col-2">
                    <div className="asset-detail-feature-icon">
                      <img
                        src={require("../../../../img/Deliver Food-595b40b75ba036ed117d5ba6.png")}
                        alt="تحویل سریع"
                      />
                    </div>
                    <div className="lbl-feature">تحویل سریع</div>
                  </div>
                  <div className="featured-cat-product  col-2">
                    <div className="asset-detail-feature-icon">
                      <img
                        src={require("../../../../img/Cash In Hand-595b40b85ba036ed117dcbae.png")}
                        alt="پرداخت محل"
                      />
                    </div>
                    <div className="lbl-feature">پرداخت محل</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-5">
                {/* {!isLoading ? */}
                <div className=" Product_Detail_Col3 asset-large-pic-container ltr">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "",
                        isFluidWidth: true,
                        src: APIImage + mainImage,
                        className: "asset-large-pic img-fuild",
                      },
                      largeImage: {
                        src: APIImage + mainImage,
                        width: 600,
                        height: 600,
                      },
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-12 text-left BlandyCompareButtonsBox">
                    <div className="asset-tools">
                      <img
                        onClick={() => gotoCompare(assetInfo.productId)}
                        className="asset-fav"
                        src={require("../../../../img/compare.png")}
                        alt=""
                      />
                      {IsFavourite ? (
                        <img
                          onClick={() => addToFav(assetInfo.id)}
                          className="asset-fav"
                          src={require("../../../../img/product/heart.png")}
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={() => addToFav(assetInfo.id)}
                          className="asset-fav"
                          src={require("../../../../img/product/empty-heart.png")}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="Product_Detail_Garanty_Row">
                  {Guarantees.map((item: VwGuarantee) => (
                    <div>
                      <span className="Product_Detail_Garanty">
                        ضمانت {item.guaranteeTypeSign} {item.departmentSign}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>
              <div className="col-xl-1 col-lg-1 col-md-2  Product_Detail_Col2">
                {assetDocuments.map((item) => (
                  <img
                    key={item.id}
                    onClick={() => setMainImage(item.filePath)}
                    src={APIImage + item.filePath}
                    alt=''
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="Technical_Specifications_Col">
              <div className="Technical_Specifications_Row">
                <a
                  className={
                    activeTab === 1
                      ? "Technical_Specifications_Tab TS_Active"
                      : "Technical_Specifications_Tab"
                  }
                  onClick={() => setActiveTab(1)}
                  data-toggle="Technical_Specifications_TabContent"
                >
                  <img className="survey-list" src={require('../../../../img/ic_view_list_24px.png')} alt="Properties Product" />
                  مشخصات
                </a>
                <a
                  className={
                    activeTab === 2
                      ? "Technical_Specifications_Tab TS_Active"
                      : "Technical_Specifications_Tab"
                  }
                  onClick={() => setActiveTab(2)}
                  data-toggle="User_Comments"
                >
                  <img  className="survey-list" src={require('../../../../img/ic_textsms_24px.png')} alt="Properties Product" />
                  نظرات کاربران
                </a>
              </div>
              {activeTab === 1 ? (
                <div
                  id="Technical_Specifications_TabContent"
                  className="Tab_CNT"
                >
                  {productAttributes !== undefined
                    ? productAttributes.map(
                        (item: VwProductAttribute, index: number) => (
                          <Fragment>
                            {showFullSpec || (!showFullSpec && index < 3) ? (
                              <div className="Technical_Specifications_TabContent">
                                <span className="Technical_Specifications_TabContent_Text">
                                  {item.sign}
                                </span>
                                <span className="Technical_Specifications_TabContent_Text">
                                  {item.value}
                                </span>
                              </div>
                            ) : null}
                          </Fragment>
                        )
                      )
                    : null}
                  {!showFullSpec ? (
                    <div className="Technical_Specifications_TabContent hand">
                      <span
                        className="Technical_Specifications_TabContent_Text_Plus"
                        onClick={() => setShowFullSpec(true)}
                      >
                        مشخصات بیشتر +
                      </span>
                    </div>
                  ) : (
                    <div className="Technical_Specifications_TabContent hand">
                      <span
                        className="Technical_Specifications_TabContent_Text_Close"
                        onClick={() => setShowFullSpec(false)}
                      >
                        خلاصه مشخصات
                      </span>
                    </div>
                  )}
                </div>
              ) : null}
              {activeTab === 2 ? (
                <div id="User_Comments" className="Tab_CNT">
                  <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-5">
                      <div className="User_Comments_List_Col">
                        <p className="Product_Detail_Col1_Header_C">
                          : امتیاز کاربران به
                        </p>
                        <span className="Product_Detail_Col1_Header_C">
                          {assetInfo.name}
                        </span>
                        <span className="Product_Detail_Col1_Header2"></span>
                      </div>
                      <div className="">
                        {userOpinions.map((item) => (
                          <div className="User_Comments_List">
                            <div className="User_Comments_List_Col">
                              <span className="User_Comments_List_Col_Lable">
                                {item.senderFullName} :
                              </span>
                              <div className="User_Comments_List_Col_Lables">
                                <span className="User_Comments_List_Col_MiniLable">
                                  1399/01/16
                                </span>
                                <span className="User_Comments_List_Col_Badge">
                                  خریدار
                                </span>
                              </div>
                            </div>
                            <div className="User_Comments_List_Col">
                              <span className="User_Comments_List_Col_Text">
                                {item.opinion}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-7">
                      <div className="row">
                        <div className="col-4">
                          {SurveyResults !== null
                            ? SurveyResults.map((item) => (
                                <div className="blandy-opnion-span">
                                  <span>{item.surveyParameter}</span>
                                </div>
                              ))
                            : null}
                        </div>
                        <div className="col-8 ">
                          {SurveyResults !== null
                            ? SurveyResults.map((item) => (
                                <SurveyRes
                                  {...{
                                    score: item.averageScore,
                                    name: item.surveyParameterScoreSign,
                                  }}
                                />
                              ))
                            : null}
                        </div>
                      </div>
                      {/* {SurveyResults !== null
                        ? SurveyResults.map((item) => (
                            <div className="User_Comments_Rank_Row">
                              <div className="User_Comments_Rank-Text">
                                <span>{item.surveyParameter}</span>
                              </div>
                              <Slider_Themp
                                {...{
                                  value: item.averageValue,
                                  title: item.surveyParameterScoreSign,
                                }}
                              />
                            </div>
                          ))
                        : null} */}
                      <div className="User_Comments_Rank_Row">
                        <button
                          className="User_Comments_Rank-Add_Comment"
                          onClick={Handler_Add_Comment}
                        >
                          افزودن نظر جدید
                          <img className="survey-add" src={require('../../../../img/Group 583.png')} alt="Button Add Servey" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 SimilarAssetTitle">
            <span>محصولات مشابه</span>
          </div>
          <div className="col-xl-12 col-lg-12">
            <div className="row Technical_Specifications_TabContent_Similar">
              {similarAssets.length === 0
                ? null
                : similarAssets.map((item: any) => (
                    <div className="col">
                      <ProductCardBootstrap
                        key={item.assetId}
                        {...{
                          assetId: item.assetId,
                          id: item.productId,
                          star: item.star,
                          header: item.sign,
                          text: item.sign,
                          price: item.currentPrice,
                          image: item.mainPic,
                          previousPrice: item.previousPrice,
                          discount: item.discountPercent,
                          stock: item.currentStock,
                          isstock: true,
                          isSearchBox: true,
                        }}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <div className="AutoChar_Modal">
        <div className="AutoChar_Modal_Content">
          <div className="AutoChar_Modal_Content_R">
            <div className="AutoChar_Modal_Content_R"></div>
            <a
              className="AutoChar_Modal_Close"
              onClick={() => Handler_Modal_Hide()}
            >
              <i className="fa fa-close"></i>
            </a>
          </div>
          <div className="row mt-4 mb-2">
            <div className="col-xl-7 col-lg-7">
              <span className="Product_Detail_Col1_Header">
                {assetInfo.name}
              </span>
              <span className="Product_Detail_Col1_Header2"></span>
              <div className="row">
                {SurveyParameters.map((item: any) => (
                  <div className="col-12">
                    <div className="row">
                      <div className="col-xl-5">
                        <span className="AutoChar_Modal_Content_Lable">
                          {item.sign}
                        </span>
                      </div>
                      <div className="col-xl-7 mt-2 mb-2">
                        <ScoreSelector
                          parameterId={item.id}
                          items={item.scores}
                          setScore={setScore}
                        />
                      </div>
                    </div>

                    {/* {
                                        item.scores.map((score: any) =>
                                            <span onClick={() => setScore(item.id, score.id)} className={"AutoChar_Modal_Content_Button " + isSelected(item.id, score.id)}>{score.sign}</span>
                                        )
                                    } */}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-xl-5 col-lg-5">
              <img className="img-openion-modal" src={APIImage + mainImage} alt='' />
            </div>
          </div>

          <div className="AutoChar_Modal_Content_R">
            <textarea
              onChange={(e) => handleComment(e)}
              className="AutoChar_Modal_Content_Comment_TextArea"
              placeholder="نظر خود را در مورد این محصول اینجا وارد کنید :"
            />
          </div>
          <div className="AutoChar_Modal_Content_R">
            <div className="AutoChar_Modal_Content_BTN">
              {UserScoreLoading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button
                  className="btn btn-orange btn-save-comment"
                  onClick={() => submitScores()}
                >
                  ثبت نظر
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(AssetDetail as any);
