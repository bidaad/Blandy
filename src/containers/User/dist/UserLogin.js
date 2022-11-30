"use strict";
var __extends = (this && this.__extends) || (function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] }
                instanceof Array && function(d, b) { d.__proto__ = b; }) ||
            function(d, b) { for (var p in b)
                    if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function(d, b) {
        extendStatics(d, b);

        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var UserInfo = require("../../store/UserInfo");
var react_redux_1 = require("react-redux");
var MsgBox_1 = require("../../components/MsgBox");
var config_1 = require("../../helper/config");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_gtm_module_1 = require("react-gtm-module");
var UserLogin = /** @class */ (function(_super) {
    __extends(UserLogin, _super);

    function UserLogin(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMobile = function(event) {
            _this.setState({ mobile: event.target.value });
        };
        _this.checkMobile = function() {
            if (!_this.ValidateMobile(_this.state.mobile)) {
                _this.setState({
                    msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
                    classError: "plfielderror"
                });
                return;
            } else
                _this.setState({ msgMobile: undefined, classError: "" });
        };
        _this.checkForgotPassMobile = function() {
            if (!_this.ValidateMobile(_this.state.mobile)) {
                _this.setState({
                    msgForgotPassMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد.",
                    classError: "plfielderror"
                });
                return;
            } else {
                _this.setState({
                    activeForgotPassButton: true,
                    msgForgotPassMobile: undefined,
                    classError: ""
                });
            }
        };
        _this.handleForgotPassMobile = function(event) {
            if (event.target.value) {
                _this.setState({
                    mobile: event.target.value,
                    activeForgotPassButton: true
                });
            } else {
                _this.setState({
                    mobile: event.target.value,
                    activeForgotPassButton: false
                });
            }
        };
        _this.handlePassword = function(event) {
            _this.setState({ password: event.target.value });
            if (event.target.value !== "") {
                _this.setState({ msgPassword: undefined });
                if (_this.state.mobile != undefined)
                    _this.setState({ activeButton: true });
                else
                    _this.setState({ activeButton: false });
            }
        };
        _this.handleConfirmPassword = function(event) {
            _this.setState({ confirmPassword: event.target.value });
        };
        _this.handleChallengeCode = function(event) {
            _this.setState({ challengeCode: event.target.value });
            if (event.target.value.length === 4)
                _this.checkForgotPassCode(_this.state.mobile, event.target.value);
        };
        _this.ValidateEmail = function(mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return true;
            }
            return false;
        };
        _this.ValidateMobile = function(mobile) {
            if (/^\d{11}$/.test(mobile)) {
                return true;
            }
            return false;
        };
        _this.doCounter = function(init) {
            _this.setState({ counter: init });
            setTimeout(function() {
                if (_this.state.counter > 0)
                    _this.doCounter(_this.state.counter - 1);
            }, 1000);
        };
        _this.handleClose = function(e) {
            _this.props.hideLogin();
        };
        _this.loginUser = function(mobile, password) {
             ;
            var data = {
                //username: '09' + mobile,
                username: mobile,
                password: password,
                lang: _this.props.lang.abr,
                typeLogin: "USER"
            };
            _this.setState({ isLoading: true });
            fetch(config_1.APIUrl + "/User/authenticate", {
                    method: "POST",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                     ;
                    _this.setState({ isLoading: false });
                    console.log("messageCode=" + responseModel.messageCode);
                    if (responseModel.messageCode !== 0) {
                        console.log("errrrrr");
                        // this.props.addMessage([{ msg: responseModel.message, msgType: MessageTypes.Error }]);
                        _this.setState({
                            msgGeneral: responseModel.message,
                            classError: "plfielderror"
                        });
                        return;
                    } else {
                        //this.setState({ message: responseModel.message })
                    }
                    if (_this.state.rememberMe) {
                        console.log("save to local");
                        var userInfo = { username: mobile, password: password };
                        localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
                    }
                    _this.props.setUserInfo(responseModel.data.id, responseModel.data.firstName, responseModel.data.lastName, responseModel.data.username, responseModel.data.mobile, "", responseModel.data.token, responseModel.data.userPermissions, 1, responseModel.resources, responseModel.data.personId);
                    var history = _this.props.history;
                    console.log("pushing to user panel");
                    var args = {
                        dataLayer: {
                            event: "sign_up"
                                /* can pass more variables here if needed */
                        },
                        dataLayerName: "PageDataLayer"
                    };
                    react_gtm_module_1["default"].dataLayer(args);
                    if (_this.state.redirect) {
                        _this.props.hideLogin();
                        history.push({
                            pathname: "/user/panel",
                            userID: responseModel.data.id
                        });
                    } else if (_this.props.showLoginBox) {
                        _this.props.hideLogin();
                    }
                })["catch"](function(error) {
                    console.log(22222);
                    console.log("error");
                    console.log("error message=" + error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.submit = function() {
            var mobile = _this.state.mobile;
            var password = _this.state.password;
            _this.setState({ classError: "" });
            if (_this.state.mobile !== "") {
                if (!_this.ValidateMobile(_this.state.mobile)) {
                    console.log("error mobile");
                    _this.setState({
                        msgMobile: "شماره تلفن همراه وارد شده صحیح نمی باشد. لطفا شماره وارد شده را بررسی کنید",
                        classError: "plfielderror"
                    });
                    return;
                }
                if (_this.state.password.length < 6) {
                    console.log("error mobile");
                    _this.setState({
                        msgPassword: "کلمه عبور باید 6 حرف یا عدد انگلیسی باشد",
                        classError: "plfielderror"
                    });
                    return;
                } else
                    _this.setState({ msgMobile: undefined });
            } else
                _this.setState({ msgMobile: undefined });
            if (_this.state.password === "") {
                _this.setState({ msgPassword: "لطفا کلمه عبور را وارد کنید" });
                return;
            } else
                _this.setState({ msgPassword: undefined });
            _this.loginUser(mobile, password);
        };
        _this.showPassword = function() {
            //console.log(this.passwordRef.current.value);
            if (_this.state.passwordType === "password")
                _this.setState({ passwordType: "text" });
            else
                _this.setState({ passwordType: "password" });
        };
        _this.checkChallenge = function(challengeCode) {
            var mobile = _this.state.mobile;
            _this.setState({ isLoading: true });
            fetch(config_1.APIUrl +
                    "/User/CheckChallenge/?mobile=" +
                    mobile +
                    "&challengeCode=" +
                    challengeCode, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json"
                        }
                    })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.setState({ isLoading: false });
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgMobile: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 3 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.remeberMe = function(event) {
            _this.setState({ rememberMe: event.target.value });
        };
        _this.resendChallenge = function() {
            var data = {
                username: _this.state.mobile,
                password: "***"
            };
            fetch(config_1.APIUrl + "/User/ResendCode", {
                    method: "POST",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.setState({ isLoading: false });
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgMobile: responseModel.message });
                        return;
                    } else {
                        _this.setState({ counter: 60 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.checkForgotPassCode = function(mobile, challengeCode) {
            if (challengeCode === "") {
                _this.setState({ msgChallengeCode: "لطفا کد تایید را وارد نمایید" });
                return;
            } else
                _this.setState({ msgChallengeCode: undefined });
            _this.setState({ isLoading: true });
            fetch(config_1.APIUrl +
                    "/User/CheckForgotPassChallenge?mobile=" +
                    mobile +
                    "&challengeCode=" +
                    challengeCode, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json"
                        }
                    })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.setState({ isLoading: false });
                    console.log(responseModel.message);
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgChallengeCode: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 4 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.verifyForgotPassCode = function() {
            var mobile = _this.state.mobile;
            var challengeCode = _this.state.challengeCode;
            _this.checkForgotPassCode(mobile, challengeCode);
        };
        _this.sendForgotPassMobile = function() {
            var mobile = _this.state.mobile;
            if (_this.state.mobile !== "") {
                if (!_this.ValidateMobile(_this.state.mobile)) {
                    _this.setState({
                        msgForgotPassMobile: "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید."
                    });
                    return;
                } else
                    _this.setState({ msgForgotPassMobile: undefined });
            } else
                _this.setState({ msgForgotPassMobile: undefined });
            console.log("mobile111=" + mobile);
            var data = {
                mobile: mobile,
                email: ""
            };
            _this.setState({ isLoading: true });
            fetch(config_1.APIUrl + "/User/ResendChallengeCode", {
                    method: "POST",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.setState({ isLoading: false });
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgForgotPassMobile: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 3, counter: 60 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.submitNewPassword = function() {
            if (_this.state.password === "") {
                _this.setState({ msgPassword: "لطفا کلمه عبور را وارد کنید" });
                return;
            } else
                _this.setState({ msgPassword: undefined });
            if (_this.state.password.trim().length < 6) {
                _this.setState({
                    msgPassword: "طول کلمه عبور نباید کمتر از شش کاراکتر باشد"
                });
                return;
            } else
                _this.setState({ msgPassword: undefined });
            if (_this.state.password != _this.state.confirmPassword) {
                _this.setState({
                    msgConfirmPassword: "کلمه عبور و تایید کلمه عبور یکی نیستند"
                });
                return;
            } else
                _this.setState({ msgConfirmPassword: undefined });
            var mobile = _this.state.mobile;
            var challengeCode = _this.state.challengeCode;
            var password = _this.state.password;
            var data = {
                mobile: mobile,
                challengeCode: challengeCode,
                password: password
            };
            _this.setState({ isLoading: true });
            fetch(config_1.APIUrl + "/User/ChangePassword", {
                    method: "POST",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.setState({ isLoading: false });
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgForgotPassMobile: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 5, counter: 60 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.setState({ isLoading: false });
                });
        };
        _this.clickLoginAfterChangePass = function () {
             ;
            // const userInfo = { username: this.state.mobile, password: this.state.password };
            // localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
            _this.loginUser(_this.state.mobile, _this.state.password);
            // const { history } = this.props;
            //  history.push({
            //   pathname: "/",
            // });
        };
        _this.gotoSignUp = function() {
            var history = _this.props.history;
            history.push({
                pathname: "/signup"
            });
        };
        _this.state = {
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
            redirect: false
        };
        return _this;
    }
    UserLogin.prototype.componentDidMount = function() {
        var result = localStorage.getItem("USER_INFO");
        console.log("User Login didmount");
        if (this.props.location !== undefined) {
            var curLocation = this.props.location.pathname.toString();
            if (curLocation.indexOf("userlogin") != -1) {
                // this.props.showLogin();
                this.setState({ redirect: true });
            }
        }
        if (result) {
            var uinfo = JSON.parse(result);
            this.loginUser(uinfo.username, uinfo.password);
        }
    };
    UserLogin.prototype.componentDidUpdate = function() {
        var _this = this;
        if (this.state.counter > 0) {
            setTimeout(function() {
                var s = _this.state.counter;
                if (s === 0) {
                    return false;
                } else {
                    _this.setState({ counter: _this.state.counter - 1 });
                }
            }, 1000);
        }
    };
    UserLogin.prototype.render = function() {
        var _this = this;
        var disabled = "disabled";
        // if (!this.props.showLoginBox)
        //     return null;
        var View1 = (react_1["default"].createElement("div", { className: "modalLogin" },
            this.props.showLoginBox === true ? (react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faWindowClose, color: "orange", size: "lg", className: "modalLoginClose", onClick: this.handleClose })) : null,
            react_1["default"].createElement("div", { className: "text-center register-title" }, "\u062B\u0628\u062A \u200C\u0646\u0627\u0645 / \u0648\u0631\u0648\u062F"),
            react_1["default"].createElement("div", { className: "card-body" },
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement("div", { className: " form-group ulogin" },
                        react_1["default"].createElement("div", { className: "plfield " + this.state.classError },
                            react_1["default"].createElement("input", { type: "text", placeholder: " ", autoComplete: "off", title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644  \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handleMobile(e); }, onBlur: function() { return _this.checkMobile(); }, className: "pl-input form-control ltr-control", id: "username" }),
                            react_1["default"].createElement("span", { className: "grow" }, "\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u0647\u0645\u0631\u0627\u0647 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u0646\u0645\u0627\u06CC\u06CC\u062F "),
                            react_1["default"].createElement("i", { className: "icon-cellphone fa fa-mobile" })),
                        react_1["default"].createElement(ShowMessage, { msg: this.state.msgMobile })),
                    react_1["default"].createElement("div", { className: "text-center w-100" },
                        react_1["default"].createElement(ShowMessage, { msg: this.state.msgGeneral })),
                    react_1["default"].createElement("div", { className: "text-center p-2 mt-30" },
                        react_1["default"].createElement("button", {
                            id: "loginblandy",
                            className: this.state.mobile ?
                                "blandy-button-active" :
                                " blandy-button-disable",
                            onClick: this.submit
                        }, "\u0648\u0631\u0648\u062F"))))));
        var View2 = (react_1["default"].createElement("div", { className: "card-body" },
            react_1["default"].createElement("div", { className: "text-center caption-header" }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
            react_1["default"].createElement("div", { className: " form-group" },
                react_1["default"].createElement("div", { className: "plfield " },
                    react_1["default"].createElement("input", { type: "text", placeholder: " ", title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644  \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handleForgotPassMobile(e); }, onBlur: function() { return _this.checkForgotPassMobile(); }, className: "pl-input form-control ltr-control txt-mobile", id: "staticEmail" }),
                    react_1["default"].createElement("span", { className: "grow" }, "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644 "),
                    react_1["default"].createElement("i", { className: "icon-cellphone fa fa-mobile" })),
                react_1["default"].createElement(ShowMessage, { msg: this.state.msgForgotPassMobile })),
            react_1["default"].createElement("div", { className: "clearfix" }),
            react_1["default"].createElement("div", { className: "mt-5 form-group text-center" }, this.state.isLoading ? (react_1["default"].createElement("div", { className: "spinner-border", role: "status" },
                react_1["default"].createElement("span", { className: "sr-only" }, "Loading..."))) : (react_1["default"].createElement("button", {
                onClick: this.sendForgotPassMobile,
                className: this.state.activeForgotPassButton ?
                    "active-orange " :
                    " " + "disabled-gray"
            }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631")))));
        var View3 = (react_1["default"].createElement("div", { className: "card-body " },
            react_1["default"].createElement("div", { className: "text-center caption-header" }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
            react_1["default"].createElement("div", { className: "text-center msg-step3 outer-center" },
                react_1["default"].createElement("div", { className: "check-container inner-center" },
                    react_1["default"].createElement("i", { className: "fa fa-check" })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("span", null, "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 \u0647\u0645\u0631\u0627\u0647 \u0634\u0645\u0627 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F"))),
            react_1["default"].createElement("div", { className: "mt-5 form-group" },
                react_1["default"].createElement("div", { className: "plfield " },
                    react_1["default"].createElement("input", { type: "text", placeholder: " ", maxLength: 4, title: "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u062F\u0631\u06CC\u0627\u0641\u062A\u06CC", required: true, onChange: function(e) { return _this.handleChallengeCode(e); }, className: "pl-input form-control ltr-control txt-challenge", id: "staticEmail" }),
                    react_1["default"].createElement("span", { className: "grow" }, "\u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F \u062F\u0631\u06CC\u0627\u0641\u062A\u06CC"),
                    react_1["default"].createElement("i", { className: "icon-challenge fa fa-envelope" }),
                    react_1["default"].createElement("div", { className: "underline-container" },
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null))),
                react_1["default"].createElement(ShowMessage, { msg: this.state.msgChallengeCode })),
            react_1["default"].createElement("div", { className: "clearfix" }),
            react_1["default"].createElement("div", { className: "mt-5 form-group" }, this.state.isLoading ? (react_1["default"].createElement("div", { className: "spinner-border", role: "status" },
                    react_1["default"].createElement("span", { className: "sr-only" }, "Loading..."))) : this.state.counter > 0 ? (react_1["default"].createElement("button", { disabled: true, className: "btn-resend-challenge btn btn-info w-25 w-100" },
                    "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F ",
                    this.state.counter,
                    " \u062B\u0627\u0646\u06CC\u0647")) : (react_1["default"].createElement("button", { className: "btn-resend-challenge-orgin btn btn-info w-25 w-100", onClick: this.resendChallenge }, "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F"))
                // <button className="btn-resend-challenge btn btn-info w-25 w-100" onClick={this.resendChallenge} >ارسال مجدد کد تایید {this.state.counter} ثانیه</button>
            ),
            react_1["default"].createElement("div", { className: "form-group mt-2" },
                react_1["default"].createElement("button", { className: "btn-for-Login btn-gray btn w-25 w-100", onClick: this.verifyForgotPassCode }, "\u062A\u0627\u06CC\u06CC\u062F \u06A9\u062F"))));
        var View4 = (react_1["default"].createElement("div", { className: "card-body " },
            react_1["default"].createElement("div", { className: "text-center caption-header" }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
            react_1["default"].createElement("div", { className: "text-center msg-step4 outer-center" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("span", null, "\u0644\u0637\u0641\u0627 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F"))),
            react_1["default"].createElement("div", { className: "form-group mt-4" },
                react_1["default"].createElement("div", { className: "plfield password-conatiner" },
                    react_1["default"].createElement("input", { type: this.state.passwordType, placeholder: " ", title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handlePassword(e); }, className: "pl-input form-control ltr-control txt-password", id: "staticPassword" }),
                    react_1["default"].createElement("span", { className: "grow" }, "\u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
                    react_1["default"].createElement("i", { className: "icon-lock fa fa-lock" }),
                    react_1["default"].createElement("button", { onClick: this.showPassword, className: "icon-eye fa fa-eye" })),
                react_1["default"].createElement(ShowMessage, { msg: this.state.msgPassword })),
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("div", { className: "plfield " },
                    react_1["default"].createElement("input", { type: "Password", placeholder: " ", title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u062A\u06A9\u0631\u0627\u0631 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handleConfirmPassword(e); }, className: "pl-input form-control ltr-control txt-mobile", id: "staticPassword" }),
                    react_1["default"].createElement("span", { className: "grow" }, "\u062A\u0627\u06CC\u06CC\u062F \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
                    react_1["default"].createElement("i", { className: "icon-lock fa fa-lock" })),
                react_1["default"].createElement(ShowMessage, { msg: this.state.msgConfirmPassword })),
            react_1["default"].createElement("div", { className: "clearfix" }),
            react_1["default"].createElement("div", { className: "mt-5 form-group" }, this.state.isLoading ? (react_1["default"].createElement("div", { className: "spinner-border", role: "status" },
                react_1["default"].createElement("span", { className: "sr-only" }, "Loading..."))) : (react_1["default"].createElement("button", { className: "btn-for-Login btn-orange btn btn-info w-25 w-100", onClick: this.submitNewPassword }, "\u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631")))));
        var View5 = (react_1["default"].createElement("div", { className: "card-body " },
            react_1["default"].createElement("div", { className: "text-center caption-header" }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"),
            react_1["default"].createElement("div", { className: "text-center msg-step3 outer-center" },
                react_1["default"].createElement("div", { className: "check-container inner-center" },
                    react_1["default"].createElement("i", { className: "fa fa-check" })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("span", null,
                        "\u06A9\u0627\u0631\u0628\u0631 \u06AF\u0631\u0627\u0645\u06CC ",
                        react_1["default"].createElement("br", null),
                        "\u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F"))),
            react_1["default"].createElement("div", { className: "clearfix" }),
            react_1["default"].createElement("div", { className: "mt-5 form-group" },
                react_1["default"].createElement("button", { className: "btn-for-Login btn-orange btn btn-info w-25 w-100", onClick: this.clickLoginAfterChangePass },
                    "\u0648\u0631\u0648\u062F",
                    " "))));
        return (react_1["default"].createElement("div", { className: "login-container" },
            react_1["default"].createElement("div", { className: "UserLogin " },
                react_1["default"].createElement("div", { className: "login-area" },
                    react_1["default"].createElement("div", { className: "shadow rtl card " },
                        react_1["default"].createElement(MsgBox_1["default"], null),
                        react_1["default"].createElement("div", { className: "mt-30 w-100 text-center outer-center" },
                            react_1["default"].createElement("div", { className: "inner-center logoBlandy" })),
                        this.state.view === 1 ? View1 : null,
                        this.state.view === 2 ? View2 : null,
                        this.state.view === 3 ? View3 : null,
                        this.state.view === 4 ? View4 : null,
                        this.state.view === 5 ? View5 : null)))));
    };
    return UserLogin;
}(react_1.Component));
exports["default"] = react_redux_1.connect(function(state) { return state.userinfo; }, UserInfo.actionCreators)(UserLogin);
var ShowMessage = /** @class */ (function(_super) {
    __extends(ShowMessage, _super);

    function ShowMessage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ShowMessage.prototype.render = function() {
        if (this.props.msg === undefined)
            return null;
        return (react_1["default"].createElement("div", { className: "error" },
            react_1["default"].createElement("i", { className: "ml-1 mr-1 fa fa-exclamation-circle" }),
            this.props.msg));
    };
    return ShowMessage;
}(react_1.Component));