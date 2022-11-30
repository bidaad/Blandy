"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.UserInfoCard = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var UserInfoStore = require("../store/UserInfo");
var MsgBox_1 = require("./MsgBox");
var general_1 = require("../model/general");
var UserHeader_1 = require("./UserHeader");
var UserNavMenu_1 = require("./UserNavMenu");
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
var react_bootstrap_1 = require("react-bootstrap");
var WebFooter_1 = require("../components/user/WebFooter");
var SendMessage_1 = require("./user/SendMessage");
var ProductCategory_1 = require("./user/ProductCategory");
var Chat_1 = require("../containers/User/Chat");
var UserLogin_1 = require("../containers/User/UserLogin");
var SellerHeader_1 = require("./SellerHeader");
var SellerMenu_1 = require("../containers/User/SellerMenu");
// function DoLogout() {
//     let history = useHistory();
//     history.push("/");
//     return (
//         <div>
//         </div>
//     );
// }
var GotoInvite = function () {
    return (react_1["default"].createElement(reactstrap_1.NavLink, { tag: react_bootstrap_1.Button, className: "btn-orange btn w-25 w-100 mt-30", to: "/user/invite" }, "\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"));
};
var UserInfoCard = /** @class */ (function (_super) {
    __extends(UserInfoCard, _super);
    function UserInfoCard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showLogout: false
        };
        return _this;
    }
    UserInfoCard.prototype.render = function () {
        return (react_1["default"].createElement("div", { className: "user-info-card" },
            react_1["default"].createElement("div", { className: "user-info-card-body" },
                react_1["default"].createElement("i", { className: "fa fa-user-circle gray" }),
                react_1["default"].createElement("div", null, this.props.mobile),
                react_1["default"].createElement("div", { className: "line inner-center" }),
                react_1["default"].createElement("div", null,
                    this.props.firstName,
                    " ",
                    this.props.lastName)),
            react_1["default"].createElement("div", { className: "change-pass" },
                react_1["default"].createElement(reactstrap_1.NavLink, { tag: react_router_dom_1.Link, className: "changepass", to: "/user/changepass" }, "\u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0644\u0645\u0647 \u0639\u0628\u0648\u0631"))));
    };
    return UserInfoCard;
}(react_1.Component));
exports.UserInfoCard = UserInfoCard;
// class UserLayout extends React.PureComponent<UserLayoutProps, { children?: React.ReactNode, showLogout: boolean }> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             showLogout: false
//         }
//     }
//     logoutClickHandler = () => {
//         this.props.logoutUser();
//         this.setState({ showLogout: true })
//     }
var UserLayout = function (props) {
    var _a = react_1.useState(false), showLogout = _a[0], setshowLogout = _a[1];
    var logoutClickHandler = function () {
        
        props.logoutUser('/userlogin');
        history.push("/");
        //setshowLogout(true);
    };
    react_1.useEffect(function () {
        props.hideLogin();
    }, []);
    var history = react_router_1.useHistory();
    if (props.dir === general_1.Directions.RTL) {
        return (react_1["default"].createElement("div", { className: "" },
            props.showContactUs === true ? react_1["default"].createElement(SendMessage_1["default"], null) : null,
            props.showLoginBox === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                react_1["default"].createElement(UserLogin_1["default"], __assign({}, { noRedirect: false })))) : null,
            props.showChatBox === true ? react_1["default"].createElement(Chat_1["default"], __assign({}, { joinUserId: null })) : null,
            props.typeLayout === general_1.LayoutTypes.Product ? (react_1["default"].createElement("div", null,
                react_1["default"].createElement(UserHeader_1["default"], __assign({}, { ClickHandler: logoutClickHandler, userToken: props.token })),
                react_1["default"].createElement(ProductCategory_1["default"], __assign({}, { controller: "Category", action: "AllCategory" })),
                props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                    react_1["default"].createElement("div", { className: "userloadercontent" },
                        react_1["default"].createElement("div", { className: "userloader" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
                props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontentSeller" },
                    react_1["default"].createElement("div", { className: "userloadercontentSeller" },
                        react_1["default"].createElement("div", { className: "userloaderseller" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoadSeller" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null,
                react_1["default"].createElement("div", { className: "container" },
                    react_1["default"].createElement("div", { className: "user-panel-container" },
                        react_1["default"].createElement("div", { className: "row min-vh-100 flex-column flex-md-row" },
                            react_1["default"].createElement("div", { className: "container Rtl" },
                                react_1["default"].createElement(MsgBox_1["default"], null),
                                props.children)))),
                react_1["default"].createElement(WebFooter_1["default"], null))) : props.typeLayout === general_1.LayoutTypes.User ? (react_1["default"].createElement("div", null,
                react_1["default"].createElement(UserHeader_1["default"], __assign({}, { ClickHandler: logoutClickHandler, userToken: props.token })),
                react_1["default"].createElement(ProductCategory_1["default"], __assign({}, { controller: "Category", action: "AllCategory" })),
                props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                    react_1["default"].createElement("div", { className: "userloadercontent" },
                        react_1["default"].createElement("div", { className: "userloader" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
                props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontentSeller" },
                    react_1["default"].createElement("div", { className: "userloadercontentSeller" },
                        react_1["default"].createElement("div", { className: "userloaderseller" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoadSeller" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null,
                react_1["default"].createElement("div", { className: "container" },
                    react_1["default"].createElement("div", { className: "user-panel-container" },
                        react_1["default"].createElement("div", { className: "row min-vh-100 flex-column flex-md-row" },
                            react_1["default"].createElement("main", { className: "col-lg-10 col-md-6 bg-faded " },
                                react_1["default"].createElement("div", { className: "M-container" },
                                    react_1["default"].createElement(MsgBox_1["default"], null),
                                    props.children)),
                            react_1["default"].createElement("aside", { className: "d-none d-sm-block col-lg-2 col-md-6 col-xs-12 flex-shrink-1 user-side-menu " },
                                react_1["default"].createElement(UserInfoCard, { firstName: props.firstName, lastName: props.lastName, mobile: props.mobile }),
                                react_1["default"].createElement(UserNavMenu_1["default"], null),
                                react_1["default"].createElement(GotoInvite, null))))),
                react_1["default"].createElement(WebFooter_1["default"], null))) : props.typeLayout === general_1.LayoutTypes.Main ? (react_1["default"].createElement("div", null,
                react_1["default"].createElement(UserHeader_1["default"], __assign({}, { ClickHandler: logoutClickHandler, userToken: props.token })),
                react_1["default"].createElement(ProductCategory_1["default"], __assign({}, { controller: "Category", action: "AllCategory" })),
                props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                    react_1["default"].createElement("div", { className: "userloadercontent" },
                        react_1["default"].createElement("div", { className: "userloader" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
                props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontentSeller" },
                    react_1["default"].createElement("div", { className: "userloadercontentSeller" },
                        react_1["default"].createElement("div", { className: "userloaderseller" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoadSeller" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null,
                react_1["default"].createElement("div", { className: "container" },
                    react_1["default"].createElement("div", { className: "user-panel-container" },
                        react_1["default"].createElement("div", { className: " min-vh-100 flex-column flex-md-row" },
                            react_1["default"].createElement("main", { className: " bg-faded " },
                                react_1["default"].createElement("div", { className: "M-container" },
                                    react_1["default"].createElement(MsgBox_1["default"], null),
                                    props.children))))),
                react_1["default"].createElement(WebFooter_1["default"], null))) : props.typeLayout === general_1.LayoutTypes.Seller ? (react_1["default"].createElement("div", null,
                react_1["default"].createElement(SellerHeader_1["default"], __assign({}, { ClickHandler: logoutClickHandler, userToken: props.token })),
                props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                    react_1["default"].createElement("div", { className: "userloadercontent" },
                        react_1["default"].createElement("div", { className: "userloader" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
                props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontentSeller" },
                    react_1["default"].createElement("div", { className: "userloadercontentSeller" },
                        react_1["default"].createElement("div", { className: "userloaderseller" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoadSeller" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null,
                react_1["default"].createElement("div", { className: "container" },
                    react_1["default"].createElement("div", { className: "seller-panel-container" },
                        react_1["default"].createElement("div", { className: "row" },
                            react_1["default"].createElement("main", { className: "col-lg-10 col-md-10 col-xs-6 bg-faded " },
                                react_1["default"].createElement("div", { className: "M-container" },
                                    react_1["default"].createElement(MsgBox_1["default"], null),
                                    props.children)),
                            react_1["default"].createElement("div", { className: "col-lg-2 col-md-2 col-xs-6" },
                                react_1["default"].createElement(SellerMenu_1["default"], null))))),
                react_1["default"].createElement(WebFooter_1["default"], null))) : null));
    }
    else {
        return (react_1["default"].createElement("div", { className: "" },
            props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                react_1["default"].createElement("div", { className: "userloadercontent" },
                    react_1["default"].createElement("div", { className: "userloader" }),
                    react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
            react_1["default"].createElement("div", null, props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                react_1["default"].createElement("div", { className: "userloadercontent" },
                    react_1["default"].createElement("div", { className: "userloader" }),
                    react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null),
            react_1["default"].createElement(UserHeader_1["default"], __assign({}, { ClickHandler: logoutClickHandler, userToken: props.token })),
            react_1["default"].createElement(ProductCategory_1["default"], __assign({}, { controller: "Category", action: "AllCategory" })),
            props.typeLayout === general_1.LayoutTypes.Product ? (react_1["default"].createElement("div", { className: "user-panel-container" },
                react_1["default"].createElement("div", { className: "row min-vh-100 flex-column flex-md-row" },
                    react_1["default"].createElement("main", { className: "col bg-faded  flex-grow-1  T-container-fluid" },
                        react_1["default"].createElement("div", { className: "M-container" },
                            react_1["default"].createElement(MsgBox_1["default"], null),
                            props.children))))) : props.typeLayout === general_1.LayoutTypes.User ? (react_1["default"].createElement("div", { className: "user-panel-container" },
                props.UserLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontent" },
                    react_1["default"].createElement("div", { className: "userloadercontent" },
                        react_1["default"].createElement("div", { className: "userloader" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoad" }, "\u0627\u062A\u0648\u0686\u0640\u0640\u0640\u0640\u0640\u0627\u0631")))) : null,
                props.SellerLoading === true ? (react_1["default"].createElement("div", { className: "overlayuserloadercontentSeller" },
                    react_1["default"].createElement("div", { className: "userloadercontentSeller" },
                        react_1["default"].createElement("div", { className: "userloaderseller" }),
                        react_1["default"].createElement("span", { className: "AutoCharTextLoadSeller" }, "\u0645\u0631\u06A9\u0632 \u0641\u0631\u0648\u0634\u0646\u062F\u06AF\u0627\u0646 \u0627\u062A\u0648\u0686\u0627\u0631")))) : null,
                react_1["default"].createElement("div", { className: "row min-vh-100 flex-column flex-md-row" },
                    react_1["default"].createElement("aside", { className: "col-12 col-md-2 p-0 flex-shrink-1 T-menu" },
                        react_1["default"].createElement(UserNavMenu_1["default"], null)),
                    react_1["default"].createElement("main", { className: "col bg-faded flex-grow-1  T-container-fluid" },
                        react_1["default"].createElement("div", { className: "M-container" },
                            react_1["default"].createElement(MsgBox_1["default"], null),
                            props.children))))) : null));
    }
};
exports["default"] = react_redux_1.connect(function (state) { return state.userinfo; }, UserInfoStore.actionCreators)(UserLayout);
