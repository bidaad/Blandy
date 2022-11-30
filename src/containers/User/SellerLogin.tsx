import React, { Component, useEffect, useState } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { MessageTypes } from "../../model/general";
import { responseModel } from "../../model/general/responseModel";
import MsgBox from "../../components/MsgBox";
import { APIUrl } from "../../helper/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import TagManager from "react-gtm-module";
import UserLogin from "./UserLogin";

interface UserInfo {
  username: string;
  password: string;
}
interface SellerInfo {
  email: string;
  password: string;
  mobile: string;
  code?: string;
}
interface RedirectInfo {
  noRedirect: boolean;
}

type SellerLoginProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & RedirectInfo &
  RouteComponentProps<{}>;

const SellerLogin = (props: SellerLoginProps) => {
  const [counter, setCounter] = useState(120);
  const [redirect, setRedirect] = useState(false);
  const [seller, setSeller] = useState<SellerInfo>({
    email: "",
    mobile: "",
    password: "",
  });
  const [sellerlogin, setSellerlogin] = useState<SellerInfo>({
    email: "",
    mobile: "",
    password: "",
  });
  const [pushAfterLogin, setPushAfterLogin] = useState(true);
  const [mobile, setMobile] = useState("");
  const [emails, setEmails] = useState("");
  const [msgMobile, setMsgMobile] = useState<string | undefined>();
  const [disableRegister, setDisableRegister] = useState(true);
  const [disableLogin, setDisableLogin] = useState(true);
  const [disableConfrim, setDisableConfrim] = useState(true);
  const [disableReturnPass, setDisableReturnPass] = useState(true);
  const [errorRegister, SetErrorRegister] = useState("");
  const [errorConfrim, SetErrorConfrim] = useState(false);
  const [errorLogin, SetErrorLogin] = useState(false);
  const [errorReturnPass, SetErrorReturnPass] = useState(false);
  const [classError, setClassError] = useState("");
  const [classErroEmail, setClassErrorEmail] = useState("");
  const [classErroPasWord, setClassErroPasWord] = useState("");

  const [msgPassword, setMsgPassword] = useState<string | undefined>();
  const [msgEmail, setMsgEmail] = useState<string | undefined>();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [challengeCode, setChallengeCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [view, setView] = useState(1);
  let curenthistory = useHistory();
  useEffect(() => {
    setSeller({ email: "", mobile: "", password: "", code: "" });
    setSellerlogin({ email: "", mobile: "", password: "", code: "" });
    setEmails("");
    props.SellerLoad(false);
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        let s = counter;
        if (s === 0) {
          return false;
        } else {
          setCounter(counter - 1);
        }
      }, 1000);
    }
  }, [counter]);

  const handleMobile = (event: any) => {
    setSeller({
      mobile: event.target.value,
      email: seller ? seller.email : "",
      password: seller ? seller.password : "",
    });
    checking({
      mobile: event.target.value,
      email: seller ? seller.email : "",
      password: seller ? seller.password : "",
    });
  };
  const handleEmail = (event: any) => {
    setSeller({
      mobile: seller ? seller.mobile : "",
      email: event.target.value,
      password: seller ? seller.password : "",
    });
    let dt: SellerInfo = {
      mobile: seller ? seller.mobile : "",
      email: event.target.value,
      password: seller ? seller.password : "",
    };
    checking(dt);
  };
  const handlePassword = (event: any) => {
    setSeller({
      mobile: seller ? seller.mobile : "",
      email: seller ? seller.email : "",
      password: event.target.value,
    });
    let dt: SellerInfo = {
      mobile: seller ? seller.mobile : "",
      email: seller ? seller.email : "",
      password: event.target.value,
    };
    checking(dt);
  };
  const handleEmailLogin = (event: any) => {
    let dt: SellerInfo = {
      mobile: "",
      email: event.target.value,
      password: sellerlogin ? sellerlogin.password : "",
    };
    setSellerlogin(dt);
    checkingLogin(dt);
  };
  const handleEmailReturnPass = (event: any) => {
    setEmails(event.target.value);
    let dt: SellerInfo = {
      mobile: "",
      email: event.target.value,
      password: "",
    };
    checkingReturnPass(dt);
  };
  const handlePasswordLogin = (event: any) => {
    setSellerlogin({
      mobile: sellerlogin ? sellerlogin.mobile : "",
      email: sellerlogin ? sellerlogin.email : "",
      password: event.target.value,
    });
    let dt: SellerInfo = {
      mobile: sellerlogin ? sellerlogin.mobile : "",
      email: sellerlogin ? sellerlogin.email : "",
      password: event.target.value,
    };
    checkingLogin(dt);
  };
  const checkingLogin = (sl: SellerInfo) => {
    setDisableLogin(false);

    if (sl.email) {
      setMsgEmail(undefined);
      setClassErrorEmail("");
    } else {
      setMsgEmail("ایمیل خود را وارد نمایید");
      setClassErrorEmail("plfielderror");
      setDisableLogin(true);
    }

    if (!sl.password) {
      setMsgPassword("کلمه عبور خود را وارد نمایید");
      setClassErroPasWord("plfielderror");
      setDisableLogin(true);
    } else {
      setMsgPassword(undefined);
      setClassErroPasWord("");
    }
  };
  const checkingReturnPass = (sl: SellerInfo) => {
    setDisableReturnPass(false);
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      String(sl.email).toLowerCase()
    );
    if (emailformat) {
      setMsgEmail(undefined);
      setClassErrorEmail("");
    } else {
      setMsgEmail("آدرس ایمیل خود را به درستی وارد نمایید");
      setClassErrorEmail("plfielderror");
      setDisableReturnPass(true);
    }
  };
  const checking = (sl: SellerInfo) => {
    setDisableRegister(false);
    if (!ValidateMobile("09" + sl.mobile)) {
      setMsgMobile("شماره تلفن همراه خود را به درستی وارد نمایید");
      setClassError("plfielderror");
      setDisableRegister(true);
    } else {
      setMsgMobile(undefined);
      setClassError("");
    }
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      String(sl.email).toLowerCase()
    );
    if (emailformat) {
      setMsgEmail(undefined);
      setClassErrorEmail("");
    } else {
      setMsgEmail("آدرس ایمیل خود را به درستی وارد نمایید");
      setClassErrorEmail("plfielderror");
      setDisableRegister(true);
    }
    var letters = /^[0-9a-zA-Z]+$/;
    if (!sl.password.match(letters) || sl.password.length < 8) {
      setMsgPassword("کلمه عبور باید حداقل 8 حرف یا عدد انگلیسی باشد");
      setClassErroPasWord("plfielderror");
      setDisableRegister(true);
    } else {
      setMsgPassword(undefined);
      setClassErroPasWord("");
    }
  };

  const handleChallengeCode = (event: any) => {
    if (event.target.value.length > 4) {
      return;
    }
    if (event.target.value.length === 4) {
      let dt: SellerInfo = {
        email: seller ? seller.email : "",
        mobile: seller ? seller.mobile : "",
        code: event.target.value,
        password: "",
      };
      setSeller(dt);
      CheckCodeSeller(dt);
      setDisableConfrim(false);
    }
  };

  const ValidateMobile = (mobile: string | undefined) => {
    if (mobile === undefined) {
      return false;
    }
    if (/^\d{11}$/.test(mobile)) {
      return true;
    }
    return false;
  };

  const doCounter = (init: number) => {
    setCounter(init);
    setTimeout(() => {
      if (counter > 0) doCounter(counter - 1);
    }, 1000);
  };
  const handleClose = (e: any) => {
    props.hideLogin();
  };
  const loginUser = (
    email: string,
    password: string,
    pushAfterLogin: boolean
  ) => {
    SetErrorLogin(false);
    const data = {
      //username: '09' + mobile,
      username: email,
      password: password,
      lang: props.lang.abr,
      typeLogin: "SELLER",
    };
    setIsLoading(true);
    props.SellerLoad(true);

    fetch(APIUrl + "/User/authenticate", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setIsLoading(false);
        console.log("messageCode=" + responseModel.messageCode);
        props.SellerLoad(false);
        if (responseModel.messageCode !== 0) {
          setClassError("plfielderror");
          SetErrorLogin(true);
          return;
        }
        if (rememberMe) {
          console.log("save to local");

          const userInfo = { username: mobile, password: password };
          localStorage.setItem("SELLER_USER_INFO", JSON.stringify(userInfo));
        }

        props.setUserInfo(
          responseModel.data.id,
          responseModel.data.firstName,
          responseModel.data.lastName,
          responseModel.data.username,
          responseModel.data.mobile,
          "",
          responseModel.data.token,
          responseModel.data.userPermissions,
          1,
          responseModel.resources,
          responseModel.data.personId
        );

        const { history } = props;
        console.log("pushing to user panel");
        const args = {
          dataLayer: {
            event: "sign_up",
            /* can pass more variables here if needed */
          },
          dataLayerName: "PageDataLayer",
        };
        TagManager.dataLayer(args);

        if (redirect) {
          props.hideLogin();
          history.push({
            pathname: "/user/panel",
            userID: responseModel.data.id,
          });
        } else if (props.showLoginBox) {
          props.hideLogin();
        }
        if (pushAfterLogin) curenthistory.push("/seller/main");
      })
      .catch((error) => {
        console.log(22222);
        console.log("error");

        console.log("error message=" + error);
        setIsLoading(false);
        props.SellerLoad(false);
      });
  };

  // const submit = () => {
  //   loginUser(mobile, password);
  // };

  const showPassword = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  const checkChallenge = (challengeCode: string) => {
    setIsLoading(true);
    fetch(
      APIUrl +
        "/User/CheckChallenge/?mobile=" +
        mobile +
        "&challengeCode=" +
        challengeCode,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setIsLoading(false);

        if (responseModel.messageCode !== 0) {
          setMsgMobile(responseModel.message);
          return;
        } else {
          setView(3);
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        setIsLoading(false);
      });
  };

  const resendChallengeSeller = () => {
    props.SellerLoad(true);
    fetch(APIUrl + "/User/SellerReSendCode", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setIsLoading(false);

        if (responseModel.messageCode !== 0) {
          return;
        } else {
          SetErrorConfrim(false);
          props.SellerLoad(false);
          setCounter(120);
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        setIsLoading(false);
        props.SellerLoad(false);
      });
  };
  const CheckCodeSeller = (data: SellerInfo) => {
    setIsLoading(true);
    props.SellerLoad(true);
    fetch(APIUrl + "/User/CheckChallengeSeller", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setIsLoading(false);
        if (responseModel.messageCode === 1) {
          SetErrorConfrim(true);
          props.SellerLoad(false);
          setSeller({
            email: seller ? seller.email : "",
            mobile: seller ? seller.mobile : "",
            password: "",
            code: undefined,
          });
          return;
        } else {
          SetErrorConfrim(false);
          props.SellerLoad(false);

          setPushAfterLogin(false);

          loginUser(seller.email, seller.password, false);

          curenthistory.push({
            pathname: "/sellerreg/user/" + responseModel.keyId,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        props.SellerLoad(false);
      });
  };

  const gotoSignUp = () => {
    SetErrorRegister("");
    props.SellerLoad(true);
    fetch(APIUrl + "/User/SignUpSeller", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          SetErrorRegister(responseModel.message);
          setView(3);
        } else {
          SetErrorRegister(responseModel.message);
        }
        props.SellerLoad(false);
      });
  };
  const gotoReturnPass = () => {
    props.SellerLoad(true);
    fetch(APIUrl + "/User/AutoChangePasswordSeller", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: "",
        email: emails,
        password: "",
      }),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setView(5);
        if (responseModel.messageCode === 0) {
          SetErrorReturnPass(false);
        } else {
          SetErrorReturnPass(true);
        }
        props.SellerLoad(false);
      });
  };
  const gotoLogin = () => {
    props.SellerLoad(true);
    loginUser(sellerlogin.email, sellerlogin.password, true);
  };

  const disabled = "disabled";
  // if (!props.showLoginBox)
  //     return null;
  const View1 = (
    <div className="modalLogin">
      {props.showLoginBox === true ? (
        <FontAwesomeIcon
          icon={faWindowClose}
          color="orange"
          size="lg"
          className="modalLoginClose"
          onClick={handleClose}
        />
      ) : null}

      <div className="text-center caption-header-seller">
        مرکز فروشندگان اتوچار
      </div>
      <div className="text-center caption-header-title-seller">
        ثبت نام در مرکز فروشندگان{" "}
      </div>
      {errorRegister ? (
        <div className="text-center caption-header-title-error-seller">
          {errorRegister}
        </div>
      ) : null}
      <div className="card-body">
        <div className="">
          <div className=" form-group">
            <div className={"plfield " + classErroEmail}>
              <input
                type="text"
                placeholder=" "
                autoComplete="off"
                tabIndex={1}
                title="ایمیل خود را وارد نمایید"
                required
                onChange={(e) => handleEmail(e)}
                value={seller ? seller.email : ""}
                // onBlur={() => checkMobile()}
                className="pl-input-seller form-control ltr-control txt-mobile-seller"
              />
              <span className="grow-seller">ایمیل خود را وارد نمایید</span>
              {/* <i className="icon-cellphone-seller fa fa-mobile"></i> */}
              <i className="icon-email-seller fa fa-envelope"></i>
              {/* <div className="mobile-prefix">09</div> */}
            </div>

            <ShowMessage msg={msgEmail} />
          </div>
          <div className=" form-group">
            <div className={"plfield " + classError}>
              <input
                type="text"
                placeholder=" "
                tabIndex={2}
                autoComplete="off"
                title="شماره تلفن همراه خود را وارد نمایید "
                required
                onChange={(e) => handleMobile(e)}
                value={seller ? seller.mobile : ""}
                // onBlur={() => checkMobile()}
                className="pl-input-seller form-control ltr-control txt-mobile-seller"
              />
              <span className="grow-seller">
                شماره تلفن همراه خود را وارد نمایید{" "}
              </span>
              <i className="icon-cellphone-seller fa fa-mobile"></i>
              <div className="mobile-prefix-seller">09</div>
            </div>

            <ShowMessage msg={msgMobile} />
          </div>
          <div className="form-group">
            <div className={"plfield " + classErroPasWord}>
              <input
                type={passwordType}
                autoComplete="new-password"
                placeholder=" "
                tabIndex={3}
                value={seller ? seller.password : ""}
                title="لطفا فیلد کلمه عبور را وارد کنید"
                required
                onChange={(e) => handlePassword(e)}
                className="pl-input-seller form-control ltr-control txt-password-seller"
              />
              <span className="grow-seller">کلمه عبور خود را وارد نمایید.</span>
              <i className="icon-lock-seller fa fa-lock"></i>
            </div>

            <ShowMessage msg={msgPassword} />
          </div>

          <div className="text-center p-2">
            <button
              className="btn-signup-seller btn w-25 w-100"
              disabled={disableRegister === true ? true : false}
              onClick={gotoSignUp}
              tabIndex={4}
            >
              ثبت نام
            </button>
          </div>
        </div>
      </div>
      <div className="text-center caption-seller-link">
        {" "}
        قبلا ثبت نام کرده ام: <span onClick={(e) => setView(2)}> ورود </span>
      </div>
    </div>
  );
  const View2 = (
    <div className="modalLogin">
      {props.showLoginBox === true ? (
        <FontAwesomeIcon
          icon={faWindowClose}
          color="orange"
          size="lg"
          className="modalLoginClose"
          onClick={handleClose}
        />
      ) : null}

      <div className="text-center caption-header-seller-login">
        مرکز فروشندگان اتوچار
      </div>
      <div className="text-center caption-header-title-seller-login">
        ورود به مرکز فروشندگان{" "}
      </div>
      {errorLogin ? (
        <div className="text-center caption-header-title-error-seller">
          نام کاربری / رمز عبور اشتباه است
        </div>
      ) : null}

      <div className="card-body">
        <div className="">
          <div className=" form-group">
            <div className={"plfield " + classErroEmail}>
              <input
                type="text"
                placeholder=" "
                autoComplete="off"
                tabIndex={1}
                title="ایمیل خود را وارد نمایید"
                required
                onChange={(e) => handleEmailLogin(e)}
                value={sellerlogin ? sellerlogin.email : ""}
                className="pl-input-seller form-control ltr-control txt-mobile-seller-login"
              />
              <span className="grow-seller">ایمیل خود را وارد نمایید</span>

              <i className="icon-email-seller fa fa-envelope"></i>
            </div>

            <ShowMessage msg={msgEmail} />
          </div>
          <div className="form-group">
            <div className={"plfield " + classErroPasWord}>
              <input
                type={passwordType}
                autoComplete="new-password"
                placeholder=" "
                tabIndex={3}
                value={sellerlogin ? sellerlogin.password : ""}
                title="لطفا فیلد کلمه عبور را وارد کنید"
                required
                onChange={(e) => handlePasswordLogin(e)}
                className="pl-input-seller form-control ltr-control txt-password-seller-login"
              />
              <span className="grow-seller">کلمه عبور خود را وارد نمایید.</span>
              <i className="icon-lock-seller fa fa-lock"></i>
            </div>

            <ShowMessage msg={msgPassword} />
          </div>

          <div className="text-center p-2">
            <button
              className="btn-signup-seller btn w-25 w-100 mt-3"
              disabled={disableLogin === true ? true : false}
              onClick={gotoLogin}
              tabIndex={4}
            >
              ورود
            </button>
            <button
              className="btn-signup-seller  btn w-25 w-100  mt-3"
              disabled={
                sellerlogin && sellerlogin.email.length <= 0 ? true : false
              }
              onClick={(e) => setView(4)}
              tabIndex={4}
            >
              فراموشی کلمه عبور
            </button>
          </div>
        </div>
      </div>
      <div className="text-center caption-seller-link">
        {" "}
        حساب کاربری ندارید ؟ <span onClick={(e) => setView(1)}> ثبت نام </span>
      </div>
    </div>
  );
  const View3 = (
    <div className="modalLogin">
      {props.showLoginBox === true ? (
        <FontAwesomeIcon
          icon={faWindowClose}
          color="orange"
          size="lg"
          className="modalLoginClose"
          onClick={handleClose}
        />
      ) : null}

      <div className="text-center caption-header-seller">
        مرکز فروشندگان اتوچار
      </div>
      <div className="text-center caption-header-title-seller">
        ثبت نام در مرکز فروشندگان{" "}
      </div>
      {errorConfrim === true ? (
        <div className="text-center caption-header-title-error-seller">
          کد وارد شده اشتباه است، کد را بررسی و مجددا وارد نمایید
        </div>
      ) : (
        <div>
          <div className="text-center icon-tick-seller"></div>
          <div className="text-center caption-header-title-confirm-seller">
            ایمیل فعالسازی برایتان ارسال شد،کد ارسال شده را وارد کنید
          </div>
        </div>
      )}

      <div className="card-body">
        <div className="">
          <div className=" form-group">
            <div className={"plfield " + classError}>
              <input
                type="text"
                placeholder=" "
                tabIndex={2}
                pattern="\d{4}"
                maxLength={4}
                autoComplete="off"
                title="کد دریافتی"
                required
                onChange={(e) => handleChallengeCode(e)}
                value={seller ? seller.code : ""}
                className="pl-input-seller form-control ltr-control txt-challenge-seller"
                id="username"
              />
              <span className="grow-seller">کد دریافتی </span>
              <div className="underline-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            <ShowMessage msg={msgMobile} />
          </div>

          <div className="text-center">
            <button
              className="btn-signup-seller btn w-25 w-100"
              disabled={disableConfrim === true ? true : false}
              onClick={gotoSignUp}
              tabIndex={4}
            >
              تایید
            </button>
          </div>
          <div className="mt-3 form-group">
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : counter > 0 ? (
              <button disabled className="btn-signup-seller btn w-25 w-100">
                ارسال مجدد کد تایید {counter} ثانیه
              </button>
            ) : (
              <button
                className="btn-signup-seller btn w-25 w-100"
                onClick={resendChallengeSeller}
              >
                ارسال مجدد کد تایید
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="text-center caption-seller-link">
        {" "}
        حساب کاربری ندارید ؟ <span onClick={(e) => setView(1)}> ثبت نام </span>
      </div>
    </div>
  );
  const View4 = (
    <div className="modalLogin">
      {props.showLoginBox === true ? (
        <FontAwesomeIcon
          icon={faWindowClose}
          color="orange"
          size="lg"
          className="modalLoginClose"
          onClick={handleClose}
        />
      ) : null}

      <div className="text-center caption-header-seller">
        مرکز فروشندگان اتوچار
      </div>
      <div className="text-center caption-header-title-seller">
        بازیابی کلمه عبور
      </div>

      <div className="card-body">
        <div className="">
          <div className=" form-group">
            <div className=" form-group">
              <div className={"plfield " + classErroEmail}>
                <input
                  type="text"
                  placeholder=" "
                  autoComplete="off"
                  tabIndex={1}
                  title="ایمیل خود را وارد نمایید"
                  required
                  onChange={(e) => handleEmailReturnPass(e)}
                  value={emails ? emails : ""}
                  className="pl-input-seller form-control ltr-control txt-email-seller-returnpass"
                />
                <span className="grow-seller">ایمیل خود را وارد نمایید</span>

                <i className="icon-email-seller fa fa-envelope"></i>
              </div>

              <ShowMessage msg={msgEmail} />
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn-signup-seller btn w-25 w-100"
              disabled={disableReturnPass === true ? true : false}
              onClick={gotoReturnPass}
              tabIndex={4}
            >
              تایید
            </button>
          </div>
        </div>
      </div>
      <div className="text-center caption-seller-link">
        {" "}
        قبلا ثبت نام کرده ام: <span onClick={(e) => setView(2)}> ورود </span>
      </div>
    </div>
  );
  const View5 = (
    <div className="modalLogin">
      {props.showLoginBox === true ? (
        <FontAwesomeIcon
          icon={faWindowClose}
          color="orange"
          size="lg"
          className="modalLoginClose"
          onClick={handleClose}
        />
      ) : null}

      <div className="text-center caption-header-seller">
        مرکز فروشندگان اتوچار
      </div>
      <div className="text-center caption-header-title-seller">
        بازیابی کلمه عبور
      </div>
      {errorReturnPass === true ? (
        <div className="text-center caption-header-title-error-seller">
          ایمیل وارد شده اشتباه است
        </div>
      ) : (
        <div>
          <div className="text-center icon-tick-seller"></div>
          <div className="text-center caption-header-title-confirm-seller">
            لینک بازیابی کلمه عبور به ایمیل شما ارسال گردید
          </div>
        </div>
      )}
      <div className="card-body">
        <div className="">
          <div className="mt-3 form-group">
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : counter > 0 ? (
              <button disabled className="btn-signup-seller btn w-25 w-100">
                ارسال مجدد کد تایید {counter} ثانیه
              </button>
            ) : (
              <button
                className="btn-signup-seller btn w-25 w-100"
                onClick={gotoReturnPass}
              >
                ارسال مجدد کد تایید
              </button>
            )}
          </div>
          <div className="text-center">
            <button
              className="btn-signup-seller btn w-25 w-100"
              onClick={(e) => setView(4)}
              tabIndex={4}
            >
              بازگشت
            </button>
          </div>
        </div>
      </div>
      <div className="text-center caption-seller-link">
        {" "}
        قبلا ثبت نام کرده ام: <span onClick={(e) => setView(2)}> ورود </span>
      </div>
    </div>
  );

  return (
    <div>
      {props.SellerLoading === true ? (
        <div className="overlayuserloadercontentSeller">
          <div className="userloadercontentSeller">
            <div className="userloaderseller"></div>
            <span className="AutoCharTextLoadSeller">
              مرکز فروشندگان اتوچار
            </span>
          </div>
        </div>
      ) : null}

      <div className="login-container">
        <div className="SellerLogin ">
          <div className="login-area">
            <div className="shadow rtl card ">
              <MsgBox />
              <div className="mt-seller-30 w-100 text-center outer-center">
                <div className="inner-center logoseller"></div>
              </div>

              {view === 1 ? View1 : null}
              {view === 2 ? View2 : null}
              {view === 3 ? View3 : null}
              {view === 4 ? View4 : null}
              {view === 5 ? View5 : null}
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
)(SellerLogin as any);

class ShowMessage extends Component<{ msg: string | undefined }> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.msg === undefined) return null;
    return (
      <div className="error-seller">
        <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
        {this.props.msg}
      </div>
    );
  }
}
