import React, { useState, useEffect } from "react";
import MenuHierarchy from "../../components/MenuHierarchy";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import UserAddress from "./UserAddress";
import changeEnc from "../../helper/changeEnc";

import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { VwContact } from "../../model/viewModel/VwContact";
import { VwLoadDeliveryPlanBookingUser } from "../../model/viewModel/VwLoadDeliveryPlanBookingUser";

type ShoppingProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;

// const timeFrames = [
//   { title: "صبح - بازه زمانی  9 - 12" },
//   { title: "ظهر - بازه زمانی  15 - 12" },
//   { title: "عصر - بازه زمانی  19 - 15" },
// ];

const Shopping = (props: ShoppingProps) => {
  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [deliveryType, setDeliveryType] = useState(0);
  const [showNewAddress, setShowNewAddress] = useState(false);
  //const [, setTimeframe] = useState(-1);
  //const [, setCaptionTimeframe] = useState("ساعت تحویل");
  const [minLeft, setMinLeft] = useState(29);
  const [secondLeft, setSecondLeft] = useState(59);
  //const [, setselectedDeliveryDate] = useState("");
  const [showNoDeliveryDateAlert, setshowNoDeliveryDateAlert] = useState(false);
  const [BookingId, setBookingId] = useState("");
  const [UserAddresses, setUserAddresses] = useState<VwContact[]>([]);
  const [SelectedContactId, setSelectedContactId] = useState("");
  const [ShowAddressSelector, setShowAddressSelector] = useState(false);
  //const [] = useState<VwAvailDeliveryDate[]>([]);
  // const [WeekDays, setWeekDays] = useState<string[]>([])
  const [WeekDays, setWeekDays] = useState<VwLoadDeliveryPlanBookingUser[]>([]);
  //const [] = useState<any>([]);
  const [WeekDaysIdies, setWeekDaysIdies] = useState<any>([]);
  const [SelectedDate, setSelectedDate] = useState("");

  var ReceiverNameRef: React.RefObject<HTMLInputElement>;
  var ReceiverMobileRef: React.RefObject<HTMLInputElement>;
  ReceiverNameRef = React.createRef();
  ReceiverMobileRef = React.createRef();
  //var DatePicker = require('react-datepicker2');

  const getUserAddress = async () => {
    fetch(APIUrl + "/Contact/GetAddress?PersonId=" + props.personId, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setUserAddresses(responseModel.data as VwContact[]);
          setSelectedContactId(responseModel.data[0].id);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  

  useEffect(() => {
    // if (props.userId === undefined) {
    //   // const { history } = props;
    //   // if (history)
    //   //     history.push('/userlogin');
    //   props.showLogin();
    //   return;
    // }


    const getAvailDeliveryDates = () => {
      fetch(APIUrl + "/LoadDeliveryPlan/ReadLoadDeliveryPlanBookingUser", {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
           ;
          if (responseModel.messageCode === 0) {
            
            setWeekDays(responseModel.data as VwLoadDeliveryPlanBookingUser[]);

            const uniqueArr = [
              ...new Set(
                responseModel.data.map(
                  (d:VwLoadDeliveryPlanBookingUser) => d.pdate
                ),
              )
            ];
            setWeekDaysIdies(uniqueArr);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    const data = props.basket;
    const doBooking = function () {
      setIsLoading(true);
      fetch(APIUrl + "/Booking/DoBooking", {
        method: "POST",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          props.checkStatus(response);
          return response;
        })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          console.log("messageCode=" + responseModel.messageCode);
          const result = responseModel.data;
          const resultArray = result.split(";");
          const BID = resultArray[0];
          const TotalDiff = resultArray[1];
          setMinLeft(TotalDiff);
          setBookingId(BID);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    
    doBooking();
    getUserAddress();
    getAvailDeliveryDates();
  }, [props.token]);
  setTimeout(() => {
    decrementTimer();
  }, 1000);

  function decrementTimer() {
    var newSecond = secondLeft - 1;
    if (newSecond === 0) {
      newSecond = 59;
      var newMinute = minLeft - 1;
      if (newMinute === -1) {
        return false;
      }
      setMinLeft(newMinute);
    }
    setSecondLeft(newSecond);
  }
  function submit() {
       
    if (SelectedDate === "") setshowNoDeliveryDateAlert(true);
    else {
      gotoPayment();
    }
  }

  function selectPeik() {
    setDeliveryType(1);
  }

  function selectPost() {
    setDeliveryType(2);
  }


  function gotoPayment() {
    setMsg("");
    if (UserAddresses.length === 0) {
      setMsg("لطفا یک آدرس وارد کنید");
      return;
    }
    const LDeliveryPlan=SelectedDate?SelectedDate:WeekDays.length>0?WeekDays[0].planId:undefined;
    const selectedAddress = UserAddresses.filter(
      (c) => c.id === SelectedContactId
    )[0];
    const fullAddress =
      selectedAddress.continentName +
      " " +
      selectedAddress.cityName +
      " " +
      selectedAddress.value +
      " پلاک " +
      selectedAddress.buildingLicensePlate +
      " واحد " +
      selectedAddress.apartmentLicensePlate +
      " کد پستی " +
      selectedAddress.postCode;
    const data = {
      bookingId: BookingId,
      shipType: deliveryType,
      DestRecipientName: (ReceiverNameRef.current as HTMLInputElement).value,
      DestRecipientMobile: (ReceiverMobileRef.current as HTMLInputElement)
        .value,
      DestContactId: SelectedContactId,
      FullAddress: fullAddress,
      LoadDeliveryTTWeekDayId: LDeliveryPlan,
    };
    setIsLoading(true);
    fetch(APIUrl + "/BillOfLading/CreateBOLAndBooking", {
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
      .then(() => {
        setIsLoading(false);
        props.setShoppingInfo(deliveryType, "", "", BookingId, "", "", "", "");
        const { history } = props;
        history.push("/shopping/payment/");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  function gotoBasket() {
    const { history } = props;
    history.push("/shopping/basket");
  }

  function handleNewAddressClose() {
    setShowNewAddress(false);
  }
  function showNewAddressComponent() {
    setShowNewAddress(true);
  }


  function handleNoDeliveryDateAlert() {
    setshowNoDeliveryDateAlert(false);
    setTimeout(() => {
      window.scrollTo(0, 100);
    }, 200);
  }

  function selectContactId(id: string) {
    setSelectedContactId(id);
    setShowAddressSelector(false);
  }

  return (
    <div>
      <Modal
        size="lg"
        show={showNewAddress}
        onHide={handleNewAddressClose}
        className={"Rtl new-address-container"}
      >
        <Modal.Header>
          <Modal.Title>&nbsp;</Modal.Title>
          <FontAwesomeIcon
            icon={faWindowClose}
            color="gray"
            size="lg"
            onClick={handleNewAddressClose}
          />
        </Modal.Header>
        <Modal.Body>
          <UserAddress
            {...{
              showSelectAddress: true,
              selectContactId: (updatedAddresses: VwContact[], id: string) => {
                setUserAddresses(updatedAddresses);
                setSelectedContactId(id);
                setShowNewAddress(false);
              },
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={showNoDeliveryDateAlert}
        onHide={handleNoDeliveryDateAlert}
        className={"Rtl popup-warning"}
      >
        <div className="p-5">
          <div className="warning">
            شما برای دریافت سفارش خود ساعت و تاریخ موردنظرتان را مشخص ننموده
            اید. در صورت تایید و ادامه سیستم به صورت خودکار اولین بازه زمانی را
            برای ارسال سفارش شما مشخص خواهد نمود.
          </div>
          <div className="row mt-5">
            <div className="col">
              <button
                onClick={() => gotoPayment()}
                className="btn btn-orange btn-block"
              >
                تایید و ادامه
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => handleNoDeliveryDateAlert()}
                className="btn btn-light-orange"
              >
                انتخاب ساعت و تاریخ ارسال
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        <MenuHierarchy
          items={[
            { title: "فروشگاه اتوچار", path: "/" },
            { title: "سبد خرید", path: "/user/basket" },
            { title: "اطلاعات ارسال", path: "/shopping/shopping" },
          ]}
        />
      </div>
      <div className="clearfix"></div>

      <div className="shopping-area">
        <div className="progress-line  ">
          <div className="orange-line">
            <div className="circle orange-circle-empty float-left"></div>
            <div className="circle orange-circle-full float-right"></div>
          </div>
          <div className="gray-line">
            <div className="circle gray-circle"></div>
          </div>
        </div>
        <div className="progress-captions">
          <div>تایید سفارشات</div>
          <div></div>
          <div className="bold">انتخاب محل تحویل</div>
          <div></div>
          <div>پرداخت و تکمیل خرید</div>
        </div>

        <div className="row ltr">
        <div className="col-lg-6 col-12 text-center">
            <div className="timer">
              {minLeft > 0 ? changeEnc(minLeft.toString()) + " دقیقه و " : null}
              {changeEnc(secondLeft.toString())} ثانیه
            </div>
            <div className="xsmall-text text-right">
              زمان باقیمانده تا تکمیل خرید
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="shopping-box">
              <div>آدرس تحویل سفارش شما</div>
              <div className="line w-100"></div>
              <div className="address-selector">
                
                {ShowAddressSelector
                  ? UserAddresses.map((item) => (
                      <div>
                        
                        <div className="row">
                          <div className="col-lg-9">
                            <i className="fs-1 ml-2 mr-1 fa fa-map-marker"></i>
                            {item.continentName} {item.cityName} {item.value}{" "}
                            پلاک {item.buildingLicensePlate} واحد{" "}
                            {item.apartmentLicensePlate} کد پستی {item.postCode}
                          </div>
                          <div className="col-lg-3">
                            <button
                              onClick={() => selectContactId(item.id)}
                              className="btn btn-light-gray small-button"
                            >
                              ارسال به این آدرس
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : UserAddresses.filter((p) => p.id === SelectedContactId).map(
                      (item) => (
                        <div key={item.id}>
                          <div className="row">
                            <div className="col">
                              <i className="fs-1 ml-2 mr-1 fa fa-map-marker"></i>
                              {item.continentName} {item.cityName} {item.value}{" "}
                              پلاک {item.buildingLicensePlate} واحد{" "}
                              {item.apartmentLicensePlate} کد پستی{" "}
                              {item.postCode}
                            </div>
                          </div>
                        </div>
                      )
                    )}
              </div>

              <div className="row">
                <div
                  onClick={() => { setShowAddressSelector(true);}}
                  className="col-lg-6 col-12 bold over-selected-link"
                >
                  <i className="fs-1 ml-2 mr-1 fa fa-pencil"></i>
                  ویرایش آدرس تحویل
                </div>
                <div
                  className="col-lg-6 col-12 bold over-selected-link"
                  onClick={() => showNewAddressComponent()}
                >
                  <i className="fs-1 ml-2 mr-1 fa fa-map-marker"></i>
                  ثبت آدرس جدید
                </div>
              </div>

              <div className="mt-4">تحویل گیرنده</div>
              <div className="line w-100"></div>
              <div className="row parcel-receiver">
                <div className="col">
                  <i className="fs-1 ml-2 mr-1 fa fa-user"></i>
                  <input
                    ref={ReceiverNameRef}
                    type="text"
                    className="form-control"
                    defaultValue={props.firstName + " " + props.lastName}
                  ></input>
                </div>
                <div className="col">
                  <i className="fs-1 ml-2 mr-1 fa fa-mobile"></i>
                  <input
                    ref={ReceiverMobileRef}
                    type="text"
                    className="form-control ltr"
                    defaultValue={
                      props.mobile !== null ? props.mobile.toString() : ""
                    }
                  ></input>
                </div>
              </div>

              <div
                className={
                  SelectedDate !== "" ? "mt-5 bnkDate" : "mt-5 bnkDateError"
                }
              >
                تاریخ و ساعت تحویل سفارش
              </div>
              <div
                className={
                  SelectedDate !== ""
                    ? "w-100 bnkDateBorder"
                    : "w-100 bnkDateBorderError"
                }
              ></div>
              <div>
                <table className="tblDeliveryDates">
                  {WeekDaysIdies.map((item: any) => (
                    <tr>
                      <td>{WeekDays.filter((m) => m.pdate === item)[0].dname}</td>
                      {WeekDays.filter((m) => m.pdate === item).map(
                        (curDay) => (
                          <td
                            className={
                              curDay.planId === SelectedDate
                                ? "selected-delivery-date"
                                : ""
                            }
                            data-id={curDay.planId}
                             onClick={() => setSelectedDate(curDay.planId)}
                          >
                            {curDay.signTitle}
                          </td>
                        )
                      )}
                      <td>{changeEnc(WeekDays.filter((m) => m.pdate === item)[0].pdate)}</td>
                    </tr>
                  ))}
                </table>
                {/* {
                                    AvailDates.map(item =>
                                            <div>
                                                {item.sign}
                                            </div>
                                        )} */}
              </div>
              {/* <div className="row">
                                <div className="col">
                                    <div className="dropdown">
                                        <div className="icon-calendar icon-clock"></div>
                                        <button className="btn dropdown-toggle btn-time-selector" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {captionTimeframe}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div onClick={() => selectTimeframe(0)} className="dropdown-item" >صبح - بازه زمانی  9 - 12</div>
                                            <div onClick={() => selectTimeframe(1)} className="dropdown-item" >ظهر - بازه زمانی  15 - 12</div>
                                            <div onClick={() => selectTimeframe(2)} className="dropdown-item" >عصر - بازه زمانی  19 - 15</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col">
                                    <DatePicker
                                        isGregorian={false}
                                        calendarClass="calendar-picker"
                                        timePicker={false}
                                        {...{ placeholder: 'تاریخ تحویل' }}
                                        className={"form-control"}
                                        onChange={handleDeliveryDateChange}
                                    />
                                    <div className="icon-calendar "></div>
                                </div>
                            </div> */}
              <div className="mt-5">ارسال از طریق</div>
              <div className="line w-100"></div>
              <div className="text-small">
                <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                هزینه ارسال از طریق پست ۱۵/۰۰۰ تومان و از طریق پیک ۲۰/۰۰۰ تومان
                می باشد.
              </div>
              <div className="delivery-type-container">
                <div className="" >
                  <div className="ml-3">
                    <img
                      src={require("../../img/shopping/peik.png")}
                      alt="basket"
                      className="postman ml-1"
                    />
                    <span>ارسال توسط پیک</span>
                    <input type="radio" onClick={() => selectPeik()} radioGroup="deliveryType" />
                  </div>
                  
                </div>
                
                <div className="" >
                  <div>
                    <img
                      src={require("../../img/shopping/post.png")}
                      alt="basket"
                      className="postman ml-1"
                    />
                     <span>ارسال توسط پست</span>
                    <input type="radio" onClick={() => selectPost()} radioGroup="deliveryType" />
                  </div>
                  
                </div>
                
              </div>
              {deliveryType === 2 ? (
                <div className="warning">
                  <div className="bold">
                    به دلیل ارسال از طریق پست. ساعت و تاریخ دقیق تحویل سفارش
                    قابل پیش بینی نمی باشد.
                  </div>
                  <div>
                    وضعیت مرسوله و شماره رهگیری پس از تحویل به پست از طریق
                    سفارشات قابل پیگیری می باشد.
                  </div>
                </div>
              ) : null}
              {msg !== "" ? (
                <div className="alert-success p-3">{msg}</div>
              ) : null}
              <div className="row mt-5">
                <div className="col">
                  {isLoading ? (
                    <div className="spinner-grow text-danger" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => submit()}
                      className="btn btn-light-gray"
                    >
                      تایید و ادامه
                    </button>
                  )}
                </div>
                <div className="col">
                  <button
                    onClick={() => gotoBasket()}
                    className="btn btn-light-orange"
                  >
                    بازگشت به سبد خرید
                  </button>
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
)(Shopping as any);
