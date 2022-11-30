import React, { useState, useEffect } from 'react'
import { ShowMessage } from '../../components/ShowMessage';
import { Modal } from 'react-bootstrap';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { APIImage, APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import formatAndEncCurrency from '../../helper/formatCurrency';
import { BasketItem } from '../../model/general/basketItems';


enum PayMethods {
    Online = 1,
    Pos = 2,

}

enum Banks {
    NoBank = 0,
    Parsian = 1,
    Saman = 2,
    Ap = 3
}

type PaymentProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const Payment = (props: PaymentProps) => {
    function selectPayMethod(payMethod: PayMethods) {
        setpayMethod(payMethod)
    }

    function gotoShopping() {
        const { history } = props;
        history.push('/shopping/shopping');
    }
    const [, setIsLoading] = useState(true)
    const [payMethod, setpayMethod] = useState(PayMethods.Online)
    const [acceptShoppingTerms, setAcceptShoppingTerms] = useState(false)
    const [msgAcceptShoppingTerms, setMsgAcceptShoppingTerms] = useState('')
    const [showShoppingTerms, setShowShoppingTerms] = useState(false)
    const [showFinalAccept, setShowFinalAccept] = useState(false)
    const [Bank, ] = useState(Banks.Ap)
    const [msgSelectBank, setmsgSelectBank] = useState('')
    const [amount, setAmount] = useState(0)
    const [curbasket, setcurbasket] = useState<[]>([]);
    const [, setMsgBasketChanged] = useState("");

    function GetAvailStock() {
        props.UserLoad(true);
        const data = props.basket;
        fetch(APIUrl + "/Booking/GetAvailStock", {
            method: "POST",
            headers: {
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

    function handleTerms(event: any) {
        setAcceptShoppingTerms(event.target.checked)
    }
    function handleShoppingTermsClose() {
        setShowShoppingTerms(false)
    }
    function showShoppingTermsComponent() {
        setShowShoppingTerms(true)
    }

    function handleFinalAcceptClose() {
        setShowFinalAccept(false)
        const { history } = props;
        history.push('/shopping/basket');
    }
    // function showFinalAcceptComponent() {
    //     setShowFinalAccept(true)
    // }


    function submit() {
        setMsgAcceptShoppingTerms('')
        setmsgSelectBank('')
        console.log('acceptShoppingTerms=' + acceptShoppingTerms);

        if (!acceptShoppingTerms) {
            setMsgAcceptShoppingTerms('پذیرش قوانین و مقررات پرداخت الزامی است.');
            return;
        }
        if (Bank === Banks.NoBank) {
            setmsgSelectBank('یکی از درگاه های بانکی را انتخاب نمایید.');
            return;
        }
        setShowFinalAccept(true)
    }
    function createPayment() {
        const data = {
            BookingId: props.shoppingInfo.bookingId,
            PaymentType: payMethod,
            BankId: Bank,
        };

        fetch(APIUrl + '/Payment/CreatePayment', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
                lang: props.lang.abr,
            },
            body: JSON.stringify(data),

        }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
            // const { history } = props;
            // history.push('http://www.sb24.ir');
            //const paymentId = responseModel.keyId;
            console.log('message=' + responseModel.message);
            console.log('token=' + responseModel.data);
            const token = responseModel.data;//"e95bb9250eddda714";
            if (token !== null) {
                postRefId(token)
            }
            // else
            //     
            //window.location.href= 'http://www.sb24.ir';
            //return;
        }).catch(
            error => {
                console.log(error);
            }
        );
    }

    function postRefId(refIdValue: string) {
        try {
            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", "https://asan.shaparak.ir");
            form.setAttribute("target", "_self");
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("name", "RefId");
            hiddenField.setAttribute("value", refIdValue);
            form.appendChild(hiddenField);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
        catch (e) {

        }
    }

    useEffect(() => {
        const data = {
            BookingId: props.shoppingInfo.bookingId,
        };
        const getAmount = function () {
            setIsLoading(true);
            fetch(APIUrl + '/Payment/CalcAmount', {
                method: 'POST',
                headers: {
                'ut':'1',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                    lang: props.lang.abr,
                },
                body: JSON.stringify(data),

            })
                .then((response) => {
                    props.checkStatus(response);
                    return response;
                })
                .then(response => response.json() as Promise<responseModel>).then(responseModel => {
                    console.log('messageCode=' + responseModel.messageCode);
                    //alert(responseModel.data)
                    setAmount(parseInt(responseModel.data, 10) / 10);
                    setIsLoading(false);

                }).catch(
                    error => {
                        console.log(error);
                        setIsLoading(false);
                    }
                );
        }
        getAmount();
        GetAvailStock();
    }, [props.token]);

    return (
        <div>
            <Modal size="lg" show={showShoppingTerms} onHide={handleShoppingTermsClose} className={'Rtl terms-container'}>
                <Modal.Header>
                    <Modal.Title>&nbsp;</Modal.Title>
                    <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={handleShoppingTermsClose} />
                </Modal.Header>
                <Modal.Body>
                    <div className="bold">
                        حقوق و قوانین پرداخت
                    </div>
                    <div className="line w-100"></div>
                    <div>
                        -	پرداخت هزینه  سفارش و ارسال کالا، به صورت آنلاین انجام می¬شود. <br />
-	مشتری می¬بایست در هنگام دریافت کالا، کارت شناسایی معتبر خود را به مامور مربوطه نشان دهد.<br />
-	در صورت مشاهده هرگونه  آسیب دیدگی در کالای سفارش شده، حتما قبل از دریافت آن با خدمات پس از فروش اتوچار تماس بگیرید.  <br />
-	مسئولیت هرگونه آسیب دیدگی کالا به عهده شرکت حمل کننده آن است.<br />
-	تاخیر جزئی در ارسال سفارش کالا در روزهای پرتراکم ،محتمل و اجتناب ناپذیر است. <br />
-	تحویل کالا در شهرستانها حداکثر تا 72 ساعت پس از ثبت سفارش انجام می شود.(ممکن است در شهرهای مختلف زمان تحویل متفاوت باشد).<br />
-	هرگونه تغییر قیمت نهایی کالا به دلیل نوسان قیمت ارز ، به مشتری اطلاع رسانی خواهد شد و در صورت انصراف مشتری از سفارش کالا،  مبلغ واریزی به حساب وی عودت داده خواهد شد.<br />
-	مشتریان  می¬توانند هزینه کالای سفارشی خود را از طریق انتقال وجه کارت به کارت پرداخت کنند و سپس شناسه واریز انتقال وجه را از طریق تماس تلفنی یا راه های ارتباطی مشخص شده در سایت به کارشناسان فروش اتوچار اطلاع دهند.<br />
-	در فرآیند خرید، پس از انتخاب محصول، اضافه شدن کالا در سبد خرید و ثبت  اطلاعات مورد نیاز در سایت، پیش فاکتور خرید کالا برای شما به نمایش درمی¬آید.(خواهشمند است به تعداد سفارش و مبلغ درج شده در فاکتور توجه نمایید).<br />
-	در صورت بروز هرگونه تخلف و وارد آمدن خسارت به کالا توسط مشتری، فروشگاه اتوچار حق پیگیری را برای خود محفوظ می شمارد. <br />
-	 “اتوچار” مسئولیتی در قبال ارائه اطلاعات مبهم و يا خطاهای نگارشی برعهده نخواهد داشت. ولی به جهت آگاه سازی بیشتر مشتریان و سهولت سفارشات آن ها سعی در بروز رسانی اطلاعات خواهد داشت.<br />
-	حداقل سن کلیه کاربران  سایت اتوچار ۱۸ سال تمام می باشد. هر گونه خدمات به افراد کمتر از این سن با هماهنگی یکی از والدین یا قیم قانونی وی ارائه خواهد شد و ایشان قانونا مسئولیت رعایت کلیه قوانین و شرایط خدمات اتوچار را بر عهده خواهند داشت.<br />
-	در صورتی که اطلاعات فرم خرید ناقص یا مبهم باشد، سفارش مورد نظر، قابل پیگیری و تحویل نخواهد بود.<br />
-	اتوچارمسئولیتی در قبال نقص در ارتباط کاربر با سایت(مانند قطع اینترنت، عدم ارتباط با مخابرات، مشکلات سخت افزاری و ..)نخواهد داشت.<br />
-	اتوچار تحت هیچ شرایطی اطلاعات کاربران را در اختیارسایر افراد قرار نخواهد داد. <br />
-	اتوچار، با استفاده از آخرین فناوری های روز از اطلاعات وارد شده کاربران در سایت حفظ و حراست خواهد نمود. <br />
-	خدمات و اطلاعات موجود در سایت،جهت آگاهی بخشی به عموم جامعه بارگذاری شده است. لذا سوء استفاده از این محتویات و یا کپی برداری از آن، پیگرد قانونی خواهد داشت. برای استفاده از این اطلاعات لازم است مدیر سایت را مطلع نموده و با این مرکز تماس حاصل فرمایید.<br />

                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <button onClick={() => { setAcceptShoppingTerms(true); handleShoppingTermsClose() }} className="btn btn-orange btn-block">می پذیرم</button>
                        </div>
                        <div className="col">
                            <button onClick={() => { setAcceptShoppingTerms(false); handleShoppingTermsClose() }} className="btn btn-light-orange">نمی پذیرم</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="lg" show={showFinalAccept} onHide={handleFinalAcceptClose} className={'Rtl terms-container'}>
                <Modal.Body>
                    <div onClick={() => handleFinalAcceptClose()} className="red-close"></div>
                    <div>
                        مبلغ {amount} تومان <br />
بابت سفارش شما و هزینه ارسال طریق درگاه بانک پرداخت خواهد شد.
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <button onClick={() => createPayment()} className="btn btn-green btn-block">تایید پرداخت</button>
                        </div>
                        <div className="col">
                            <button onClick={() => handleFinalAcceptClose()} className="btn btn-gray btn-block">ویرایش سفارش</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="shopping-area">
                <div className="progress-line w-100 ">
                    <div className="orange-line">
                        <div className="circle orange-circle-full float-left"></div>
                        <div className="circle orange-circle-full float-right"></div>
                    </div>
                    <div className="orange-line">
                        <div className="circle gray-circle"></div>
                    </div>
                </div>
                <div className="progress-captions">
                    <div>
                        تایید سفارشات
                </div>
                    <div></div>
                    <div >
                        انتخاب محل تحویل
                </div>
                    <div></div>
                    <div className="bold">
                        پرداخت و تکمیل خرید
                </div>
                </div>


                <div className="shopping-box">
                    <div className="bold">
                        نحوه پرداخت
                    </div>
                    <div className="line w-100"></div>
                    <div>
                        ‏نحوه پرداخت موردنظر خود را انتخاب نمایید
                    </div>
                    <div className="">
                        <div className=" btn-selector" >

                            <div className="text-center mt-3">
                                <img src={require("../../img/shopping/online-payment.png")}
                                    alt="basket" className="postman" />
                            </div>
                            <div className="text-center mt-2">
                                پرداخت اینترنتی
                                </div>
                            <input type="radio" onClick={() => selectPayMethod(PayMethods.Online)} radioGroup="payType" />


                        </div>
                        <div className=" btn-selector">

                            <div className="text-center">
                                <img src={require("../../img/shopping/pos-payment.png")}
                                    alt="basket" className="postman" />
                            </div>
                            <div className="text-center mt-2">
                                پرداخت در محل با کارت بانکی
                                </div>
                            <input type="radio" onClick={() => selectPayMethod(PayMethods.Pos)} radioGroup="payType" />

                        </div>
                    </div>


                    <div className="bold">
                        خلاصه سفارش
                    </div>
                    <div className="line w-100"></div>

                    {props.basket.map((item) => {
                        if (curbasket === null)
                            return;
                        const CurAvailItem = curbasket.find(
                            (curAvail: any) => curAvail.id === item.id
                        ) as any;
                        //var IsAvail = false;
                        var strPrice = "";
                        if (CurAvailItem !== undefined) {
                            if (CurAvailItem.currentStock >= item.count) {
                                strPrice =
                                    formatAndEncCurrency((item.price / 10).toString()) + " تومان";

                                //IsAvail = true;
                            } else {
                                strPrice = "ناموجود";
                                //IsAvail = false;
                            }
                        }
                        //.currentStock >= item.count ?

                        return (
                            <div
                                key={item.id}
                                className=" flex-container"
                            >
                               
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

                                        <div className="price">
                                            <span>{strPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <ShowMessage msg={msgSelectBank} />
                    <div className="mt-4 line w-100"></div>
                    <div className="accept-shopping-terms checkboxes">
                        <label>
                            <input onChange={handleTerms} type="checkbox"></input>
                            <span onClick={() => showShoppingTermsComponent()} className="btn-selector underline bold">قوانین و مقررات پرداخت</span> &nbsp;
                            <span >
                                از طریق وبسایت اتوچار را می پذیرم.
                        </span>
                        </label>
                    </div>

                    <div>



                    </div>
                    <ShowMessage msg={msgAcceptShoppingTerms} />
                    <div className="row mt-5">
                        <div className="col">
                            <button onClick={() => submit()} className="btn btn-light-gray">تایید و ادامه</button>
                        </div>
                        <div className="col">
                            <button onClick={() => gotoShopping()} className="btn btn-light-orange">بازگشت به اطلاعات تحویل</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Payment as any);
