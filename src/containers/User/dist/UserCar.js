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
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
        f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

    function verb(n) { return function(v) { return step([n, v]); }; }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return { value: op[1], done: false };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                        t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2];
                        _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e];
            y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var UserInfo = require("../../store/UserInfo");
var react_redux_1 = require("react-redux");
var general_1 = require("../../model/general");
var MsgBox_1 = require("../../components/MsgBox");
var config_1 = require("../../helper/config");
var react_bootstrap_1 = require("react-bootstrap");
var react_select_1 = require("react-select");
var Image_1 = require("../../components/Image");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var changeEnc_1 = require("../../helper/changeEnc");
var imgnocar = require("../../img/Bitmap.png");
var imgsmallcar = require("../../img/Bitmap.png");
var UserCar = /** @class */ (function(_super) {
    __extends(UserCar, _super);

    function UserCar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleBrand = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/ , this.setState({ brand: event.value, product: "", products: [] })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.getProducts(event.value)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handleColor = function(event) {
            _this.setState({ color: event.value });
        };
        _this.handleProduct = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                var mo, mdl;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.state.products) return [3 /*break*/ , 2];
                            mo = this.state.products.find(function(v) { return v.value === event.value; });
                            mdl = "";
                            if (mo) {
                                if (mo.model) {
                                    mdl = mo.model;
                                }
                            }
                            return [4 /*yield*/ , this.setState({ product: event.value, model: mdl })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            return [4 /*yield*/ , this.validateCar()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handlePelak1 = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(event.currentTarget.value.length > event.currentTarget.maxLength)) return [3 /*break*/ , 3];
                            event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.maxLength);
                            return [4 /*yield*/ , this.setState({ pelak1: event.currentTarget.value })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/ , 6];
                        case 3:
                            return [4 /*yield*/ , this.setState({ pelak1: event.currentTarget.value })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handlePelak2 = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(event.currentTarget.value.length > event.currentTarget.maxLength)) return [3 /*break*/ , 3];
                            event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.maxLength);
                            return [4 /*yield*/ , this.setState({ pelak2: event.currentTarget.value })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/ , 6];
                        case 3:
                            return [4 /*yield*/ , this.setState({ pelak2: event.currentTarget.value })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handlePelak3 = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(event.currentTarget.value.length > event.currentTarget.maxLength)) return [3 /*break*/ , 3];
                            event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.maxLength);
                            return [4 /*yield*/ , this.setState({ pelak3: event.currentTarget.value })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/ , 6];
                        case 3:
                            return [4 /*yield*/ , this.setState({ pelak3: event.currentTarget.value })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handleCharacters = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                var hcc;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            hcc = this.state.pelakCharacters[event.currentTarget.selectedIndex - 1];
                            return [4 /*yield*/ , this.setState({
                                pelakCharacter: this.state.pelakCharacters[event.currentTarget.selectedIndex].id,
                                plekSign: hcc.sign
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handler_Ok = function(e) {
            fetch(config_1.APIUrl + "/Asset/GetUserCars?PersonId=" + _this.props.personId, {
                    method: "GET",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + _this.props.token
                    }
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    if (responseModel.messageCode === 0) {
                        var data = responseModel.data;
                        if (data.length === 0) {
                            _this.setState({ view: 1 });
                        } else {
                            _this.setState({ cars: data });
                            _this.setState({ view: 1.2 });
                        }
                    }
                    _this.props.UserLoad(false);
                })["catch"](function(error) {
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.getProducts = function(brandId) {
            return __awaiter(_this, void 0, void 0, function() {
                var _this = this;
                return __generator(this, function(_a) {
                    fetch(config_1.APIUrl +
                            "/Product/GetByBrandId?brandId=" +
                            brandId +
                            "&Lang=" +
                            this.props.lang.abr, {
                                method: "GET",
                                headers: {
                                    'ut': '1',
                                    "Content-Type": "application/json"
                                }
                            })
                        .then(function(response) { return response.json(); })
                        .then(function(responseModel) {
                            console.log(responseModel.data);
                            console.log("messageCode=" + responseModel.messageCode);
                            if (responseModel.messageCode === 0) {
                                _this.setState({ products: responseModel.data });
                            }
                            _this.props.UserLoad(false);
                        })["catch"](function(error) {
                            console.log(error);
                            _this.props.UserLoad(false);
                        });
                    return [2 /*return*/ ];
                });
            });
        };
        _this.handleModel = function(event) {
            _this.setState({ model: event.target.value });
            // await this.validateCar();
        };
        _this.handleYear = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/ , this.setState({ year: event.target.value })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handleVIN = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/ , this.setState({ VIN: event.target.value })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/ , this.validateCar()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handlePelak = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/ , this.validateCar()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handleConfirmPassword = function(event) {
            _this.setState({ year: event.target.value });
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
            console.log("mobile=" + mobile);
            if (/^\d{9}$/.test(mobile)) {
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
        _this.loginUser = function(mobile, password) {
            var data = {
                username: "09" + mobile,
                password: password,
                lang: _this.props.lang.abr
            };
            _this.props.UserLoad(true);
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
                    _this.props.UserLoad(false);
                    console.log("messageCode=" + responseModel.messageCode);
                    if (responseModel.messageCode !== 0) {
                        console.log("errrrrr");
                        _this.props.addMessage([
                            { msg: responseModel.message, msgType: general_1.MessageTypes.Error },
                        ]);
                        return;
                    } else {
                        //this.setState({ message: responseModel.message })
                    }
                    _this.props.setUserInfo(responseModel.data.id, responseModel.data.firstName, responseModel.data.lastName, responseModel.data.username, responseModel.data.mobile, "", responseModel.data.token, responseModel.data.userPermissions, 1, responseModel.menuResources, responseModel.data.personId);
                    var history = _this.props.history;
                    console.log("pushing to user panel");
                    history.push({
                        pathname: "/user",
                        userID: responseModel.data.id
                    });
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.submit = function() {
            var mobile = _this.state.mobile;
            var password = _this.state.model;
            if (_this.state.mobile !== "") {
                if (!_this.ValidateMobile(_this.state.mobile)) {
                    _this.setState({
                        msgYear: "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید."
                    });
                    return;
                } else
                    _this.setState({ msgYear: undefined });
            } else
                _this.setState({ msgYear: undefined });
            if (_this.state.model === "") {
                _this.setState({ msgVIN: "لطفا کلمه عبور را وارد کنید" });
                return;
            } else
                _this.setState({ msgVIN: undefined });
            console.log("mobile=" + mobile);
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
            _this.props.UserLoad(true);
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
                    _this.props.UserLoad(false);
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgYear: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 3 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.resendChallenge = function() {};
        _this.checkForgotPassCode = function(mobile, challengeCode) {
            if (challengeCode === "") {
                _this.setState({ msgBrand: "لطفا کد تایید را وارد نمایید" });
                return;
            } else
                _this.setState({ msgBrand: undefined });
            _this.props.UserLoad(true);
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
                    _this.props.UserLoad(false);
                    console.log(responseModel.message);
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgBrand: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 4 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.props.UserLoad(false);
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
            _this.props.UserLoad(true);
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
                    _this.props.UserLoad(false);
                    if (responseModel.messageCode !== 0) {
                        _this.setState({ msgForgotPassMobile: responseModel.message });
                        return;
                    } else {
                        _this.setState({ view: 3, counter: 60 });
                    }
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.validateCar = function() {
            if (!_this.state.brand ||
                !_this.state.product ||
                !_this.state.year ||
                !_this.state.VIN ||
                !_this.state.pelak1 ||
                !_this.state.pelak2 ||
                !_this.state.pelak3 ||
                !_this.state.pelakCharacter ||
                _this.state.products.length < 1) {
                _this.setState({ saveButton: false });
            } else {
                _this.setState({ saveButton: true });
            }
        };
        _this.saveCar = function() {
            _this.setState({
                msgModel: undefined,
                msgYear: undefined,
                msgVIN: undefined,
                msgBrand: undefined
            });
            var cnf = true;
            if (!_this.state.brand) {
                _this.setState({ msgBrand: "لطفا برند را وارد کنید" });
                cnf = false;
            }
            if (!_this.state.product) {
                _this.setState({ msgProduct: "لطفا محصول را وارد کنید" });
                cnf = false;
            }
            if (!_this.state.year) {
                _this.setState({ msgYear: "لطفا سال را وارد کنید" });
                cnf = false;
            }
            if (!_this.state.VIN) {
                _this.setState({ msgVIN: "لطفا شماره VIN را وارد کنید" });
                cnf = false;
            }
            if (!_this.state.year) {
                _this.setState({ msgYear: "لطفا سال را وارد کنید" });
                cnf = false;
            }
            console.log("p1", _this.state.pelak1);
            console.log("p2", _this.state.pelak2);
            console.log("p3", _this.state.pelak3);
            console.log("hc", _this.state.pelakCharacter);
            if (_this.state.pelak1 === "" ||
                _this.state.pelak2 === "" ||
                _this.state.pelak3 === "" ||
                _this.state.pelakCharacter === "") {
                _this.setState({ msgPlak: "لطفا پلاک را وارد کنید" });
                cnf = false;
            }
            console.log(_this.state.pelakCharacter);
            if (cnf === false) {
                return;
            }
            var brand = _this.state.brand;
            var model = _this.state.model;
            var year = _this.state.year;
            var VIN = _this.state.VIN;
            var data = {
                id: _this.state.id,
                productId: _this.state.product,
                year: _this.state.year,
                serialNumberVin: _this.state.VIN === undefined ? "" : _this.state.VIN,
                pelak1: _this.state.pelak1,
                pelak2: _this.state.pelak2,
                pelak3: _this.state.pelak3,
                hcpelakCharacterId: _this.state.pelakCharacter,
                personId: _this.props.personId,
                latestUsage: 0
            };
            _this.props.UserLoad(true);
            fetch(config_1.APIUrl + "/Asset/SaveCar", {
                    method: "POST",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + _this.props.token
                    },
                    body: JSON.stringify(data)
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.props.UserLoad(false);
                    if (responseModel.message !== "Updated") {
                        _this.setState({
                            view: 2.1,
                            brandSign: responseModel.data[0].brandSign
                        });
                        return;
                    }
                    fetch(config_1.APIUrl + "/Asset/GetUserCars?PersonId=" + _this.props.personId, {
                            method: "GET",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + _this.props.token
                            }
                        })
                        .then(function(response) { return response.json(); })
                        .then(function(responseModel) {
                            _this.props.UserLoad(false);
                            if (responseModel.messageCode === 0) {
                                // Updated
                                var data_1 = responseModel.data;
                                if (data_1.length === 0) {
                                    _this.setState({ view: 1 });
                                } else {
                                    _this.setState({ cars: data_1 });
                                    _this.setState({ view: 1.2 });
                                }
                            }
                        })["catch"](function(error) {
                            console.log(error);
                            _this.props.UserLoad(false);
                        });
                })["catch"](function(error) {
                    console.log("error");
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.CancelCar = function() {
            if (_this.state.cars.length === 0) {
                _this.setState({ view: 1 });
            } else {
                _this.setState({ view: 1.2 });
            }
        };
        _this.clickLoginAfterChangePass = function() {
            _this.loginUser(_this.state.mobile, _this.state.model);
        };
        _this.gotoSignUp = function() {
            var history = _this.props.history;
            history.push({
                pathname: "/signup"
            });
        };
        _this.gotoCarServices = function(id) {
            var history = _this.props.history;
            history.push({
                pathname: "/user/car/" + id
            });
        };
        _this.gotoCarServiceList = function(id) {
            var history = _this.props.history;
            history.push({
                pathname: "/user/maintenance/" + id
            });
        };
        _this.setShowAlertModal = function(val) {
            _this.setState({ ShowAlertModal: val });
        };
        _this.addCar = function(e) {
            _this.setState({
                id: undefined,
                brandSign: "",
                VIN: undefined,
                product: "",
                brand: "",
                year: "",
                pelak1: "",
                pelak2: "",
                pelak3: "",
                plekSign: "",
                pelakCharacter: "",
                model: ""
            });
            var id = e.currentTarget.dataset.id;
            if (id !== undefined) {
                fetch(config_1.APIUrl + "/Asset/EditCar?Id=" + id, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json"
                        }
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        _this.props.UserLoad(false);
                        if (responseModel.messageCode === 0) {
                            var res = responseModel.data;
                            if (res.brandId) {
                                _this.getProducts(res.brandId);
                            }
                            _this.setState({
                                id: res.id === undefined ? "" : res.id,
                                brandSign: res.brandSign === undefined ? "" : res.brandSign,
                                model: res.model === undefined ? "" : res.model,
                                VIN: res.serialNumberVin,
                                product: res.productId === undefined ? "" : res.productId,
                                brand: res.brandId === undefined ? "" : res.brandId,
                                year: res.year === undefined ? "" : res.year,
                                pelak1: res.pelak1 === undefined ? "" : res.pelak1,
                                pelak2: res.pelak2 === undefined ? "" : res.pelak2,
                                pelak3: res.pelak3 === undefined ? "" : res.pelak3,
                                plekSign: res.pelakSign === undefined ? "" : res.pelakSign,
                                imageProduct: res.imageProduct === undefined ? "" : res.imageProduct,
                                pelakCharacter: res.hcpelakCharacterId === undefined ?
                                    "" :
                                    res.hcpelakCharacterId
                            });
                            _this.setState({ view: 2 });
                        }
                    });
            }
            _this.setState({ view: 2 });
        };
        _this.checkUsage = function() {
            if (_this.state.usage === undefined) {
                _this.setState({ errorUsage: "border-red" });
                return;
            }
            if (!_this.ValidateUsage(_this.state.usage.toString())) {
                _this.setState({ errorUsage: "border-red" });
                return;
            } else
                _this.setState({ errorUsage: "" });
        };
        _this.ValidateUsage = function(text) {
            if (/^\d+$/.test(text)) {
                return true;
            }
            return false;
        };
        _this.saveUsage = function(carId) {
            var Url = config_1.APIUrl +
                "/AssetUsage/SaveUsage?Id=" +
                carId +
                "&Usage=" +
                _this.state.usage;
            if (_this.state.usage)
                Url =
                config_1.APIUrl +
                "/AssetUsage/SaveUsage?Id=" +
                carId +
                "&Usage=" +
                _this.state.usage;
            fetch(Url, {
                    method: "GET",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + _this.props.token
                    }
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    if (responseModel.messageCode === 0) {
                        _this.setShowAlertModal(false);
                    }
                    _this.props.UserLoad(false);
                })["catch"](function(error) {
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.handleUsage = function(event) {
            _this.setState({ usage: event.target.value });
        };
        _this.HandlerMouserEnter = function(e) {
            $(e.currentTarget).children().first().fadeIn();
        };
        _this.HandlerMouserLeave = function(e) {
            $(e.currentTarget).children().first().fadeOut();
        };
        _this.HandlerInActive = function(e) {
            if (e.currentTarget.checked) {
                _this.setState({ modal: 1, toggleInActive: true });
            }
        };
        _this.HandlerActive = function(e) {
            _this.setState({ modal: 0, toggleInActive: false });
        };
        _this.HandlerDelete = function(e) {
            fetch(config_1.APIUrl + "/Asset/InActiveCar?Id=" + e.currentTarget.dataset.id, {
                    method: "GET",
                    headers: {
                        'ut': '1',
                        "Content-Type": "application/json"
                    }
                })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    _this.props.UserLoad(false);
                    if (responseModel.messageCode === 0) {
                        fetch(config_1.APIUrl + "/Asset/GetUserCars?PersonId=" + _this.props.personId, {
                                method: "GET",
                                headers: {
                                    'ut': '1',
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + _this.props.token
                                }
                            })
                            .then(function(response) { return response.json(); })
                            .then(function(responseModel) {
                                _this.props.UserLoad(false);
                                if (responseModel.messageCode === 0) {
                                    var data = responseModel.data;
                                    if (data.length === 0) {
                                        _this.setState({ view: 1, modal: 0, toggleInActive: false });
                                    } else {
                                        _this.setState({
                                            cars: data,
                                            modal: 0,
                                            toggleInActive: false
                                        });
                                        _this.setState({ view: 1.2 });
                                    }
                                }
                            })["catch"](function(error) {
                                console.log(error);
                                _this.props.UserLoad(false);
                            });
                    }
                });
        };
        _this.handleChangeNotification = function(assetId, e) {
            _this.changeNotification(assetId, e.currentTarget.checked);
        };
        _this.changeNotification = function(assetId, notification) {
            //if (e.currentTarget.checked) {
            fetch(config_1.APIUrl +
                    "/Asset/ChangeNotification?Id=" +
                    assetId +
                    "&Not=" +
                    notification, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + _this.props.token
                        }
                    })
                .then(function(response) { return response.json(); })
                .then(function(responseModel) {
                    //if (responseModel.messageCode === 0) {
                })["catch"](function(error) {
                    console.log(error);
                    _this.props.UserLoad(false);
                });
        };
        _this.props.UserLoad(true);
        _this.state = {
            mobile: "",
            model: "",
            year: "",
            success: false,
            passwordType: "password",
            VIN: undefined,
            msgModel: undefined,
            msgYear: undefined,
            msgVIN: undefined,
            msgBrand: undefined,
            msgForgotPassMobile: undefined,
            msgConfirmPassword: undefined,
            msgColor: undefined,
            msgProduct: undefined,
            msgPlak: undefined,
            isLoading: false,
            view: -1,
            counter: 10,
            challengeCode: "",
            brand: "",
            brands: [],
            product: "",
            products: [],
            color: "",
            colors: [],
            pelakCharacter: "",
            pelakCharacters: [],
            pelak1: "",
            pelak2: "",
            pelak3: "",
            cars: [],
            plekSign: "",
            brandSign: "",
            modal: 0,
            toggleInActive: false,
            saveButton: false,
            ShowAlertModal: false,
            alertId: "",
            usage: undefined,
            errorUsage: "",
            pastDay: "",
            imageProduct: ""
        };
        return _this;
    }
    UserCar.prototype.componentDidMount = function() {
        return __awaiter(this, void 0, void 0, function() {
            var getUsageAlerts;
            var _this = this;
            return __generator(this, function(_a) {
                getUsageAlerts = function() {
                    fetch(config_1.APIUrl + "/Asset/GetUsageAlert?PersonId=" + _this.props.personId, {
                            method: "GET",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + _this.props.token
                            }
                        })
                        .then(function(response) { return response.json(); })
                        .then(function(responseModel) {
                            if (responseModel.messageCode === 0) {
                                _this.setState({
                                    ShowAlertModal: true,
                                    alertId: responseModel.data[0].id,
                                    pastDay: responseModel.data[0].pastDay
                                });
                            } else {
                                _this.setState({ view: 1 });
                            }
                            _this.props.UserLoad(false);
                        })["catch"](function(error) {
                            console.log(error);
                            _this.props.UserLoad(false);
                        });
                };
                fetch(config_1.APIUrl + "/Asset/GetUserCars?PersonId=" + this.props.personId, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.props.token
                        }
                    })
                    .then(function(response) {
                        _this.props.checkStatus(response);
                        return response;
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        if (responseModel.data && responseModel.data.length > 0) {
                            _this.props.UserLoad(false);
                            var data = responseModel.data;
                            if (data.length === 0) {
                                _this.setState({ view: 1 });
                            } else {
                                _this.setState({ cars: data });
                                _this.setState({ view: 1.2 });
                            }
                        } else {
                            _this.setState({ view: 1 });
                        }
                        _this.props.UserLoad(false);
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                fetch(config_1.APIUrl +
                        "/Brand/GetBrandsForCar?pageSize=1000&Lang=" +
                        this.props.lang.abr, {
                            method: "GET",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json"
                            }
                        })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        console.log(responseModel.data);
                        console.log("messageCode=" + responseModel.messageCode);
                        if (responseModel.messageCode === 0) {
                            _this.setState({ brands: responseModel.data });
                        }
                        _this.props.UserLoad(false);
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                fetch(config_1.APIUrl +
                        "/HCPelakCharacter/GetHCList?pageSize=1000&Lang=" +
                        this.props.lang.abr, {
                            method: "GET",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json"
                            }
                        })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        if (responseModel.messageCode === 0) {
                            _this.setState({ pelakCharacters: responseModel.data });
                        }
                        _this.props.UserLoad(false);
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                fetch(config_1.APIUrl + "/HCColor/GetHCList?pageSize=1000&Lang=" + this.props.lang.abr, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json"
                        }
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        console.log(responseModel.data);
                        console.log("messageCode=" + responseModel.messageCode);
                        if (responseModel.messageCode === 0) {
                            _this.setState({ colors: responseModel.data });
                        }
                        _this.props.UserLoad(false);
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                getUsageAlerts();
                return [2 /*return*/ ];
            });
        });
    };
    UserCar.prototype.render = function() {
        var _this = this;
        var curDate = new Date().toLocaleDateString("fa-IR");
        var curentImage = config_1.APIImage + "/plak.png";
        var View1 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "w-75 inner-center" },
                react_1["default"].createElement("div", { className: "text-center mb-3" },
                    react_1["default"].createElement(Image_1["default"], { fallbackSrc: config_1.APIImage + "/default.png", alt: "", src: imgnocar })),
                react_1["default"].createElement("div", { className: "text-center m-5" },
                    react_1["default"].createElement("div", { className: "text-right large-message" },
                        "\u06A9\u0627\u0631\u0628\u0631 \u0639\u0632\u06CC\u0632 ",
                        react_1["default"].createElement("br", null),
                        "\u062F\u0631 \u062D\u0627\u0644 \u062D\u0627\u0636\u0631 \u0645\u0627 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0645\u0631\u0628\u0648\u0637 \u0628\u0647 \u062E\u0648\u062F\u0631\u0648 \u0634\u0645\u0627 \u0631\u0648 \u0646\u062F\u0627\u0631\u06CC\u0645.",
                        react_1["default"].createElement("br", null),
                        "\u0644\u0637\u0641\u0627 \u0627\u0632 \u0637\u0631\u06CC\u0642 \u0644\u06CC\u0646\u06A9 \u0632\u06CC\u0631 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648 \u062E\u0648\u062F\u062A\u0648\u0646 \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F \u062A\u0627 \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u0645\u062E\u0635\u0648\u0635 \u0628\u0647 \u062E\u0648\u062F\u0631\u0648\u062A\u0648\u0646 \u0631\u0648 \u0628\u0628\u06CC\u0646\u06CC\u062F.")),
                react_1["default"].createElement("div", { className: "text-center p-2" },
                    react_1["default"].createElement("button", { className: "btn-orange btn btn-info  ", onClick: this.addCar }, "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646 \u062E\u0648\u062F\u0631\u0648")))));
        var View1_1 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "Car_Row" },
                react_1["default"].createElement("div", { className: "Car-Col" },
                    react_1["default"].createElement("div", { className: "Car-Col-Card" },
                        react_1["default"].createElement("img", { src: imgnocar, alt: "user icon", className: "img-fluid" })),
                    react_1["default"].createElement("button", { className: "btn-orange btn btn-info ", onClick: this.addCar }, "\u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648")))));
        var View1_2 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_bootstrap_1.Modal, { size: "xl", show: this.state.ShowAlertModal, onHide: function() { return _this.setShowAlertModal(false); }, className: "modal-jobcard" },
                react_1["default"].createElement(react_bootstrap_1.Modal.Header, null,
                    react_1["default"].createElement(react_bootstrap_1.Modal.Title, null),
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faWindowClose, color: "gray", size: "lg", onClick: function() { return _this.setShowAlertModal(false); } })),
                react_1["default"].createElement(react_bootstrap_1.Modal.Body, null,
                    react_1["default"].createElement("div", { className: "text-center mb-2" },
                        react_1["default"].createElement("img", { src: require("../../img/alert-medium.png"), alt: "" })),
                    react_1["default"].createElement("div", { className: "x-small" },
                        "\u06A9\u0627\u0631\u0628\u0631 \u06AF\u0631\u0627\u0645\u06CC\u060C ",
                        this.state.pastDay,
                        " \u0631\u0648\u0632 \u0627\u0632 \u062B\u0628\u062A \u0622\u062E\u0631\u06CC\u0646 \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062E\u0648\u062F\u0631\u0648 \u0634\u0645\u0627 \u06AF\u0630\u0634\u062A\u0647 \u0627\u0633\u062A. \u0644\u0637\u0641\u0627 \u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u0622\u062E\u0631\u06CC\u0646 \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062E\u0648\u062F\u0631\u0648 \u0648\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647 \u0631\u0627 \u062B\u0628\u062A \u0646\u0645\u0627\u06CC\u06CC\u062F."),
                    this.state.cars
                    .filter(function(c) { return c.id === _this.state.alertId; })
                    .map(function(c) {
                        return (react_1["default"].createElement("div", { className: "modal-save-usage Car-Col" },
                            react_1["default"].createElement("div", { className: "Car-Col-Card" },
                                react_1["default"].createElement("div", { className: "Car_Row" },
                                    react_1["default"].createElement("p", null,
                                        c.sign,
                                        " ",
                                        c.year)),
                                react_1["default"].createElement("div", { className: "text-center car-container" },
                                    react_1["default"].createElement(Image_1["default"], { fallbackSrc: config_1.APIImage + "car.png", alt: "", src: config_1.APIImage + "/" + c.imageProduct })),
                                react_1["default"].createElement("div", { className: "line-100" }),
                                react_1["default"].createElement("div", { className: " form-group mt-3" },
                                    react_1["default"].createElement("div", { className: "plfield " },
                                        react_1["default"].createElement("input", {
                                            type: "text",
                                            placeholder: " ",
                                            autoComplete: "off",
                                            title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0641\u0639\u0644\u06CC \u062E\u0648\u062F\u0631\u0648  \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
                                            required: true,
                                            onChange: function(e) { return _this.handleUsage(e); },
                                            onBlur: function() { return _this.checkUsage(); },
                                            className: "form-control ltr-control txt-mobile " +
                                                (_this.state.errorUsage === "" ?
                                                    "pl-input" :
                                                    "pl-input-error"),
                                            id: "username"
                                        }),
                                        react_1["default"].createElement("span", { className: "grow" }, "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0641\u0639\u0644\u06CC \u062E\u0648\u062F\u0631\u0648 "),
                                        react_1["default"].createElement("i", { className: "icon-tachometer fa fa-tachometer" }))),
                                react_1["default"].createElement("div", { className: " form-group mt-3" },
                                    react_1["default"].createElement("div", { className: "plfield " },
                                        react_1["default"].createElement("input", { type: "text", placeholder: " ", autoComplete: "off", title: "\u062A\u0627\u0631\u06CC\u062E \u0627\u0645\u0631\u0648\u0632", value: curDate, className: "form-control ltr-control txt-mobile pl-input", id: "currentdate" }),
                                        react_1["default"].createElement("span", { className: "grow" }, "\u062A\u0627\u0631\u06CC\u062E \u0627\u0645\u0631\u0648\u0632"),
                                        react_1["default"].createElement("i", { className: "icon-cellphone fa fa-calendar" })))),
                            react_1["default"].createElement("div", { className: "row mt-2 mb-2" },
                                react_1["default"].createElement("div", { className: "col" },
                                    react_1["default"].createElement("button", { className: "btn-orange-car btn btn-info ", "data-id": c.id, onClick: function() { return _this.saveUsage(c.id); } }, "\u0630\u062E\u06CC\u0631\u0647")),
                                react_1["default"].createElement("div", { className: "col" },
                                    react_1["default"].createElement("button", {
                                        className: "btn-orange-light-car btn btn-info ",
                                        onClick: function() {
                                            _this.changeNotification(c.id, false);
                                            _this.setState({ ShowAlertModal: false });
                                        },
                                        "data-id": c.id
                                    }, "\u063A\u06CC\u0631 \u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0646 \u0647\u0634\u062F\u0627\u0631")),
                                react_1["default"].createElement("div", { className: "col" },
                                    react_1["default"].createElement("button", { className: "btn-orange-light-car btn btn-info ", onClick: function() { return _this.setState({ ShowAlertModal: false }); } }, "\u0628\u0639\u062F\u0627")))));
                    }))),
            react_1["default"].createElement("div", { className: "Car_Row" },
                this.state.cars.map(function(c) {
                    return (react_1["default"].createElement("div", { className: "Car-Col" },
                        react_1["default"].createElement("div", { className: "Car-Col-Card" },
                            react_1["default"].createElement("div", { className: "Car_Row" }),
                            react_1["default"].createElement("div", { className: "Car-Col-Card_Edit" },
                                react_1["default"].createElement("div", { className: "Car_Row3" },
                                    react_1["default"].createElement("p", { "data-toggle": "tooltip", title: c.sign ? c.sign : "" + c.year ? c.year : "" },
                                        c.sign,
                                        " ",
                                        c.year),
                                    react_1["default"].createElement("div", { className: "Car-Title2", onMouseEnter: _this.HandlerMouserEnter, onMouseLeave: _this.HandlerMouserLeave },
                                        react_1["default"].createElement("button", { className: "btn btn-light", onClick: _this.HandlerDelete, "data-id": c.id }, "\u063A\u06CC\u0631 \u0641\u0639\u0627\u0644"),
                                        react_1["default"].createElement("span", null, "..."))),
                                react_1["default"].createElement(Image_1["default"], { fallbackSrc: config_1.APIImage + "car.png", alt: "", src: config_1.APIImage + "/" + c.imageProduct }),
                                react_1["default"].createElement("div", { className: "CarEdit-Div" },
                                    react_1["default"].createElement("div", { className: "CarEdit-Img" },
                                        react_1["default"].createElement("img", { alt: "", src: require("../img/../../img/plak.png") }),
                                        react_1["default"].createElement("span", { className: "plkedit1" }, changeEnc_1["default"](c.pelak1 ? c.pelak1.toString() : "")),
                                        react_1["default"].createElement("span", { className: "plkedit2" }, changeEnc_1["default"](c.pelak2 ? c.pelak2.toString() : "")),
                                        react_1["default"].createElement("span", { className: "plkedit3" }, changeEnc_1["default"](c.pelakSign ? c.pelakSign.toString() : "")),
                                        react_1["default"].createElement("span", { className: "plkedit4" }, changeEnc_1["default"](c.pelak3 ? c.pelak3.toString() : "")))),
                                react_1["default"].createElement("div", { className: "Car_DeActive float-right" }, "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC"),
                                react_1["default"].createElement("div", { className: "float-left" },
                                    react_1["default"].createElement("label", { className: "Toggle_Switch" },
                                        react_1["default"].createElement("input", {
                                            type: "checkbox",
                                            onChange: function(e) {
                                                return _this.handleChangeNotification(c.id, e);
                                            },
                                            defaultChecked: c.notificationActive !== null ?
                                                c.notificationActive :
                                                false
                                        }),
                                        react_1["default"].createElement("span", { className: "Toggle_Slider round" }))),
                                react_1["default"].createElement("div", { className: "Car_Row notification-container" }),
                                c.mroPlanActive !== null ? (c.mroPlanActive ? (react_1["default"].createElement("button", { className: "btn-orange-car btn btn-info ", "data-id": c.id, onClick: function() { return _this.gotoCarServiceList(c.id); } },
                                    " ",
                                    "\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646")) : (react_1["default"].createElement("button", { className: "btn-orange-car btn btn-info ", "data-id": c.id, onClick: function() { return _this.gotoCarServices(c.id); } }, "\u0641\u0639\u0627\u0644 \u0633\u0627\u0632\u06CC \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646"))) : (react_1["default"].createElement("button", { className: "btn-orange-car btn btn-info ", "data-id": c.id, onClick: function() { return _this.gotoCarServices(c.id); } }, "\u0641\u0639\u0627\u0644 \u0633\u0627\u0632\u06CC \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646")),
                                react_1["default"].createElement("button", { className: "btn-orange-light-car btn btn-info ", "data-id": c.id, onClick: _this.addCar }, "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648 \u0645\u0646")))));
                }),
                react_1["default"].createElement("div", { className: "Car-Col" },
                    react_1["default"].createElement("div", { className: "Car-Col-Card" },
                        react_1["default"].createElement("div", { className: "Car-Col-Card_New2" },
                            react_1["default"].createElement("div", { className: "Car_Row5" }),
                            react_1["default"].createElement("img", { src: imgnocar, alt: "user icon", className: "img-fluid" }),
                            react_1["default"].createElement("button", { className: "btn-orange-car btn btn-info ", onClick: this.addCar }, "\u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648")))))));
        var View2 = (react_1["default"].createElement("div", { className: "car-panel card-body" },
            react_1["default"].createElement("div", { className: "row myCarCadr" },
                this.state.modal === 1 ? (react_1["default"].createElement("div", null,
                    " ",
                    react_1["default"].createElement("div", { className: "overlayCar" }),
                    react_1["default"].createElement("div", { className: "Car-Modal" },
                        react_1["default"].createElement("p", null, "\u06A9\u0627\u0631\u0628\u0631 \u06AF\u0631\u0627\u0645\u06CC"),
                        react_1["default"].createElement("p", null, "\u06A9\u0644\u06CC\u0647 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062B\u0628\u062A \u0634\u062F\u0647 \u062F\u0631 \u0645\u0648\u0631\u062F \u062E\u0648\u062F\u0631\u0648 \u0634\u0645\u0627 \u062F\u0631 \u0633\u06CC\u0633\u062A\u0645 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u062E\u0648\u0627\u0647\u062F \u0634\u062F!"),
                        react_1["default"].createElement("div", { className: "Car-Modal-Row" },
                            react_1["default"].createElement("button", { onClick: this.HandlerActive }, "\u0641\u0639\u0627\u0644 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0646 \u062E\u0648\u062F\u0631\u0648"),
                            react_1["default"].createElement("button", { "data-id": this.state.id, onClick: this.HandlerDelete }, "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0646\u0645\u0648\u062F\u0646 \u062E\u0648\u062F\u0631\u0648"))),
                    " ")) : null,
                react_1["default"].createElement("div", { className: "col-lg-7 col-12" },
                    react_1["default"].createElement("div", { className: "text-center caption-header-user-car" },
                        react_1["default"].createElement("li", {
                            onClick: function() {
                                return _this.props.history.push({ pathname: "/user/panel" });
                            },
                            className: "fa fa-arrow-right back-arrow caption-header-user-icon"
                        }),
                        "\u062E\u0648\u062F\u0631\u0648\u06CC \u0645\u0646",
                        " "),
                    react_1["default"].createElement("div", { className: "captionline" }),
                    react_1["default"].createElement("div", { className: "row Car_Row_Model" },
                        react_1["default"].createElement("div", { className: "col-lg-6 mb26" },
                            react_1["default"].createElement(react_select_1["default"], { className: "ddBrands", required: true, onChange: this.handleBrand, placeholder: "برند تولید کننده", value: this.state.brands.filter(function(option) { return option.value === _this.state.brand; }), options: this.state.brands }),
                            react_1["default"].createElement(ShowMessage, { msg: this.state.msgBrand })),
                        react_1["default"].createElement("div", { className: "col-lg-6 mb26" },
                            react_1["default"].createElement(react_select_1["default"], { className: "ddBrands", required: true, onChange: this.handleProduct, placeholder: "محصول", value: this.state.products.filter(function(option) { return option.value === _this.state.product; }), options: this.state.products }),
                            react_1["default"].createElement(ShowMessage, { msg: this.state.msgProduct }))),
                    react_1["default"].createElement("div", { className: "form-group car-item mb26" },
                        react_1["default"].createElement("div", { className: "plfield plfield-mr" },
                            react_1["default"].createElement("input", { type: "number", placeholder: " ", title: "\u0644\u0637\u0641\u0627 \u0633\u0627\u0644 \u062A\u0648\u0644\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handleYear(e); }, value: this.state.year, className: "pl-input form-control" }),
                            react_1["default"].createElement("span", { className: "grow" }, "\u0633\u0627\u0644 \u062A\u0648\u0644\u06CC\u062F")),
                        react_1["default"].createElement(ShowMessage, { msg: this.state.msgYear })),
                    react_1["default"].createElement("div", { className: "form-group car-item mb26" },
                        react_1["default"].createElement("div", { className: "plfield  plfield-mr" },
                            react_1["default"].createElement("input", { type: "text", placeholder: " ", title: "\u0644\u0637\u0641\u0627 \u0634\u0645\u0627\u0631\u0647 VIN \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, value: this.state.VIN, onChange: function(e) { return _this.handleVIN(e); }, className: "pl-input form-control" }),
                            react_1["default"].createElement("span", { className: "grow" }, "\u0634\u0645\u0627\u0631\u0647 VIN")),
                        react_1["default"].createElement(ShowMessage, { msg: this.state.msgVIN })),
                    react_1["default"].createElement("div", { className: "form-group car-item" }, curentImage !== undefined ? (react_1["default"].createElement("div", { className: "CarPlk" },
                        react_1["default"].createElement("div", { className: "Car_Pelak  plfield-pelak-mr" },
                            react_1["default"].createElement("input", { type: "number", maxLength: 2, onChange: function(e) { return _this.handlePelak3(e); }, defaultValue: this.state.pelak3 }),
                            react_1["default"].createElement("input", { type: "number", maxLength: 3, onChange: function(e) { return _this.handlePelak2(e); }, defaultValue: this.state.pelak2 }),
                            react_1["default"].createElement("select", { onChange: function(e) { return _this.handleCharacters(e); }, value: this.state.plekSign },
                                react_1["default"].createElement("option", { className: "Car_Pelak_Option" }),
                                this.state.pelakCharacters !== undefined ?
                                this.state.pelakCharacters.map(function(e) { return (react_1["default"].createElement("option", { "data-id": e.id, className: "Car_Pelak_Option" }, e.sign)); }) :
                                null),
                            react_1["default"].createElement("input", { type: "number", maxLength: 2, onChange: function(e) { return _this.handlePelak1(e); }, defaultValue: this.state.pelak1 })),
                        react_1["default"].createElement(ShowMessage, { msg: this.state.msgPlak }))) : (react_1["default"].createElement("div", null))),
                    this.state.id !== "" &&
                    this.state.id !== undefined &&
                    this.state.id.length > 0 ? (react_1["default"].createElement("div", { className: "form-group car-item" },
                        react_1["default"].createElement("div", { className: "Car_Row" },
                            react_1["default"].createElement("p", { className: "Car_DeActive" }, "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0646\u0645\u0648\u062F\u0646 \u0627\u06CC\u0646 \u062E\u0648\u062F\u0631\u0648 \u062F\u0631 \u0633\u0627\u0645\u0627\u0646\u0647 \u0627\u062A\u0648\u0686\u0627\u0631"),
                            react_1["default"].createElement("label", { className: "Toggle_Switch" },
                                react_1["default"].createElement("input", { type: "checkbox", onChange: this.HandlerInActive, checked: this.state.toggleInActive }),
                                react_1["default"].createElement("span", { className: "Toggle_Slider round" }))))) : null,
                    react_1["default"].createElement("div", { className: "clearfix" }),
                    react_1["default"].createElement("div", { className: "form-group car-item" }, this.state.id !== "" &&
                        this.state.id !== undefined &&
                        this.state.id.length > 0 ? (react_1["default"].createElement("div", { className: "text-center" },
                            react_1["default"].createElement("button", { onClick: this.saveCar, className: "btn-orange-car btn" }, "\u0630\u062E\u06CC\u0631\u0647 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A"),
                            react_1["default"].createElement("button", { onClick: this.CancelCar, className: "btn-orange-car btn" }, "\u0644\u063A\u0648 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A"))) : (react_1["default"].createElement("div", null, this.state.saveButton ? (react_1["default"].createElement("button", { onClick: this.saveCar, className: "btn-orange-car btn btn-car-ml" }, "\u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648")) : (react_1["default"].createElement("button", { className: "UserCarSubmit btn btn-car-ml", disabled: true, onClick: this.saveCar }, "\u062B\u0628\u062A \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648")))))),
                react_1["default"].createElement("div", { className: "col-lg-5 col-12" },
                    react_1["default"].createElement("div", { className: "edit-usercard-container" },
                        react_1["default"].createElement("img", {
                            alt: "",
                            src: this.state.imageProduct !== "" ?
                                config_1.APIImage + "/" + this.state.imageProduct :
                                imgnocar
                        }))))));
        var View2_1 = (react_1["default"].createElement("div", { className: "car-panel card-body" },
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-8" },
                    react_1["default"].createElement("div", { className: "caption" }, "\u062E\u0648\u062F\u0631\u0648 \u0645\u0646"),
                    react_1["default"].createElement("div", { className: "captionline" }),
                    react_1["default"].createElement("div", { className: "form-group" },
                        react_1["default"].createElement("div", { className: "form-group car-item" },
                            react_1["default"].createElement("div", { className: "plfield " },
                                react_1["default"].createElement("p", { className: "pl-input form-control" },
                                    this.state.brandSign,
                                    " "),
                                react_1["default"].createElement("span", { className: "grow" }, "\u0628\u0631\u0646\u062F ")))),
                    react_1["default"].createElement("div", { className: "form-group  car-item" },
                        react_1["default"].createElement("div", { className: "plfield " },
                            react_1["default"].createElement("input", { type: "text", placeholder: " ", disabled: true, title: "\u0644\u0637\u0641\u0627 \u0633\u0627\u0644 \u062A\u0648\u0644\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, onChange: function(e) { return _this.handleYear(e); }, value: this.state.year, className: "pl-input form-control" }),
                            react_1["default"].createElement("span", { className: "grow" }, "\u0633\u0627\u0644 \u062A\u0648\u0644\u06CC\u062F"))),
                    react_1["default"].createElement("div", { className: "form-group car-item" },
                        react_1["default"].createElement("div", { className: "plfield " },
                            react_1["default"].createElement("input", { type: "text", placeholder: " ", disabled: true, title: "\u0644\u0637\u0641\u0627 \u0634\u0645\u0627\u0631\u0647 VIN \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, value: this.state.VIN, onChange: function(e) { return _this.handleVIN(e); }, className: "pl-input form-control" }),
                            react_1["default"].createElement("span", { className: "grow" }, "\u0634\u0645\u0627\u0631\u0647 VIN"))),
                    react_1["default"].createElement("div", { className: "form-group car-item" }, curentImage !== undefined ? (react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { className: "Car_Pelak " },
                            react_1["default"].createElement("input", { type: "number", value: this.state.pelak3, disabled: true }),
                            react_1["default"].createElement("input", { type: "number", value: this.state.pelak2, disabled: true }),
                            react_1["default"].createElement("select", { disabled: true, value: this.state.plekSign },
                                react_1["default"].createElement("option", { className: "Car_Pelak_Option" }),
                                this.state.pelakCharacters !== undefined ?
                                this.state.pelakCharacters.map(function(e) { return (react_1["default"].createElement("option", { "data-id": e.id, className: "Car_Pelak_Option" }, e.sign)); }) :
                                null),
                            react_1["default"].createElement("input", { type: "number", disabled: true, value: this.state.pelak1 })))) : (react_1["default"].createElement("div", null))),
                    react_1["default"].createElement("div", { className: "Car-Alert" },
                        react_1["default"].createElement("p", null, "\u06A9\u0627\u0631\u0628\u0631 \u06AF\u0631\u0627\u0645\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062E\u0648\u062F\u0631\u0648 \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062B\u0628\u062A \u0634\u062F."),
                        react_1["default"].createElement("button", { onClick: this.handler_Ok, className: "Address-Btn_Ok btn w-100" }, "\u0645\u062A\u0648\u062C\u0647 \u0634\u062F\u0645"))),
                react_1["default"].createElement("div", { className: "col-lg-4" },
                    react_1["default"].createElement("span", { className: "helper" }),
                    react_1["default"].createElement("img", { src: imgsmallcar, alt: "car", className: "img-fluid vertical-middle" })))));
        var View3 = (react_1["default"].createElement("div", { className: "card-body " },
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
                react_1["default"].createElement(ShowMessage, { msg: this.state.msgBrand })),
            react_1["default"].createElement("div", { className: "clearfix" }),
            react_1["default"].createElement("div", { className: "mt-5 form-group" }, this.state.counter > 0 ? (react_1["default"].createElement("button", { disabled: true, className: "btn-resend-challenge btn btn-info w-25 w-100" },
                "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F ",
                this.state.counter,
                " \u062B\u0627\u0646\u06CC\u0647")) : (react_1["default"].createElement("button", { className: "btn-resend-challenge btn btn-info w-25 w-100", onClick: this.resendChallenge },
                "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F \u06A9\u062F \u062A\u0627\u06CC\u06CC\u062F ",
                this.state.counter,
                " \u062B\u0627\u0646\u06CC\u0647"))),
            react_1["default"].createElement("div", { className: "form-group" },
                react_1["default"].createElement("button", { className: "btn-orange btn btn-info  w-100", onClick: this.verifyForgotPassCode }, "\u062A\u0627\u06CC\u06CC\u062F \u06A9\u062F"))));
        var View4 = (react_1["default"].createElement("div", { className: "card-body " },
            react_1["default"].createElement("div", { className: "text-center msg-step4 outer-center" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("span", null, "\u0644\u0637\u0641\u0627 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F"))),
            react_1["default"].createElement("div", { className: "clearfix" })));
        var View5 = (react_1["default"].createElement("div", { className: "card-body " },
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
                react_1["default"].createElement("button", { className: "btn-orange btn btn-info  w-100", onClick: this.clickLoginAfterChangePass },
                    "\u0648\u0631\u0648\u062F",
                    " "))));
        return (react_1["default"].createElement("div", { className: "UserCar outer-center" },
            react_1["default"].createElement("div", { className: "inner-center w-100" },
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement(MsgBox_1["default"], null),
                    this.state.view === 1 ? View1 : null,
                    this.state.view === 1.1 ? View1_1 : null,
                    this.state.view === 1.2 ? View1_2 : null,
                    this.state.view === 2 ? View2 : null,
                    this.state.view === 2.1 ? View2_1 : null,
                    this.state.view === 3 ? View3 : null,
                    this.state.view === 4 ? View4 : null,
                    this.state.view === 5 ? View5 : null))));
    };
    return UserCar;
}(react_1.Component));
exports["default"] = react_redux_1.connect(function(state) { return state.userinfo; }, UserInfo.actionCreators)(UserCar);
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