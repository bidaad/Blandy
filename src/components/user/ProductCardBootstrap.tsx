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
  isSearchBox?:boolean;
}

type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> &
  CardProps;
const ProductCardBootstrap = (props: InputProps) => {
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

      <div className={props.isSearchBox===true?"card":"card card-custom"}>
        {/* {
          props.stock > 0 && props.isstock === true ? (
            <span className="badge badge-pill badge-warning au-stock">
              موجود در انبار
            </span>
          ) : null
        } */}
        {/* <div className="col-lg-12 col-4"> */}
        {curentImage ? (
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
              className="card-img-top"
              src={curentImage}
            />
          </NavLink>
        ) : null}
        {/* </div> */}
        <div className="card-body">
          {props.header !== "" ? (
            // <div className="au-discounttitle">
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
                <span className="prd-card-sp card-text blandy-title-card">{props.header}</span>
              </NavLink>
            // </div>
          ) : null}
          {props.title !== undefined ? (
            // <div>
              <NavLink
                tag={Link}
                onClick={() => handlerClickAsset(props.assetId, props.header)}
                to={
                  "/product/" +
                  props.assetId +
                  "/" +
                  props.header.replace(/\s+/g, "-")
                }
                className="card-text"
              >
                {props.title}
              </NavLink>
            // </div>
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
              <span className="au-prprice card-text">
                {formatAndEncCurrency(
                  props.previousPrice ? props.previousPrice.toString() : "0"
                )}
              </span>
            </div>
          ) : // <div className="mt-1 mb-1 au-discountprice"></div>
          null}

          <div className="text-center">
            {props.stock > 0 && props.isstock === true ? (
              <div>
                <span className="au-price card-text">
                  {formatAndEncCurrency(
                    props.price ? (props.price / 10).toString() : "0"
                  )}{" "}
                  تومان
                </span>
                {props.stock > 0 && props.isstock === true ? (
                  <div className="BasketBlandy">
                    <button
                      onClick={() =>
                        addtoBasket(props.assetId, props.price, props.header)
                      }
                      className={"btn blandy-button-basket"}
                    >
                      افزودن به سبد خرید
                      <img
                        src={require("../../img/Group 26.png")}
                        alt="Add To Basket"
                        className="AddBasketBlandyMini"
                      />
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="btn blandy-button-basket"
                  >
                    افزودن به سبد خرید
                  </button>
                )}
              </div>
            ) : (
              <div>
                <span className="card-text au-price ">اتمام موجودی</span>
                <div className="BasketBlandy">
                  <button
                    // onClick={() =>
                    //   addtoBasket(props.assetId, props.price, props.header)
                    // }
                    className="btn blandy-button-basket"
                  >
                    موجود شد به من خبر بده
                    <img
                      src={require("../../img/Notification.png")}
                      alt="Add To Basket"
                      className="AddBasketBlandyMini"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(ProductCardBootstrap as any);
