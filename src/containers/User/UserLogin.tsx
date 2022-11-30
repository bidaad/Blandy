import React, { Component } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { responseModel } from "../../model/general/responseModel";
import MsgBox from "../../components/MsgBox";
import { APIUrl } from "../../helper/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import TagManager from "react-gtm-module";

interface UserInfo {
  username: string;
  password: string;
}

interface RedirectInfo {
  noRedirect: boolean;
}

type UserLoginProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & RedirectInfo &
  RouteComponentProps<{}>;

class UserLogin extends Component<
  UserLoginProps,
  {
    mobile: string;
    isLoading: boolean;
    rememberMe: boolean;
    activeButton: boolean;
    activeForgotPassButton: boolean;
    password: string;
    success: boolean;
    confirmPassword: string;
    passwordType: string;
    msgFirstName: string | undefined;
    msgLastName: string | undefined;
    msgMobile: string | undefined;
    msgPassword: string | undefined;
    msgGeneral: string | undefined;
    msgConfirmPassword: string | undefined;
    msgChallengeCode: string | undefined;
    msgForgotPassMobile: string | undefined;
    view: number;
    counter: number;
    challengeCode: string;
    classError: string;
    redirect: boolean;
    acceptTerms: boolean;
    modal: boolean;
    showmodal: boolean;
  }
> {
  userInfoLocal: any = undefined;
  typeForm: string | undefined = undefined;
  constructor(props: any) {
    super(props);
    this.props.UserLoad(false);
    this.state = {
      mobile: "",
      password: "",
      confirmPassword: "",
      success: false,
      passwordType: "password",

      msgFirstName: undefined,
      msgLastName: undefined,
      msgMobile: undefined,
      msgPassword: undefined,
      msgChallengeCode: undefined,
      msgForgotPassMobile: undefined,
      msgConfirmPassword: undefined,
      msgGeneral: undefined,

      isLoading: false,
      view: 1,
      counter: 10,
      challengeCode: "",
      rememberMe: false,
      classError: "",
      activeButton: false,
      activeForgotPassButton: false,
      redirect: false,
      acceptTerms: false,
      modal: false,
      showmodal: false,
    };
  }

  componentDidMount() {
    this.typeForm = undefined;
    const result = localStorage.getItem("USER_INFO");
    console.log("User Login didmount");

    if (this.props.location !== undefined) {
      const curLocation = this.props.location.pathname.toString();
      if (curLocation.indexOf("userlogin") !== -1) {
        // this.props.showLogin();
        this.setState({ redirect: true });
      }
    }

    if (result) {
      const uinfo = JSON.parse(result) as UserInfo;
      this.userInfoLocal = uinfo;
      // this.setState({acceptTerms:true});
      // this.loginUser(uinfo.username, uinfo.password);
    }
  }
  componentDidUpdate() {
    if (this.state.counter > 0) {
      setTimeout(() => {
        let s = this.state.counter;
        if (s === 0) {
          return false;
        } else {
          this.setState({ counter: this.state.counter - 1 });
        }
      }, 1000);
    }
  }

  handleMobile = (event: any) => {
    this.setState({ mobile: event.target.value });
  };

  checkMobile = () => {
    if (!this.ValidateMobile(this.state.mobile)) {
      this.setState({
        msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
        classError: "plfielderror",
      });
      return;
    } else this.setState({ msgMobile: undefined, classError: "" });
  };
  checkForgotPassMobile = () => {
    if (!this.ValidateMobile(this.state.mobile)) {
      this.setState({
        msgForgotPassMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
        classError: "plfielderror",
      });
      return;
    } else {
      this.setState({
        activeForgotPassButton: true,
        msgForgotPassMobile: undefined,
        classError: "",
      });
    }
  };

  handleForgotPassMobile = (event: any) => {
    if (event.target.value) {
      this.setState({
        mobile: event.target.value,
        activeForgotPassButton: true,
      });
    } else {
      this.setState({
        mobile: event.target.value,
        activeForgotPassButton: false,
      });
    }
  };

  handlePassword = (event: any) => {
    this.setState({ password: event.target.value });
    if (event.target.value !== "") {
      this.setState({ msgPassword: undefined });
      if (this.state.mobile !== undefined) this.setState({ activeButton: true });
      else this.setState({ activeButton: false });
    }
  };
  handleConfirmPassword = (event: any) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleChallengeCode = (event: any) => {
     ;
    this.setState({ challengeCode: event.target.value });

    if (event.target.value.length === 4)
      this.checkForgotPassCode(this.state.mobile, event.target.value);
  };

  

  ValidateMobile = (mobile: string) => {
    if (/^\d{11}$/.test(mobile)) {
      return true;
    }
    return false;
  };

  doCounter = (init: number) => {
    this.setState({ counter: init });
    setTimeout(() => {
      if (this.state.counter > 0) this.doCounter(this.state.counter - 1);
    }, 1000);
  };
  handleClose = () => {
    this.props.hideLogin();
  };
  loginorregister = (mobile: string) => {
    const data = {
      username: mobile,
      password: "***",
      lang: this.props.lang.abr,
      typeLogin: "USER",
    };
    fetch(APIUrl + "/User/LoginOrRegister", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<number>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        if (responseModel > 0) {
           ;
          if (this.userInfoLocal) {
            this.setState({ password: this.userInfoLocal.password, view: 11 });
            return;
          }
          this.setState({ view: 11 });
        } else {
           ;
          this.props.UserLoad(true);
          this.typeForm = "Register";
          this.signup(mobile, "!QAZ#@EW^%$$*((");
        }
      });
  };
  signup = (mobile: string, password: string) => {
     ;
    const data = {
      username: mobile,
      password: password,
      lang: this.props.lang.abr,
      typeLogin: "USER",
    };
    this.setState({ isLoading: true });
    fetch(APIUrl + "/User/signup", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
         ;
        this.setState({ isLoading: false });
        console.log("messageCode=" + responseModel.messageCode);
    
        if (responseModel.messageCode !== 0) {
          this.setState({
            msgGeneral: responseModel.message,
            classError: "plfielderror",
          });
          this.props.UserLoad(false);
          return;
        } else { 
          this.setState({ view: 3 ,counter:129});
        }

        if (this.state.rememberMe === true) {
          const userInfo = { username: mobile, password: password };
          localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
        } else {
          localStorage.removeItem("USER_INFO");
        }

        this.props.setUserInfo(
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

        const { history } = this.props;
        console.log("pushing to user panel");
        const args = {
          dataLayer: {
            event: "sign_up",
          },
          dataLayerName: "PageDataLayer",
        };
        TagManager.dataLayer(args);
        this.props.UserLoad(false);
        if (this.state.redirect) {
          this.props.hideLogin();
          history.push({
            pathname: "/user/panel",
            userID: responseModel.data.id,
          });
        } else if (this.props.showLoginBox) {
          this.props.hideLogin();
        }
      })
      .catch((error) => {
        this.props.UserLoad(false);
        console.log(22222);
        console.log("error");

        console.log("error message=" + error);
        this.setState({ isLoading: false });
      });
  };
  loginUser = (mobile: string, password: string,page:string) => {
    const data = {
      username: mobile,
      password: password,
      lang: this.props.lang.abr,
      typeLogin: "USER",
    };
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
        console.log("messageCode=" + responseModel.messageCode);
   
        if (responseModel.messageCode !== 0) {
          this.setState({
            msgGeneral: responseModel.message,
            classError: "plfielderror",
          });
          this.props.UserLoad(false);
          return;
        } else {
        }

        if (this.state.rememberMe === true) {
          console.log("save to local");

          const userInfo = { username: mobile, password: password };
          localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
        } else {
          localStorage.removeItem("USER_INFO");
        }

        this.props.setUserInfo(
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

        const { history } = this.props;
        console.log("pushing to user panel");
        const args = {
          dataLayer: {
            event: "sign_up",
          },
          dataLayerName: "PageDataLayer",
        };
        TagManager.dataLayer(args);

        if (this.state.redirect) {
          this.props.hideLogin();
          if(page&&page.toUpperCase()==="Main".toUpperCase()){
            history.push({
              pathname: "/",
              userID: responseModel.data.id,
            });
          }
          else
          {
            history.push({
              pathname: "/user/panel",
              userID: responseModel.data.id,
            });
          }


        } else if (this.props.showLoginBox) {
          this.props.hideLogin();
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log("error message=" + error);
        this.props.UserLoad(false);
      });
  };
  submitOrLogin = () => {
    this.props.UserLoad(true);
    const mobile = this.state.mobile;

    this.setState({ classError: "" });
    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        console.log("error mobile");
        this.setState({
          msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
          classError: "plfielderror",
        });
        this.props.UserLoad(false);
        return;
      }
    } else this.setState({ msgMobile: undefined });
    this.loginorregister(mobile);
  };
  submit = () => {
    this.props.UserLoad(true);
    const mobile = this.state.mobile;
    const password = this.state.password;

    this.setState({ classError: "" });
    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        console.log("error mobile");
        this.setState({
          msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
          classError: "plfielderror",
        });
        this.props.UserLoad(false);
        return;
      }
      if (this.state.password.length < 6) {
        console.log("error mobile");
        this.setState({
          msgPassword: "کلمه عبور باید 6 حرف یا عدد انگلیسی باشد",
          classError: "plfielderror",
        });
        this.props.UserLoad(false);
        return;
      } else this.setState({ msgMobile: undefined });
    } else this.setState({ msgMobile: undefined });

    if (this.state.password === "") {
      this.setState({ msgPassword: "لطفا کلمه عبور را وارد کنید" });
      this.props.UserLoad(false);
      return;
    } else this.setState({ msgPassword: undefined });

    this.loginUser(mobile, password,"panel");
  };

  showPassword = () => {
    if (this.state.passwordType === "password")
      this.setState({ passwordType: "text" });
    else this.setState({ passwordType: "password" });
  };

  checkChallenge = (challengeCode: string) => {
    const mobile = this.state.mobile;

    this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });

        if (responseModel.messageCode !== 0) {
          this.setState({ msgMobile: responseModel.message });
          return;
        } else {
          this.setState({ view: 3 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  remeberMe = (event: any) => {
     ;
    this.setState({ rememberMe: event.target.checked });
  };

  resendChallenge = () => {
    const data = {
      username: this.state.mobile,
      password: "***",
    };
    fetch(APIUrl + "/User/ResendCode", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.setState({ isLoading: false });

        if (responseModel.messageCode !== 0) {
          this.setState({ msgMobile: responseModel.message });
          return;
        } else {
          this.setState({ counter: 60 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  checkForgotPassCode = (mobile: string, challengeCode: string) => {
    if (challengeCode === "") {
      this.setState({ msgChallengeCode: "لطفا کد تایید را وارد نمایید" });
      return;
    } else this.setState({ msgChallengeCode: undefined });

    this.setState({ isLoading: true });
    fetch(
      APIUrl +
        "/User/CheckForgotPassChallenge?mobile=" +
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
        this.setState({ isLoading: false });

        console.log(responseModel.message);

        if (responseModel.messageCode !== 0) {
          this.setState({ msgChallengeCode: responseModel.message });
          return;
        } else {
          this.setState({ view: 4 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  verifyForgotPassCode = () => {
    const mobile = this.state.mobile;
    const challengeCode = this.state.challengeCode;
    this.checkForgotPassCode(mobile, challengeCode);
  };

  sendForgotPassMobile = () => {
    this.props.UserLoad(true);
    const mobile = this.state.mobile;
    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        this.setState({
          msgForgotPassMobile:
            "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید.",
        });
        this.props.UserLoad(false);
        return;
      } else this.setState({ msgForgotPassMobile: undefined });
    } else this.setState({ msgForgotPassMobile: undefined });

    console.log("mobile111=" + mobile);

    const data = {
      mobile: mobile,
      email: "",
    };
    this.setState({ isLoading: true });
    fetch(APIUrl + "/User/ResendChallengeCode", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.setState({ isLoading: false });
        this.props.UserLoad(false);
        if (responseModel.messageCode !== 0) {
          this.setState({ msgForgotPassMobile: responseModel.message });
          return;
        } else {
          this.setState({ view: 3, counter: 60 });
        }
      })
      .catch((error) => {
        console.log("error");
        this.props.UserLoad(false);
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  signUpHandler = () => {
     ;
    this.props.UserLoad(true);
    const mobile = this.state.mobile;
    const password = this.state.password;

    this.setState({ classError: "" });
    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        console.log("error mobile");
        this.setState({
          msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
          classError: "plfielderror",
        });
        this.props.UserLoad(false);
        return;
      }
      if (this.state.password.length < 6) {
        console.log("error mobile");
        this.setState({
          msgPassword: "کلمه عبور باید 6 حرف یا عدد انگلیسی باشد",
          classError: "plfielderror",
        });
        this.props.UserLoad(false);
        return;
      } else this.setState({ msgMobile: undefined });
    } else this.setState({ msgMobile: undefined });

    if (this.state.password === "") {
      this.setState({ msgPassword: "لطفا کلمه عبور را وارد کنید" });
      this.props.UserLoad(false);
      return;
    } else this.setState({ msgPassword: undefined });

    this.signup(mobile, password);
  };
  submitNewPassword = () => {
    if (this.state.password === "") {
      this.setState({ msgPassword: "لطفا کلمه عبور را وارد کنید" });
      return;
    } else this.setState({ msgPassword: undefined });

    if (this.state.password.trim().length < 6) {
      this.setState({
        msgPassword: "طول کلمه عبور نباید کمتر از شش کاراکتر باشد",
      });
      return;
    } else this.setState({ msgPassword: undefined });

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        msgConfirmPassword: "کلمه عبور و تایید کلمه عبور یکی نیستند",
      });
      return;
    } else this.setState({ msgConfirmPassword: undefined });

    const mobile = this.state.mobile;
    const challengeCode = this.state.challengeCode;
    const password = this.state.password;

    const data = {
      mobile: mobile,
      challengeCode: challengeCode,
      password: password,
    };

    this.setState({ isLoading: true });
    fetch(APIUrl + "/User/ChangePassword", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.setState({ isLoading: false });

        if (responseModel.messageCode !== 0) {
          this.setState({ msgForgotPassMobile: responseModel.message });
          return;
        } else {
          this.setState({ view: 5, counter: 60 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  clickLoginAfterChangePass = () => {
    this.typeForm=undefined;
    this.loginUser(this.state.mobile, this.state.password, "MAIN");

  };
  clickLoginRedirectPanel = () => {
    this.typeForm=undefined;
    this.props.UserLoad(true);
    this.loginUser(this.state.mobile, this.state.password, "Panel");
  };
  gotoSignUp = () => {
    const { history } = this.props;

    history.push({
      pathname: "/signup",
    });
  };
  handleTerms = () => {
    if (this.state.showmodal === true) {
      if (this.state.modal === true) {
        this.setState({ modal: true });
        return;
      } else {
        this.setState({ modal: false, showmodal: false });
        return;
      }
    }
    this.setState({ modal: true });
  };
  handleOk = () => {
    this.setState({ acceptTerms: true, modal: false, showmodal: true });
  };
  handleNotOk = () => {
    this.setState({ acceptTerms: false, modal: false, showmodal: true });
  };
  render() {
    const Step1 = (
      <div>
        {this.state.modal === true ? (
          <div>
            <div className="overlaySignUp"></div>
            <div className="SignUp-Modal">
              <p>حقوق و قوانین استفاده از اتوچار</p>
              <div>
                <p>قوانین</p>
              </div>
              <span>
                <button
                  className="blandy-button-medium-active"
                  onClick={this.handleOk}
                >
                  می پذیرم
                </button>
                <button
                  className="blandy-button-medium-active"
                  onClick={this.handleNotOk}
                >
                  {" "}
                  نمی پذیرم
                </button>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
    const View1 = (
      <div className="modalLogin">
        {this.props.showLoginBox === true ? (
          <FontAwesomeIcon
            icon={faWindowClose}
            color="orange"
            size="lg"
            className="modalLoginClose"
            onClick={this.handleClose}
          />
        ) : null}

        <div className="text-center register-title">ثبت ‌نام / ورود</div>
        <div className="card-body">
          <div className="">
            <div className=" form-group ulogin">
              <div className={"plfield " + this.state.classError}>
                <input
                  type="text"
                  placeholder=" "
                  autoComplete="off"
                  title="لطفا فیلد شماره موبایل  را وارد کنید"
                  required
                  onChange={(e) => this.handleMobile(e)}
                  onBlur={() => this.checkMobile()}
                  className="pl-input form-control ltr-control"
                  id="username"
                />
                <span className="grow">
                  شماره تلفن همراه خود را وارد نمایید{" "}
                </span>
                <i className="icon-cellphone fa fa-mobile"></i>
                {/* <div className="mobile-prefix">09</div> */}
              </div>
              <ShowMessage msg={this.state.msgMobile} />
            </div>
            <div className="text-center w-100">
              <ShowMessage msg={this.state.msgGeneral} />
            </div>
            <div className="text-center privacy checkboxes">
              <label>
                <input
                  onChange={this.handleTerms}
                  type="checkbox"
                  checked={this.state.acceptTerms}
                ></input>
                <span onClick={() => this.setState({ modal: true })}>
                  حریم خصوصی و قوانین و شرایط استفاده از سایت بلندی را می پذیرم.
                </span>
                <div> {this.state.modal === true ? Step1 : null}</div>
              </label>
            </div>

            <div className="text-center p-2 mt-30">
              <button
                id="loginblandy"
                disabled={
                  this.state.mobile && this.state.acceptTerms ? false : true
                }
                className={
                  this.state.mobile && this.state.acceptTerms
                    ? "blandy-button-active"
                    : " blandy-button-disable"
                }
                onClick={this.submitOrLogin}
              >
                ورود
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    const View1_1 = (
      <div className="modalLogin">
        {this.props.showLoginBox === true ? (
          <FontAwesomeIcon
            icon={faWindowClose}
            color="orange"
            size="lg"
            className="modalLoginClose"
            onClick={this.handleClose}
          />
        ) : null}
        <div className="card-body">
          <div className="form-group ulogin">
            <div
              className={"plfield password-conatiner " + this.state.classError}
            >
              <input
                type={this.state.passwordType}
                autoComplete="new-password"
                placeholder=" "
                title="لطفا فیلد کلمه عبور را وارد کنید"
                required
                onChange={(e) => this.handlePassword(e)}
                defaultValue={this.state.password}
                className="pl-input form-control ltr-control txt-password"
                id="password"
              />
              <span className="grow">کلمه عبور</span>
              <i className="icon-lock fa fa-lock"></i>
              <div className="RememberMe privacy checkboxes">
                <label>
                  <input
                    onChange={(e) => this.remeberMe(e)}
                    type="checkbox"
                    defaultChecked={this.userInfoLocal ? true : false}
                  ></input>
                  <span className="RememberMeSpan">مرا به خاطر بسپار</span>
                </label>
              </div>
              <button
                onClick={this.showPassword}
                className="icon-eye fa fa-eye"
              ></button>
            </div>
            <ShowMessage msg={this.state.msgPassword} />
            <div className="text-right green ">
              <button
                onClick={() => this.setState({ view: 2 })}
                className="linkbtn"
              >
                رمز عبور خود را فراموش کرده ام
              </button>
            </div>
          </div>
          <div className="text-center w-100">
            <ShowMessage msg={this.state.msgGeneral} />
          </div>

          <div className="text-center p-2 mt-30">
            <button
              id="loginblandy"
              disabled={
                this.state.mobile && this.state.acceptTerms ? false : true
              }
              className={
                this.state.mobile && this.state.password
                  ? "blandy-button-active"
                  : " blandy-button-disable"
              }
              onClick={this.submit}
            >
              ورود
            </button>
          </div>
        </div>
      </div>
    );
    const View2 = (
      <div className="modalLogin">
        <div className="text-center register-title">یادآوری کلمه عبور</div>
        <div className="card-body">
          <div className=" form-group">
            <div className="plfield ">
              <input
                type="text"
                placeholder=" "
                title="لطفا فیلد شماره موبایل  را وارد کنید"
                required
                onChange={(e) => this.handleForgotPassMobile(e)}
                onBlur={() => this.checkForgotPassMobile()}
                className="pl-input form-control ltr-control txt-mobile"
                id="staticEmail"
              />
              <span className="grow">شماره موبایل </span>
              <i className="icon-cellphone fa fa-mobile"></i>
            </div>
            <ShowMessage msg={this.state.msgForgotPassMobile} />
          </div>
          <div className="clearfix"></div>
          <div className="mt-5 form-group text-center">
            <button
              onClick={this.sendForgotPassMobile}
              disabled={this.state.activeForgotPassButton ? false : true}
              className={
                this.state.activeForgotPassButton
                  ? "blandy-button-active"
                  : " blandy-button-disable"
              }
            >
              ادامه
            </button>
          </div>
        </div>
      </div>
    );

    const View3 = (
      <div className="modalLogin">
        <div className="text-center register-title">کد تایید</div>

        <div className="text-center register-code">
          کد تایید به شماره همراه شما ارسال شد
        </div>

        <div className="form-group">
          <div className="plfield ">
            <input
              type="text"
              placeholder=" "
              maxLength={4}
              title="کد تایید دریافتی"
              required
              onChange={(e) => this.handleChallengeCode(e)}
              className="pl-input form-control ltr-control txt-challenge"
              id="staticEmail"
            />
            <span className="grow">کد تایید دریافتی</span>
            <i className="icon-challenge fa fa-envelope"></i>
          </div>
          <ShowMessage msg={this.state.msgChallengeCode} />
        </div>

        <div className="form-group text-center">
          {
            this.state.counter > 0 ? (
              <button disabled className="registertext">
                ارسال مجدد کد تا {this.state.counter} ثانیه دیگر
              </button>
            ) : (
              <button className="registerlink" onClick={this.resendChallenge}>
                دریافت مجدد کد تایید
              </button>
            )
          }
        </div>
        <div className="form-group">
          <button
            className="blandy-button-active"
            onClick={this.verifyForgotPassCode}
          >
            تایید کد
          </button>
        </div>
      </div>
    );

    const View4 = (
      <div className="modalLogin">
        {this.typeForm &&
        this.typeForm.toUpperCase() === "Register".toUpperCase() ? (
          <div className="text-center register-title">کلمه عبور</div>
        ) : (
          <div className="text-center register-title">تغییر کلمه عبور</div>
        )}
        <div className="form-group">
          <div className="plfield password-conatiner mt-3">
            <input
              type={this.state.passwordType}
              placeholder=" "
              title=" کلمه عبور خود را وارد کنید"
              required
              onChange={(e) => this.handlePassword(e)}
              className="pl-input form-control ltr-control txt-password"
              id="staticPassword"
            />
            <span className="grow">کلمه عبور</span>
            <i className="icon-lock fa fa-lock"></i>
            <button
              onClick={this.showPassword}
              className="icon-eye fa fa-eye"
            ></button>
          </div>
          <ShowMessage msg={this.state.msgPassword} />
        </div>
        <div className="form-group">
          <div className="plfield mt-3">
            <input
              type="Password"
              placeholder=" "
              title="تکرار کلمه عبور"
              required
              onChange={(e) => this.handleConfirmPassword(e)}
              className="pl-input form-control ltr-control txt-mobile"
              id="staticPassword"
            />
            <span className="grow">تکرار کلمه عبور</span>
            <i className="icon-lock fa fa-lock"></i>
          </div>
          <ShowMessage msg={this.state.msgConfirmPassword} />
        </div>
        <div className="form-group mt-3">
          <button
            className="blandy-button-active"
            onClick={this.submitNewPassword}
          >
            ثبت
          </button>
        </div>
      </div>
    );

    const View5 = (
      <div>
        {this.typeForm &&
        this.typeForm.toUpperCase() === "Register".toUpperCase() ? (
          <div className="card-body  text-center">
            <img
              src={require("../../img/Flower Bouquet-595b40b75ba036ed117d5709.png")}
              className="img-register-sucess ئف-4"
              alt=''
            />
            <div className="mt-1 text-center registertextregister">
              <p>.ثبت ‌نام شما با موفقیت انجام شد</p>
              <p>.به خانواده بلندی خوش اومدی </p>
            </div>
            <div className="mt-2 form-group text-center">
              <button
                className="blandy-button-active"
                onClick={this.clickLoginRedirectPanel}
              >
               تکمیل پروفایل{" "}
              </button>
            </div>
            <div className="mt-4 form-group text-center">
              <button
                className="blandy-button-active"
                onClick={this.clickLoginAfterChangePass}
              >
                صفحه اصلی{" "}
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body  text-center">
            <img
              src={require("../../img/Tick Square.png")}
              className="img-register-sucess ئف-4"
              alt=''
            />
            <div className="text-center registertext">
              کلمه عبور شما با موفقیت تغییر کرد{" "}
            </div>
            <div className="mt-5 form-group text-center">
              <button
                className="blandy-button-active"
                onClick={this.clickLoginAfterChangePass}
              >
                صفحه اصلی{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div>
        {this.props.UserLoading === true ? (
          <div className="overlayuserloadercontentSeller">
            <div className="userloadercontentSeller">
              <div className="userloaderBlandy"></div>
              <span className="AutoCharTextLoadSeller">
                بازار لوازم خانگی بلندی
              </span>
            </div>
          </div>
        ) : null}
        <div className="login-container">
          <div className="UserLogin ">
            <div className="login-area">
              <div className="shadow rtl card ">
                <MsgBox />
                <div className="mt-30 w-100 text-center outer-center">
                  <div className="inner-center logoBlandy"></div>
                </div>

                {this.state.view === 1 ? View1 : null}
                {this.state.view === 11 ? View1_1 : null}
                {this.state.view === 2 ? View2 : null}
                {this.state.view === 3 ? View3 : null}
                {this.state.view === 4 ? View4 : null}
                {this.state.view === 5 ? View5 : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserLogin as any);

class ShowMessage extends Component<{ msg: string | undefined }> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.msg === undefined) return null;
    return (
      <div className="error">
        <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
        {this.props.msg}
      </div>
    );
  }
}
