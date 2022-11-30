import React, { useState, useEffect } from "react";
import MenuHierarchy from "../../components/MenuHierarchy";
import IncDec from "../../components/IncDec";
import formatAndEncCurrency from "../../helper/formatCurrency";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { APIImage, APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { BasketItem } from "../../model/general/basketItems";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import ProductItem from "../../components/user/ProductItem";
import { VwUserProductSearch } from "../../model/viewModel/VwUserAssetSearch";

type BasketProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;

const Basket = (props: BasketProps) => {
  var totalDelivery: number = 150000;//rial
  //const [isLoading, setIsLoading] = useState(true);
  const [msgBasketChanged, setMsgBasketChanged] = useState("");
  const [totalAmount, setTotalamount] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [updateMyBasket, setupdateMyBasket] = useState(false);
  const [curbasket, setcurbasket] = useState<[]>([]);

  const [BestSellingAssets, setBestSellingAssets] = useState<VwUserProductSearch[]>([]);


  var availItems = 0;
  function GetAvailStock() {
    props.UserLoad(true);
    const data = props.basket;
    fetch(APIUrl + "/Booking/GetAvailStock", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        props.UserLoad(false);
        setcurbasket(responseModel.data);
        for (let i = 0; i < props.basket.length; i++) {
          const CurItem: BasketItem = props.basket[i];
          const AvailItem = responseModel.data.find(
            (item: any) => item.id === CurItem.id
          );
          if (AvailItem.currentStock < CurItem.count) {
            setMsgBasketChanged(
              "در برخی اقلام سبد خرید شما تغییراتی ایجاد شده است"
            );
            if (AvailItem.currentStock > 0)
              props.updateBasket(CurItem.id, AvailItem.currentStock);
            // else
            //     props.removeFromBasket(CurItem.id)
          }
        }
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  }

  useEffect(() => {
    console.log("effect");
    var totalPrice = 0;
    GetAvailStock();
    for (let i = 0; i < props.basket.length; i++) {
      totalPrice = totalPrice + (props.basket[i].price / 10) * props.basket[i].count;
    }

    settotalPrice(totalPrice);
    setTotalamount(totalPrice + totalDelivery / 10);

    fetch(
      APIUrl +
      "/AssetSelectionType/GetSelectedAssets/?SelectionTypeCode=" +
      1,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setBestSellingAssets(responseModel.data);
      })
      .catch((error) => {
        console.log("error");
      });

  }, [updateMyBasket, props.basket.length]);

  // function RemoveNode(id: string) {
  //     return props.basket.filter(function (element) {
  //         if (element.id === id) {
  //             return true;
  //         }
  //         return false;
  //     });
  // }

  // function removeItem(id: string) {
  //     props.removeFromBasket(id);
  //     RemoveNode(id)
  // }

  function updateCount(Id: string, newCount: number) {
    props.updateBasket(Id, newCount);
    setupdateMyBasket(!updateMyBasket);
  }

  function gotoShopping() {
    const { history } = props;
    if (props.userId === undefined) {
      props.showLogin();
      return;
    } else {
      history.push("/shopping/shopping");
    }
  }

  function removeItem(id: string) {
    props.removeFromBasket(id);
  }

  return (
    <div className="shopping">
      <div>
        <MenuHierarchy
          items={[
            { title: "فروشگاه اتوچار", path: "/" },
            { title: "سبد خرید", path: "" },
          ]}
        />
      </div>

      <div className="clearfix"></div>
      {props.basket.length > 0 ?
        <div>
          

          <div className="flex-container">
            <div className=" text-center w-100">
              <div className="basket-view1">
                <div className="text-right basket-header">سبد خرید</div>

                <div className="basket-items-and-sum">
                <div className="text-right">
                  <div className="basket-items-container">
                    <div className="msg-step2 m-3">{msgBasketChanged}</div>
                    {props.basket.map((item) => {
                      if (curbasket === null)
                        return;
                      const CurAvailItem = curbasket.find(
                        (curAvail: any) => curAvail.id === item.id
                      ) as any;
                      var IsAvail = false;
                      var strPrice = "";
                      if (CurAvailItem !== undefined) {
                        if (CurAvailItem.currentStock >= item.count) {
                          strPrice =
                            formatAndEncCurrency((item.price / 10).toString()) + " تومان";
                          availItems += item.count;
                          IsAvail = true;
                        } else {
                          strPrice = "ناموجود";
                          IsAvail = false;
                        }
                      }
                      //.currentStock >= item.count ?

                      return (
                        <div
                          key={item.id}
                          className="basket-single-item flex-container"
                        >
                          <div
                            className="remove-from-basket"
                            onClick={() => removeItem(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </div>
                          <div className="pic-container">
                            <img
                              src={APIImage + item.picture}
                              alt="basket"
                              className="product-basket-small"
                            />
                          </div>
                          <div className="w-100">
                            <div className="pro-title">
                              <NavLink
                                tag={Link}
                                to={
                                  "/product/" +
                                  item.id +
                                  "/" +
                                  item.title.replace(/\s+/g, "-")
                                }
                              >
                                {item.title}
                              </NavLink>
                            </div>
                            <div className="mt-4 flex-container">
                              <div>
                                {IsAvail ? (
                                  <IncDec
                                    initVal={item.count}
                                    UpdateCount={(newCount) =>
                                      updateCount(item.id, newCount)
                                    }
                                  />
                                ) : null}
                              </div>
                              <div className="price">
                                <span>{strPrice}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="xsmall-text mt-4">
                      <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                  .کاربر گرامی، با ادامه فرایند خرید،‏30 دقیقه برای تکمیل خرید
                  خود فرصت دارید
                </div>
                  </div>
                </div>
                {props.basket.length > 0 && availItems > 0 ? (
                  <div>
                    <div className="text-left w-100">
                      <div className="basket-summary">
                        <table className="tbl-basket-summary">
                          <tbody>
                            <tr>
                              <td>جمع کل:</td>
                              <td>
                                {formatAndEncCurrency(totalPrice.toString())} تومان
                          </td>
                            </tr>
                            <tr>
                              <td>هزینه ارسال :</td>
                              <td>
                                {formatAndEncCurrency((totalDelivery / 10).toString())}{" "}
                            تومان
                          </td>
                            </tr>
                            <tr>
                              <td>مبلغ قابل پرداخت :</td>
                              <td>
                                {formatAndEncCurrency(totalAmount.toString())} تومان
                          </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        {/* {isLoading ? (
                      <div className="text-center p-2">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : ( */}
                        <button
                          onClick={() => gotoShopping()}
                          className="btn-continue-buy btn btn-orange "
                        >
                          ادامه فرایند خرید
                      </button>

                      </div>
                    </div>
                    
                  </div>
                ) :
                  null
                }
                </div>
              </div>
            </div>
          </div>

        </div>

        :
        <div className="outer-center">
          <div className="inner-center">
          <div className="text-center">
            <div className="empty-basket-container">
              <img
                src={require("../../img/exclamation.png")}
                alt="basket"
                className="basket-large-slogan mb-3"
              />
              <div className="large-gray-message">سبد خرید شما خالی است!</div>
            </div>
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
          </div>
        </div>
        </div>

      }


    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(Basket as any);
