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
var config_1 = require("../../helper/config");
var react_select_1 = require("react-select");
var UserMessages = /** @class */ (function(_super) {
    __extends(UserMessages, _super);

    function UserMessages(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubject = function(event) {
            _this.setState({ subjectId: event.value });
        };
        _this.handleText = function(event) {
            _this.setState({ text: event.currentTarget.value });
        };
        _this.HandleShowSend = function(event) {
            _this.setState({ value: 2 });
        };
        _this.gotoMessages = function() {;
            _this.setState({ value: 1 });
            var history = _this.props.history;
            history.push({
                pathname: "/user/messages/"
            });
        };
        _this.HandleMessageBoxDetail = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                var data;
                var _this = this;
                return __generator(this, function(_a) {
                    this.props.UserLoad(true);
                    data = {
                        chatId: event.currentTarget.dataset.chatid,
                        chatText: "NODATA"
                    };
                    fetch(config_1.APIUrl + "/ChatDetail/GetMessageBoxesByChatId", {
                            method: "POST",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + this.props.token
                            },
                            body: JSON.stringify(data)
                        })
                        .then(function(response) { return response.json(); })
                        .then(function(responseModel) {
                            _this.setState({ messageboxdetails: responseModel.data, value: 4 });
                            _this.props.UserLoad(false);
                        })["catch"](function(error) {
                            console.log(error);
                            _this.props.UserLoad(false);
                        });
                    return [2 /*return*/ ];
                });
            });
        };
        _this.handleSend = function(event) {
            _this.props.UserLoad(true);
            console.log(_this.state.text);
            if (_this.state.text === undefined || _this.state.text === "") {
                _this.setState({ Error: true });
                return;
            }
            if (_this.state.subjectId === undefined || _this.state.subjectId === "") {
                _this.setState({ Error: true });
                return;
            }
            var data = {
                sign: _this.state.text,
                hcchatTitle: _this.state.subjectId,
                userId: _this.props.userId
            };
            fetch(config_1.APIUrl + "/Chat/SaveMessageBoxForUser", {
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
                })["catch"](function(error) {
                    _this.props.UserLoad(false);
                    console.log(error);
                });
        };
        _this.toBase64 = function(file) {
            return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                    return [2 /*return*/ , new Promise(function(resolve, reject) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function() { return resolve(reader.result); };
                        reader.onerror = function(error) { return reject(error); };
                    })];
                });
            });
        };
        _this.handleFileChange = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                var chatId, files, f, _loop_1, this_1, i, len, state_1, Msg;
                var _this = this;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            chatId = event.currentTarget.dataset.chatid;
                            files = [];
                            return [4 /*yield*/ , event.target.files];
                        case 1:
                            f = _a.sent();
                            _loop_1 = function() {
                                var size, names, name, suffix, type;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            size = f[i].size;
                                            names = f[i].name.split(".");
                                            name = names[0];
                                            suffix = names[1];
                                            type = f[i].type;
                                            if (size > 100 ||
                                                (suffix.toString().toUpperCase() !== "PNG" &&
                                                    suffix.toString().toUpperCase() !== "JPG" &&
                                                    suffix.toString().toUpperCase() !== "PDF")) {
                                                this_1.setState({ alertUpload: true });
                                                setTimeout(function() {
                                                    _this.setState({ alertUpload: false });
                                                }, 2000);
                                                files = [];
                                                return [2 /*return*/ , { value: void 0 }];
                                            }
                                            return [4 /*yield*/ , this_1.toBase64(f[i]).then(function(data) {
                                                var mydata = {
                                                    size: Number(size),
                                                    name: name,
                                                    type: type,
                                                    extention: suffix,
                                                    image: data
                                                };
                                                files.unshift(mydata);
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/ ];
                                    }
                                });
                            };
                            this_1 = this;
                            i = 0, len = f.length;
                            _a.label = 2;
                        case 2:
                            if (!(i < len)) return [3 /*break*/ , 5];
                            return [5 /*yield**/ , _loop_1()];
                        case 3:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/ , state_1.value];
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/ , 2];
                        case 5:
                            this.setState({
                                message: { chatId: chatId, chatText: this.state.message.chatText }
                            });
                            Msg = {
                                chatId: chatId,
                                chatText: this.state.message.chatText,
                                files: files
                            };
                            fetch(config_1.APIUrl + "/ChatDetail/Save", {
                                    method: "POST",
                                    headers: {
                                        'ut': '1',
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + this.props.token
                                    },
                                    body: JSON.stringify(Msg)
                                })
                                .then(function(response) { return response.json(); })
                                .then(function(responseModel) {
                                    var rm = responseModel;
                                    var st = _this.state.messageboxdetails !== undefined &&
                                        _this.state.messageboxdetails.messageBoxDetail !== undefined ?
                                        _this.state.messageboxdetails.messageBoxDetail.slice() :
                                        [];
                                    var rd = rm.data;
                                    if (st !== undefined) {
                                        for (var i = 0, len2 = files.length; i < len2; i++) {
                                            rd[0].fileText = "*" + files[i].name + "." + files[i].extention;
                                        }
                                        st.push(rd[0]);
                                        _this.setState({
                                            messageboxdetails: {
                                                messageBoxDetail: st,
                                                messageBox: _this.state.messageboxdetails.messageBox
                                            },
                                            message: { chatText: "", chatId: chatId },
                                            SendAttach: true
                                        }, function() { return console.log(_this.state.message); });
                                    }
                                    _this.props.UserLoad(false);
                                })["catch"](function(error) {
                                    console.log(error);
                                    _this.props.UserLoad(false);
                                });
                            return [2 /*return*/ ];
                    }
                });
            });
        };
        _this.handleUploadClick = function(event) {
            if (_this.stepInput.current !== null) {
                _this.stepInput.current.click();
            }
        };
        _this.handleSendMessage = function(event) {
            return __awaiter(_this, void 0, void 0, function() {
                var chatId, Msg;
                var _this = this;
                return __generator(this, function(_a) {
                    this.props.UserLoad(true);
                    chatId = event.currentTarget.dataset.chatid;
                    this.setState({
                        message: { chatId: chatId, chatText: this.state.message.chatText }
                    });
                    Msg = { chatId: chatId, chatText: this.state.message.chatText };
                    fetch(config_1.APIUrl + "/ChatDetail/Save", {
                            method: "POST",
                            headers: {
                                'ut': '1',
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + this.props.token
                            },
                            body: JSON.stringify(Msg)
                        })
                        .then(function(response) { return response.json(); })
                        .then(function(responseModel) {
                            var rm = responseModel;
                            var st = _this.state.messageboxdetails !== undefined &&
                                _this.state.messageboxdetails.messageBoxDetail !== undefined ?
                                _this.state.messageboxdetails.messageBoxDetail.slice() :
                                [];
                            var rd = rm.data;
                            if (st !== undefined) {
                                st.push(rd[0]);
                                _this.setState({
                                    messageboxdetails: {
                                        messageBoxDetail: st,
                                        messageBox: _this.state.messageboxdetails.messageBox
                                    },
                                    message: { chatText: "", chatId: chatId },
                                    SendAttach: true
                                }, function() { return console.log(_this.state.message); });
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
        _this.handleChangeMessage = function(event) {
            if (event.currentTarget.value.length > 0) {
                _this.setState({
                    message: { chatText: event.currentTarget.value, chatId: "" },
                    SendAttach: false
                });
            } else {
                _this.setState({
                    message: { chatText: event.currentTarget.value, chatId: "" },
                    SendAttach: true
                });
            }
        };
        _this.handleEndMessage = function(event) {
            _this.props.UserLoad(true);
            var chatId = event.currentTarget.dataset.chatid;
            var data = { id: chatId };
            fetch(config_1.APIUrl + "/Chat/EndMessageBoxForUser", {
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
                    if (responseModel.messageCode === 0) {
                        _this.setState({ value: 1 });
                    }
                    _this.props.UserLoad(false);
                })["catch"](function(error) {
                    console.log(error);
                    _this.props.UserLoad(false);
                });
            _this.setState({
                message: { chatText: event.currentTarget.value, chatId: "" }
            });
        };
        _this.state = {
            value: 0,
            subjects: [],
            subjectId: "",
            Send: true,
            Error: false,
            messageboxes: [],
            messageboxdetails: { messageBox: undefined, messageBoxDetail: [] },
            alertUpload: false,
            message: { chatId: "", chatText: "" },
            SendAttach: true
        };
        _this.stepInput = react_1["default"].createRef();
        _this.props.UserLoad(false);
        return _this;
    }
    UserMessages.prototype.componentDidMount = function() {
        return __awaiter(this, void 0, void 0, function() {
            var data;
            var _this = this;
            return __generator(this, function(_a) {
                this.props.UserLoad(true);
                data = {};
                fetch(config_1.APIUrl + "/Chat/GetMessageBoxByUserId", {
                        method: "POST",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.props.token
                        },
                        body: JSON.stringify(data)
                    })
                    .then(function(response) {
                        _this.props.checkStatus(response);
                        return response;
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        if (responseModel.messageCode !== 0)
                            return;
                        if (responseModel.data && responseModel.data.length > 0) {
                            _this.setState({
                                messageboxes: responseModel.data,
                                Send: false,
                                value: 1
                            });
                        } else {
                            _this.setState({
                                messageboxes: responseModel.data,
                                Send: false,
                                value: 3
                            });
                        }
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                fetch(config_1.APIUrl + "/HCChatTitle/GetHCListForUser?lang=" + this.props.lang.abr, {
                        method: "GET",
                        headers: {
                            'ut': '1',
                            "Content-Type": "application/json"
                        }
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(responseModel) {
                        _this.setState({ subjects: responseModel.data, Send: false });
                        _this.props.UserLoad(false);
                    })["catch"](function(error) {
                        console.log(error);
                        _this.props.UserLoad(false);
                    });
                return [2 /*return*/ ];
            });
        });
    };
    UserMessages.prototype.render = function() {
        var _this = this;
        var View1 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-7" },
                    react_1["default"].createElement("div", { className: "MessageBox" },
                        react_1["default"].createElement("div", { className: "col-12" },
                            react_1["default"].createElement("p", { className: "MessageBoxTitr" }, "\u067E\u06CC\u0627\u0645 \u0647\u0627\u06CC \u0645\u0646")),
                        react_1["default"].createElement("div", { className: "MessageBoxTable" },
                            react_1["default"].createElement("table", { className: "MessageBoxINTable table-bordered table-responsive table-hover" },
                                react_1["default"].createElement("thead", null,
                                    react_1["default"].createElement("tr", { key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("th", null, "#"),
                                        react_1["default"].createElement("th", null, "\u0634\u0646\u0627\u0633\u0647 \u067E\u06CC\u0627\u0645"),
                                        react_1["default"].createElement("th", null, "\u0639\u0646\u0648\u0627\u0646 \u067E\u06CC\u0627\u0645"),
                                        react_1["default"].createElement("th", null, "\u062A\u0627\u0631\u06CC\u062E \u0627\u0631\u0633\u0627\u0644"),
                                        react_1["default"].createElement("th", null, "\u0648\u0636\u0639\u06CC\u062A"),
                                        react_1["default"].createElement("th", null, "\u062C\u0632\u0626\u06CC\u0627\u062A"))),
                                react_1["default"].createElement("tbody", null, this.state.messageboxes.map(function(item, index) {
                                    return (react_1["default"].createElement("tr", { key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("td", null, item.rowNumber),
                                        react_1["default"].createElement("td", null, item.code),
                                        react_1["default"].createElement("td", null, item.chatTitle),
                                        react_1["default"].createElement("td", null, item.sendDate),
                                        react_1["default"].createElement("td", null, item.chatStatus),
                                        react_1["default"].createElement("td", null,
                                            react_1["default"].createElement("span", { "data-chatid": item.id, onClick: _this.HandleMessageBoxDetail, className: "MessageDetailIcon" }))));
                                })))),
                        react_1["default"].createElement("div", { className: "MessageBoxSendCentered" },
                            react_1["default"].createElement("div", { className: "col-12" },
                                react_1["default"].createElement("button", { className: "btn MessageBoxSendButton", onClick: this.HandleShowSend },
                                    " ",
                                    "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645"))))),
                react_1["default"].createElement("div", { className: "col-lg-5" },
                    react_1["default"].createElement("div", { className: "MessageBoxImage" },
                        react_1["default"].createElement("img", { src: require("../../img/235.png"), className: "img-fluid", srcSet: "/static/media/235@2x.png 2x, /static/media/235@3x.png 3x", alt: "Message Box" }))))));
        var View2 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-7" },
                    react_1["default"].createElement("div", { className: "SendMessageBox" },
                        react_1["default"].createElement("div", { className: "col-lg-12" },
                            react_1["default"].createElement("p", { className: "SendMessageBoxTitr" },
                                "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645",
                                react_1["default"].createElement("img", { src: require("../../img/539227.png"), className: "img-fluid", srcSet: "/static/media/539227@2x.png 2x", alt: "Message Box" }))),
                        react_1["default"].createElement("div", { className: "col-lg-12" },
                            react_1["default"].createElement("div", { className: "section-header-Msg msg-color" },
                                react_1["default"].createElement("i", { className: "fa fa-arrow-right", onClick: this.gotoMessages }),
                                react_1["default"].createElement("span", { onClick: this.gotoMessages }, "\u067E\u06CC\u0627\u0645 \u0647\u0627\u06CC \u0645\u0646"))),
                        react_1["default"].createElement("div", { className: "col-lg-12" },
                            react_1["default"].createElement("div", { className: "form-group" },
                                react_1["default"].createElement(react_select_1["default"], { className: "ddProvinces SendMessageBoxSubject", required: true, onChange: this.handleSubject, placeholder: "دسته بندی موضوعات", value: this.state.subjects.filter(function(option) { return option.value === _this.state.subjectId; }), options: this.state.subjects }))),
                        react_1["default"].createElement("div", { className: "form-group w-100" },
                            react_1["default"].createElement("div", { className: "plfield " },
                                react_1["default"].createElement("textarea", { value: this.state.text, onChange: this.handleText, placeholder: "\u0645\u062A\u0646 \u067E\u06CC\u0627\u0645", rows: 5, title: "", required: true, className: "form-control MessageBoxText" }))),
                        react_1["default"].createElement("div", { className: "row" },
                            react_1["default"].createElement("div", { className: "col-lg-7" }, this.state.Error === true ? (react_1["default"].createElement("span", { className: "MessageBoxError" }, ".\u067E\u0631 \u06A9\u0631\u062F\u0646 \u0627\u06CC\u0646 \u0642\u0633\u0645\u062A\u0647\u0627 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A")) : null),
                            react_1["default"].createElement("div", { className: "col-lg-5" },
                                react_1["default"].createElement("button", { className: "btn MessageBoxSendButtonGray", onClick: this.handleSend, disabled: this.state.Send },
                                    " ",
                                    "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645"))))),
                react_1["default"].createElement("div", { className: "col-lg-5" },
                    react_1["default"].createElement("div", { className: "SendMessageBoxImage" },
                        react_1["default"].createElement("img", { src: require("../../img/236.png"), className: "img-fluid", srcSet: "/static/media/236@2x.png 2x, /static/media/236@3x.png 3x", alt: "Message Box" }))))));
        var View3 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-7" },
                    react_1["default"].createElement("div", { className: "MessageBoxResult" },
                        react_1["default"].createElement("div", { className: "col-12" },
                            react_1["default"].createElement("p", { className: "MessageBoxTitr" }, "\u067E\u06CC\u0627\u0645 \u0647\u0627\u06CC \u0645\u0646"),
                            react_1["default"].createElement("div", { className: "MessageResultIcon" }),
                            react_1["default"].createElement("p", { className: "MessageResult" }, "!\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F")),
                        react_1["default"].createElement("div", { className: "MessageBoxSendCentered" },
                            react_1["default"].createElement("div", { className: "col-12" },
                                react_1["default"].createElement("button", { className: "btn MessageBoxSendButton", onClick: this.HandleShowSend },
                                    " ",
                                    "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645"))))),
                react_1["default"].createElement("div", { className: "col-lg-5" },
                    react_1["default"].createElement("div", { className: "SendMessageBoxImage" },
                        react_1["default"].createElement("img", { src: require("../../img/236.png"), className: "img-fluid", srcSet: "/static/media/236@2x.png 2x, /static/media/236@3x.png 3x", alt: "Message Box" }))))));
        var View4 = (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-7" },
                    react_1["default"].createElement("div", { className: "MessageBox" },
                        react_1["default"].createElement("div", { className: "col-12" },
                            react_1["default"].createElement("p", { className: "MessageBoxTitr" }, "\u067E\u06CC\u0627\u0645 \u0647\u0627\u06CC \u0645\u0646")),
                        react_1["default"].createElement("div", { className: "section-header-Msg msg-color" },
                            react_1["default"].createElement("i", { className: "fa fa-arrow-right", onClick: this.gotoMessages }),
                            react_1["default"].createElement("span", { onClick: this.gotoMessages }, "\u067E\u06CC\u0627\u0645 \u0647\u0627\u06CC \u0645\u0646")),
                        react_1["default"].createElement("div", { className: "MessageTable" },
                            react_1["default"].createElement("div", { className: "row" }, this.state.messageboxdetails !== undefined &&
                                this.state.messageboxdetails !== null &&
                                this.state.messageboxdetails.messageBox !== undefined &&
                                this.state.messageboxdetails.messageBox !== null ? (react_1["default"].createElement("div", { className: "MessaageHeader row" },
                                    react_1["default"].createElement("span", { className: "col-lg-4 col-md-4  col-sm-4 " },
                                        "\u0634\u0646\u0627\u0633\u0647 \u067E\u06CC\u0627\u0645",
                                        " ",
                                        react_1["default"].createElement("b", null, this.state.messageboxdetails.messageBox
                                            .code)),
                                    react_1["default"].createElement("span", { className: "col-lg-4 col-md-4  col-sm-4" },
                                        "\u0645\u0648\u0636\u0648\u0639 \u067E\u06CC\u0627\u0645 :",
                                        " ",
                                        react_1["default"].createElement("b", null, this.state.messageboxdetails.messageBox
                                            .chatTitle)),
                                    react_1["default"].createElement("span", { className: "col-lg-4 col-md-4  col-sm-4" },
                                        "\u062A\u0627\u0631\u06CC\u062E \u0627\u0631\u0633\u0627\u0644 :",
                                        " ",
                                        react_1["default"].createElement("b", null, this.state.messageboxdetails.messageBox
                                            .sendDate)))) : (react_1["default"].createElement("div", { className: "MessaageHeader" },
                                    react_1["default"].createElement("span", null, "\u0634\u0646\u0627\u0633\u0647 \u067E\u06CC\u0627\u0645 "),
                                    react_1["default"].createElement("span", null, "\u0645\u0648\u0636\u0648\u0639 \u067E\u06CC\u0627\u0645 : "),
                                    react_1["default"].createElement("span", null, "\u062A\u0627\u0631\u06CC\u062E \u0627\u0631\u0633\u0627\u0644 : ")))),
                            this.state.messageboxdetails.messageBoxDetail !== undefined &&
                            this.state.messageboxdetails.messageBoxDetail.map(function(item) {
                                return (react_1["default"].createElement("div", null, item.isUser ? (react_1["default"].createElement("div", { className: "row" },
                                    react_1["default"].createElement("div", { className: "col-lg-1 col-md-2 col-sm-2", key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("div", { className: "UserIcon", key: Math.floor(Math.random() * 800000) })),
                                    react_1["default"].createElement("div", { className: "col-lg-11 col-md-10 col-sm-10", key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("div", { className: "UserMessage", key: Math.floor(Math.random() * 800000) },
                                            react_1["default"].createElement("p", null, item.sendDate),
                                            item.chatText,
                                            react_1["default"].createElement("p", null, item.fileText !== null &&
                                                item.fileText !== undefined &&
                                                item.fileText.trim() !== "" &&
                                                item.fileText.split("*") !== null &&
                                                item.fileText.indexOf("*") > -1 ?
                                                item.fileText
                                                .split("*")
                                                .map(function(item2) {
                                                    return (react_1["default"].createElement("span", null, item2 !== "" &&
                                                        item2 !== undefined ? (react_1["default"].createElement("a", { className: "MessageBoxFiles", target: "_blank" }, item2)) : null));
                                                }) :
                                                null))))) : (react_1["default"].createElement("div", { className: "row" },
                                    react_1["default"].createElement("div", { className: "col-lg-11  col-md-10 col-sm-10", key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("div", { className: "ExpertMessage", key: Math.floor(Math.random() * 800000) },
                                            react_1["default"].createElement("p", null, item.expertInfo),
                                            item.chatText)),
                                    react_1["default"].createElement("div", { className: "col-lg-1  col-md-2 col-sm-2", key: Math.floor(Math.random() * 800000) },
                                        react_1["default"].createElement("div", { className: "ExpertIcon", key: Math.floor(Math.random() * 800000) },
                                            react_1["default"].createElement("img", { src: require("../../img/Ellipse 8.png"), className: "img-fluid" })))))));
                            }),
                            this.state.messageboxdetails !== undefined &&
                            this.state.messageboxdetails !== null &&
                            this.state.messageboxdetails.messageBox !== undefined &&
                            this.state.messageboxdetails.messageBox !== null &&
                            this.state.messageboxdetails.messageBox.endChat !== true ? (react_1["default"].createElement("div", { className: "row" },
                                react_1["default"].createElement("div", { className: "col-lg-12  col-md-12 col-sm-12" },
                                    react_1["default"].createElement("div", { className: "EndMessage", onClick: this.handleEndMessage, key: Math.floor(Math.random() * 800000), "data-chatid": this.state.messageboxdetails.messageBox.id }, "\u067E\u0627\u06CC\u0627\u0646 \u06AF\u0641\u062A\u06AF\u0648")),
                                react_1["default"].createElement("div", { className: "col-lg-12  col-md-12 col-sm-12" },
                                    react_1["default"].createElement("input", { ref: this.stepInput, className: "uploader", onChange: this.handleFileChange, type: "file", multiple: true, "data-chatid": this.state.messageboxdetails.messageBox.id })))) : null,
                            react_1["default"].createElement("div", { className: "row" }, this.state.messageboxdetails !== undefined &&
                                this.state.messageboxdetails !== null &&
                                this.state.messageboxdetails.messageBox !== undefined &&
                                this.state.messageboxdetails.messageBox !== null &&
                                this.state.messageboxdetails.messageBox.endChat !== true ? (react_1["default"].createElement("div", { className: "col-md-12" },
                                    react_1["default"].createElement("div", { className: "form-group" },
                                        react_1["default"].createElement("div", { className: "plfield " },
                                            react_1["default"].createElement("input", { type: "text", onChange: this.handleChangeMessage, value: this.state.message.chatText, placeholder: "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", required: true, className: "form-control MessageBoxAttach" }))),
                                    react_1["default"].createElement("div", { className: "MessageBoxIcons" },
                                        this.state.alertUpload ? (react_1["default"].createElement("p", { className: "MessageBoxAlert" }, "\u0645\u062C\u0627\u0632 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0641\u0627\u06CC\u0644 \u0628\u0627 \u0641\u0631\u0645\u062A \u0628\u0627 \u062D\u062C\u0645 \u062D\u062F\u0627\u06A9\u062B\u0631 100 \u06A9\u06CC\u0644\u0648\u0628\u0627\u06CC\u062A \u0647\u0633\u062A\u06CC\u062F")) : null,
                                        react_1["default"].createElement("button", { className: "MessageBoxAttachIcon", disabled: this.state.SendAttach, onClick: this.handleUploadClick }),
                                        this.state.messageboxdetails !== undefined &&
                                        this.state.messageboxdetails !== null &&
                                        this.state.messageboxdetails.messageBox !== undefined &&
                                        this.state.messageboxdetails.messageBox !== null ? (react_1["default"].createElement("button", {
                                            disabled: this.state.SendAttach,
                                            className: "MessageBoxAttachIcon",
                                            onClick: this.handleSendMessage,
                                            "data-chatid": this.state.messageboxdetails
                                                .messageBox.id
                                        })) : null))) : (react_1["default"].createElement("p", { className: "EmdTextMessage" },
                                    ".\u0627\u06CC\u0646 \u06AF\u0641\u062A\u06AF\u0648 \u062F\u0631 \u062A\u0627\u0631\u06CC\u062E",
                                    " ",
                                    this.state.messageboxdetails.messageBox !== undefined &&
                                    this.state.messageboxdetails.messageBox.endChatDate !==
                                    undefined &&
                                    this.state.messageboxdetails.messageBox.endChatDate !==
                                    null ?
                                    this.state.messageboxdetails.messageBox.endChatDate :
                                    "",
                                    " ",
                                    "\u062A\u0648\u0633\u0637 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u062A\u0648\u0686\u0627\u0631 \u0628\u0633\u062A\u0647 \u0634\u062F")))))),
                react_1["default"].createElement("div", { className: "col-lg-5" },
                    react_1["default"].createElement("div", { className: "MessageBoxImage" },
                        react_1["default"].createElement("img", { src: require("../../img/235.png"), className: "img-fluid", srcSet: "/static/media/235@2x.png 2x, /static/media/235@3x.png 3x", alt: "Message Box" }))))));
        return (react_1["default"].createElement("div", null, this.state.value === 1 ?
            View1 :
            this.state.value === 2 ?
            View2 :
            this.state.value === 3 ?
            View3 :
            this.state.value === 4 ?
            View4 :
            null));
    };
    return UserMessages;
}(react_1.Component));
exports["default"] = react_redux_1.connect(function(state) { return state.userinfo; }, UserInfo.actionCreators)(UserMessages);