import React, { useEffect, useState } from "react";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { APIImage, APIUrl } from "../../helper/config";

import { responseModel } from "../../model/general/responseModel";
import { VwBooking } from "../../model/viewModel/VwBooking";
import changeEnc from "../../helper/changeEnc";
import formatAndEncCurrency from "../../helper/formatCurrency";
import { useHistory } from "react-router";
import { VwBookingAsset } from "../../model/viewModel/VwBookingAsset";
import { VwBillOfLading } from "../../model/viewModel/VwBillOfLading";
import { VwBillOLBooking } from "../../model/viewModel/VwBillOLBooking";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { VwSeacrh } from "../../model/viewModel/VwSeacrh";

import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScoreSelector } from "../Admin/Asset/Asset/AssetDetail";
import { MessageTypes } from "../../model/general";
import { VwSurveySubjectResult } from "../../model/viewModel/VwSurveySubjectResult";

type UserOrderProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;


type OrderTypeProps = {
  bookingStatusCode: string;
  Orders: VwBooking[];
  showOrder: any;
};

function OrderType(props: OrderTypeProps) {
  return (
    <div className='order-type-container'>
      {props.Orders.filter(item => item.bookingStatusCode === props.bookingStatusCode).length > 0 ?
        <table className='tblorders-type'>
          <tr>
            <th>
              شماره سفارش
            </th>
            <th>
              تاریخ ثبت سفارش
            </th>
            <th>
              مبلغ کل
            </th>
            <th>
              مشاهده جزئیات
            </th>
          </tr>
          {props.Orders.filter(item => item.bookingStatusCode === props.bookingStatusCode).map((item: VwBooking, index) => (
            <tr>
              <td>{item.code}</td>
              <td>{changeEnc(item.orderTime)}</td>
              <td>{formatAndEncCurrency(item.totalAmount)}</td>
              <td onClick={() => props.showOrder(item.id)} className='pointer'>
                <img alt='نمایش سفارش' src={require('../../img/ArrowLeftCircle.png')} />
              </td>
            </tr>
          ))}
        </table>
        :
        <div className="text-center">
          <img alt='' src={require('../../img/exclamation.png')} />
          <div className='msg-noitem'>
            موردی برای نمایش وجود ندارد
        </div>
        </div>
      }
    </div>
  )
}


const UserOrders = (props: UserOrderProps) => {
  let UrlR = APIUrl ? APIUrl.replace("api", "") + "Report" : "";
  let history = useHistory();
  //var counter: number = 1;
  //const [isLoading, setIsLoading] = useState(true);
  const [Orders, setOrders] = useState<VwBooking[]>([]);
  const [View, setView] = useState(1);
  const [BookingInfo, setBookingInfo] = useState({} as VwBooking);
  const [BookingAsset, setBookingAsset] = useState<VwBookingAsset[]>([]);
  const [BillOfLading, setBillOfLading] = useState({} as VwBillOfLading);
  const [BillOlBooking, setBillOlBooking] = useState({} as VwBillOLBooking);
  const [currentOrderType, setCurrentOrderType] = useState('OK')
  const [showBuyModal, setshowBuyModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showCommentArea, setShowCommentArea] = useState(false)
  const [SurveyParameters, setSurveyParameters] = useState([]);
  const [SelectedAsset, setSelectedAsset] = useState({id: '', productSign:'', mainImage: ''})
  const [ParameterValues, SetParameterValues] = useState(
    new Map<string, string>()
  );
  const [SurveyResults, setSurveyResults] = useState<VwSurveySubjectResult[]>(
    []
  );
  const [SurveySubjectId, setSurveySubjectId] = useState("");
  const [UserComment, setUserComment] = useState("");
  const [UserScoreLoading] = useState(false);


  function handleComment(event: any) {
    setUserComment(event.target.value);
  }

  const setScore = (parameterId: string, id: string) => {
    ;
    console.log(id);
    ParameterValues.set(parameterId, id);
    SetParameterValues(ParameterValues);
    // ParameterValues[parameterId] = id;
    console.log(ParameterValues);
  };

  const submitScores = () => {
    ;
    var strScores: string = "";
    for (let entry of ParameterValues.values()) {
      if (strScores === "") strScores = entry;
      else strScores += ";" + entry;
    }
    const data = {
      AssetId: SelectedAsset.id,
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

          setShowCommentModal(false)
        }
      })
      .catch((error) => {
        props.UserLoad(false);
        console.log(error);
      });
  };

  function getSurveyParameters(){
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
              SelectedAsset.id +
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
  }

  function showOrder(id: string) {
    props.UserLoad(true);
    fetch(APIUrl + "/Booking/GetOrder/?BookingId=" + id, {
      method: "GET",
      headers: {
        'ut': '1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.data) {
          setView(2);
          setBookingInfo(responseModel.data.bookingInfo);
          setBookingAsset(responseModel.data.bookingAssetList);
          setBillOfLading(responseModel.data.billOfLadingInfo);
          setBillOlBooking(responseModel.data.billOlbooking);
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
        console.log(error);
      });
  }

  function getUserOrders() {
    props.UserLoad(true);
    fetch(APIUrl + "/User/Orders", {
      method: "POST",
      headers: {
        'ut': '1',
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
        setView(1);
        setOrders(responseModel.data);
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
        console.log(error);
      });
  }
  function gotoProduct() {
    history.push("/");
  }

  function gotoAsset(assetId: string) {
    history.push("/product/" + assetId.replace(/\s+/g, "-"));
  }

  const selectAsset = (id: string, title: string, mainImage: string) => {
    
    setSelectedAsset({id: id, productSign: title, mainImage: mainImage})
    setShowCommentArea(true)
  }

  function HandlerShowContactUs(show: any) {
    props.showContact(true);
  }
  const clickHandler1 = (e: any) => {
    e.stopPropagation();
    let dt: VwSeacrh = {
      id: "",
      code: "",
      mid: "",
      mName: "",
      name: "",
      type: "َALL",
    };
    props.Search(dt);
    props.UserLoad(true);
  };
  useEffect(() => {
    var orderId = undefined;
    var strLocation: string = props.location.pathname;
    var n: number = strLocation.search(/orders/i);
    if (n > 0) {
      orderId = strLocation.substr(n + 7);
      if (orderId !== "") showOrder(orderId);
      else getUserOrders();
    } else getUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token]);

  const sendPrice = "";
  const GrayTick = (x: any, border: any) => (
    <div className={border + " gray-status-line "}>
      <div className={border + " gray-tick float-left "}>
        <i className={"fa fa-check " + x}></i>
      </div>
    </div>
  );

  const View1 = (
    <div>
      {Orders !== null ? (
        Orders.length === 0 ? (
          <div className="large-message-box inner-center">
            <div className="section-header-2">سفارش های من</div>
            <div className="large-message">موردی برای نمایش وجود ندارد !</div>
            <div className="mt-3">
              <button onClick={() => gotoProduct()} className="btn btn-orange">
                مشاهده محصولات
              </button>
            </div>
          </div>
        ) : (
            <Container fluid={true}>
              <Row className="Order-My-Card-row">
                <Col lg={12}>
                  <div onClick={() => history.push('/user/panel')} className="section-header-2">
                    <i className="fa fa-arrow-right"></i>سفارش های من{" "}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <div onClick={() => setCurrentOrderType('OK')} className={currentOrderType === 'OK' ? 'order-status-selector' : 'order-status-unselected'}>تایید شده</div>
                </Col>
                <Col lg={3}>
                  <div onClick={() => setCurrentOrderType('CR')} className={currentOrderType === 'CR' ? 'order-status-selector' : 'order-status-unselected'}>ایجاد شده</div>
                </Col>
                <Col lg={3}>
                  <div onClick={() => setCurrentOrderType('CNX')} className={currentOrderType === 'CNX' ? 'order-status-selector' : 'order-status-unselected'}>کنسل شده</div>
                </Col>
                <Col lg={3}>
                  <div onClick={() => setCurrentOrderType('RTRN')} className={currentOrderType === 'RTRN' ? 'order-status-selector' : 'order-status-unselected'}>عودت شده</div>
                </Col>

              </Row>
              <Row>
                <Col lg={12}>
                  {currentOrderType === 'OK' ?
                    <OrderType {...{ bookingStatusCode: 'OK', Orders: Orders, showOrder: showOrder }} /> :
                    currentOrderType === 'CR' ?
                      <OrderType {...{ bookingStatusCode: 'CR', Orders: Orders, showOrder: showOrder }} /> :
                      currentOrderType === 'CNX' ?
                        <OrderType {...{ bookingStatusCode: 'CNX', Orders: Orders, showOrder: showOrder }} /> :
                        currentOrderType === 'RTRN' ?
                          <OrderType {...{ bookingStatusCode: 'RTRN', Orders: Orders, showOrder: showOrder }} /> :
                          null}
                </Col>
              </Row>
            </Container>
          )
      ) : null}
    </div>
  );


  const View2 = (
    <div className='view-order-container'>
      <div className='row'>
        <div className='col'>شماره سفارش</div>
        <div className='col val'>{BookingInfo.code}</div>
      </div>
      <div className='row'>
        <div className='col'>ثبت شده در تاریخ</div>
        <div className='col val'>{changeEnc(BookingInfo.orderTime)}</div>
      </div>

      <table className='tbl-order-info'>
        <tr>
          <td>
            <div className='row'>
              <div className='col'>تحویل گیرنده: </div>
              <div className='col val'>{BookingInfo.personName}</div>
            </div>
          </td>
          <td>
            <div className='row'>
              <div className='col'>شماره تماس تحویل گیرنده:</div>
              <div className='col val'>{BookingInfo.personMobile}</div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>آدرس:</div>
            <div>{BillOlBooking !== null ? BillOlBooking.fullAddress : null}</div>

          </td>
          <td>
            <div > وضعیت سفارش :</div>
            <div className='lbl-order-status '>
              {BookingInfo.bookingStatusSign}
            </div>

          </td>
        </tr>
        <tr>
          <td>
            <span>زمان تحویل:</span>
            <span className='val'>{"  " +
              changeEnc(BookingInfo.pDate) +
              "      " +
              BookingInfo.deliveryTitle}</span>

          </td>
          <td>
            <span>مبلغ کل:</span>
            <span className='val'>{formatAndEncCurrency(BookingInfo.totalAmount)} تومان</span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>

            <div className="order-info-row"></div>
            <div className="order-status-line ">
              <div
                className={
                  BillOfLading !== null && BillOfLading.shipStatusCode === "1"
                    ? "status-title status-title-active"
                    : "status-title"
                }
              >
                ثبت سفارش
        </div>
              {BillOfLading !== null && BillOfLading.shipStatusCode === "1"
                ? GrayTick("status-title-active", "status-title-border-active")
                : GrayTick("", "")}
              <div
                className={
                  BillOfLading !== null && BillOfLading.shipStatusCode === "2"
                    ? "status-title status-title-active"
                    : "status-title"
                }
              >
                آماده سازی سفارش
        </div>
              {BillOfLading !== null && BillOfLading.shipStatusCode === "2"
                ? GrayTick("status-title-active", "status-title-border-active")
                : GrayTick("", "")}
              <div
                className={
                  BillOfLading !== null && BillOfLading.shipStatusCode === "3"
                    ? "status-title status-title-active"
                    : "status-title"
                }
              >
                ارسال سفارش
        </div>
              {BillOfLading !== null && BillOfLading.shipStatusCode === "3"
                ? GrayTick("status-title-active", "status-title-border-active")
                : GrayTick("", "")}
              <div
                className={
                  BillOfLading !== null && BillOfLading.shipStatusCode === "4"
                    ? "status-title status-title-active"
                    : "status-title"
                }
              >
                تحویل مرسوله به مشتری
        </div>
              {BillOfLading !== null && BillOfLading.shipStatusCode === "4"
                ? GrayTick("status-title-active", "status-title-border-active")
                : GrayTick("", "")}
            </div>

          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="mt-4 table-responsive">
              <table className="tblOrders tblBookingAsset inner-center table">
                <tr>
                  <th>#</th>
                  <th>نام محصول</th>
                  <th>تعداد</th>
                  <th>قیمت واحد</th>
                  <th>قیمت کل</th>
                  <th>تخفیف</th>
                  <th>قیمت نهایی</th>
                  {BillOfLading !== null && BillOfLading.shipStatusCode === "4" ? (
                    <th className="ThNewSaleRP"></th>
                  ) : null}
                </tr>
                {BookingAsset.map((item: VwBookingAsset, index) => (
                  <tr>
                    <td>{changeEnc(String(index + 1))}</td>
                    <td>
                      <img className='img-product-order' src={APIImage + item.mainImage} alt={item.productSign} />
                      {item.productSign}

                    </td>
                    <td>{changeEnc(item.assetCount.toString())}</td>
                    <td>{formatAndEncCurrency(item.currentPrice)} تومان</td>
                    <td>
                      {formatAndEncCurrency(
                        Number(item.assetCount) * Number(item.currentPrice)
                      )}{" "}
                  تومان
                </td>
                    <td>{changeEnc("0")}</td>
                    <td>
                      {formatAndEncCurrency(
                        Number(item.assetCount) * Number(item.currentPrice)
                      )}{" "}
                  تومان
                </td>

                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="no-border"></td>
                  <td>هزینه ارسال :</td>
                  <td>{sendPrice}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="no-border"></td>
                  <td className="total-lable">جمع کل :</td>
                  <td className="total-lable">
                    {formatAndEncCurrency(BookingInfo.totalAmount)}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <div className='text-right rtl mt-3 '>
        <div className="w-100 ">
          <button
            onClick={() => setshowBuyModal(true)}
            className="btn btn-light-orange mr-2"
          >
            خرید مجدد
        </button>
          <button
            onClick={() => {getSurveyParameters();setShowCommentModal(true); setShowCommentArea(false)}}
            className="btn btn-light-orange mr-2"
          >
            ثبت نظر
        </button>

          <button
            onClick={() => setView(1)}
            className="btn btn-light-orange mr-2"
          >
            بازگشت
        </button>
        </div>

      </div>


    </div>
  );


  return (
    <div>
      <Modal size="lg" show={showBuyModal} onHide={() => setshowBuyModal(false)} className={'modal-rebuy-container'}>
        <Modal.Header >

          <i className='fa fa-close float-left' onClick={() => setshowBuyModal(false)} />
        </Modal.Header>
        <Modal.Body className='modal-rebuy'>
          {BookingAsset.map((item: VwBookingAsset, index) => (
            <div className='rebuy-item row rtl'>
               <div className='col-3'>
                <img className='img-product-order' src={APIImage + item.mainImage} alt={item.productSign} />
              </div>
              <div className='col-5'>
                {item.productSign}
              </div>
              <div className='col-4'>
                {formatAndEncCurrency(item.currentPrice)} تومان
                <div>
                  <button className='btn btn-rebuy' onClick={() => gotoAsset(item.assetId)}>خرید</button>
                </div>
              </div>

            </div>
          ))}
        </Modal.Body>

      </Modal>

      <Modal size="lg" show={showCommentModal} onHide={() => setShowCommentModal(false)} className={'modal-ordercomment-container'}>
        <Modal.Header >
          <i className='fa fa-close float-left m-1' onClick={() => setShowCommentModal(false)} />
          <div className='float-right m-1 rtl'>
             نظرت رو لطفا برامون بنویس :)
          </div>
        </Modal.Header>
        <Modal.Body className='modal-ordercomment'>
          
          {
            showCommentArea ?
              <div>
                <div className='rebuy-item row '>
                  <div className='col-3'>
                    <img className='img-product-order' src={APIImage + SelectedAsset.mainImage} alt={SelectedAsset.productSign} />
                  </div>
                  
                  <div className='col-9 survey-pro-title'>
                    {SelectedAsset.productSign}
                  </div>
                  
                  
    
                </div>

                <div className="row mt-4 mb-2">
                  <div className="col-xl-7 col-lg-7">
                    
                    <div className='order-survey-params'>
                      {SurveyParameters.map((item: any) => (
                        
                          <div className="">
                            <div className="">
                              <span className="AutoChar_Modal_Content_Lable">
                                {item.sign}
                              </span>
                            </div>
                            <div className=" mt-2 mb-2">
                              <ScoreSelector
                                parameterId={item.id}
                                items={item.scores}
                                setScore={setScore}
                              />
                            </div>
                          </div>

                          
                       
                      ))}
                    </div>
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

              : 
              BookingAsset.map((item: VwBookingAsset, index) => (
                <div className='rebuy-item row '>
                  <div className='col-3'>
                    <img className='img-product-order' src={APIImage + item.mainImage} alt={item.productSign} />
                  </div>
                  
                  <div className='col-4'>
                    {item.productSign}
                  </div>
                  <div className='col-5'>
                    {formatAndEncCurrency(item.currentPrice)} تومان
                    <div>
                      <button className='btn btn-rebuy' onClick={() => selectAsset(item.assetId, item.productSign, item.mainImage)}>ثبت نظر</button>
                    </div>
                  </div>
                  
    
                </div>
              ))
          }
        </Modal.Body>

      </Modal>
      {/* <Report /> */}
      { View === 1 ? View1 : null}
      { View === 2 ? View2 : null}
    </div >
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserOrders as any);
