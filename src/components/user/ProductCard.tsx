import React, { Fragment, useState } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import formatAndEncCurrency from "../../helper/formatCurrency";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { APIImage, APIUrl, GetIP4 } from "../../helper/config";
import Image from "../Image";
import { responseModel } from "../../model/general/responseModel";
import { MessageTypes } from "../../model/general";

export interface CardProps {
  id: string;
  assetId: string;
  star: number;
  header: string;
  title: string;
  price: number;
  previousPrice: number;
  discount: number;
  image: string;
  stock: number;
  isstock?: boolean;
}

type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> &
  CardProps;
const ProductCard = (props: InputProps) => {
  const addtoBasket = (productid: string, price: number, title: string) => {
    GetIP4()
      .then((ip: any) => {
        let data = {
          assetId: productid,
          searchText: title,
          userId: props.userId,
          createUserID: props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };
        SaveSearch(data);
      })
      .catch((res) => {});
    props.addToBasket(productid, props.image, price, 1, title);
  };
  const [ShowStarTool, setShowStarTool] = useState(false);

  const ToggleStarTool = (newVal: boolean) => {
    setShowStarTool(newVal);
  };
  const stars = () => {
    let mod = 5 - props.star;
    var result = [];
    for (let i = 0; i < props.star; i++) {
      result.push(
        <span
          data-kid={i.toString()}
          key={"start" + i.toString()}
          className="Product_Card_Star"
        ></span>
      );
    }

    if (mod > 0) {
      for (let i = 0; i < mod; i++) {
        result.push(
          <span
            key={"gray" + i.toString()}
            data-kid={i.toString()}
            className="Product_Card_Star_Gray"
          ></span>
        );
      }
    }
    return <Fragment>{result}</Fragment>;
  };

  const UserStarSelect = () => {
    function SelectStarCount(count: number) {
      const data = {
        AssetId: props.assetId,
        StarCount: count,
      };
      fetch(APIUrl + "/UserOpinion/SaveStar/", {
        method: "POST",
        headers: {
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
              { msg: responseModel.message, msgType: MessageTypes.Error },
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
  let curentImage = undefined;
  if (props.image !== undefined && props.image !== null) {
    curentImage = APIImage + props.image;
  }
  function SaveSearch(data: any) {
    fetch(APIUrl + "/ProductSearch/SaveSearchAndClick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: "Fa",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          if (responseModel.data) {
          }
        }
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  }
  const handlerClickAsset = (id: any, name: any) => {
    GetIP4()
      .then((ip: any) => {
        let data = {
          assetId: id,
          searchText: name,
          userId: props.userId,
          createUserID: props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };

        SaveSearch(data);
      })
      .catch((res) => {});
  };
  return (
    <li className="Product_Card">
      <div className="row">
        {/* {
          props.stock > 0 && props.isstock === true ? (
            <span className="badge badge-pill badge-warning au-stock">
              موجود در انبار
            </span>
          ) : null
        } */}
        <div className="col-lg-12 col-4">
          {curentImage ? (
            <div className="product-image-conatiner">
              <NavLink
                onClick={() => handlerClickAsset(props.assetId, props.header)}
                tag={Link}
                to={
                  "/product/" +
                  props.assetId +
                  "/" +
                  props.header.replace(/\s+/g, "-")
                }
              >
                {/* <img alt={''} src={curentImage} /> */}
                <Image
                  fallbackSrc={APIImage + "/default.png"}
                  alt={""}
                  src={curentImage}
                />
              </NavLink>
            </div>
          ) : null}
        </div>
        <div className="col-lg-12 col-8">
          {props.header !== "" ? (
            <div className="au-discounttitle">
              <NavLink
                tag={Link}
                onClick={() => handlerClickAsset(props.assetId, props.header)}
                to={
                  "/product/" +
                  props.assetId +
                  "/" +
                  props.header.replace(/\s+/g, "-")
                }
                title={props.header}
              >
                <span className="prd-card-sp">{props.header}</span>
              </NavLink>
            </div>
          ) : null}
          {props.title !== undefined ? (
            <div>
              <NavLink
                tag={Link}
                onClick={() => handlerClickAsset(props.assetId, props.header)}
                to={
                  "/product/" +
                  props.assetId +
                  "/" +
                  props.header.replace(/\s+/g, "-")
                }
              >
                {props.title}
              </NavLink>
            </div>
          ) : null}
          <div
            onMouseOver={() => ToggleStarTool(true)}
            onMouseOut={() => ToggleStarTool(false)}
            className="Best_Selling_Card_ContainerStar mt-1 mb-1 ltr"
          >
            {/* onMouseOver={() => ToggleStarTool(true)} onMouseOut={() => ToggleStarTool(false)} */}
            {!ShowStarTool ? stars() : UserStarSelect()}
          </div>
          {props.discount < 0 ? (
            <div className="mt-1 mb-1 au-discountprice">
              <span className="badge badge-pill badge-success au-discount">
                {formatAndEncCurrency(
                  props.discount ? (props.discount * -1).toString() : "0"
                ) + "%"}
              </span>
              <span className="au-prprice">
                {formatAndEncCurrency(
                  props.previousPrice ? props.previousPrice.toString() : "0"
                )}
              </span>
            </div>
          ) : // <div className="mt-1 mb-1 au-discountprice"></div>
          null}

          <div>
            {props.stock > 0 && props.isstock === true ? (
              <div className="row mt-1 mb-1">
                <span className="col-lg-12 col-6 au-price ">
                  {formatAndEncCurrency(
                    props.price ? (props.price / 10).toString() : "0"
                  )}{" "}
                  تومان
                </span>
                {props.stock > 0 && props.isstock === true ? (
                  <div className="row">
                    <div className="col-lg-1  col-1"></div>
                    <div className="col-lg-10  col-10 BasketBlandy">
                      <button
                        onClick={() =>
                          addtoBasket(props.assetId, props.price, props.header)
                        }
                        className="btn btn-orange"
                      >
                        افزودن به سبد خرید
                        <img
                          src={require("../../img/Group 26.png")}
                          alt="Add To Basket"
                          className="AddBasketBlandy"
                        />
                      </button>
                    </div>
                    <div className="col-lg-1  col-1"></div>
                  </div>
                ) : (
                  <button
                    disabled
                    className="col-lg-12 col-6 btn btn-orange-disable btn-addtobasket"
                  >
                    افزودن به سبد خرید
                  </button>
                )}
              </div>
            ) : (
              <div className="row mt-1 mb-1">
                <span className="col-lg-12 col-6 unavailable ">
                اتمام موجودی
                </span>
                  <div className="row">
                    <div className="col-lg-1  col-1"></div>
                    <div className="col-lg-10  col-10 BasketBlandy">
                      <button
                        // onClick={() =>
                        //   addtoBasket(props.assetId, props.price, props.header)
                        // }
                        className="btn btn-orange"
                      >
                      موجود شد به من خبر بده
                        <img
                          src={require("../../img/Notification.png")}
                          alt="Add To Basket"
                          className="AddBasketBlandy"
                        />
                      </button>
                    </div>
                    <div className="col-lg-1  col-1"></div>
                  </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ProductCard as any);
