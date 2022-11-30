"use strict";
var __assign = (this && this.__assign) || function() {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var config_1 = require("../../helper/config");
var UserInfo = require("../../store/UserInfo");
var react_redux_1 = require("react-redux");
var Image_1 = require("../../components/Image");
var react_datepicker2_1 = require("react-datepicker2");
var changeEnc_1 = require("../../helper/changeEnc");
var react_bootstrap_1 = require("react-bootstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var general_1 = require("../../model/general");
var formatCurrency_1 = require("../../helper/formatCurrency");
var JobCardItem = function(props) {
    var _a = react_1.useState(""),
        ErrorUsage = _a[0],
        setErrorUsage = _a[1];
    var _b = react_1.useState("0"),
        Usage = _b[0],
        setUsage = _b[1];
    var momentjl = require("moment-jalaali");
    var _c = react_1.useState(momentjl()),
        SelectedDate = _c[0],
        setSelectedDate = _c[1];
    var _d = react_1.useState(true),
        ShowSave = _d[0],
        setShowSave = _d[1];
    var _e = react_1.useState(0),
        DefaultUsage = _e[0],
        setDefaultUsage = _e[1];
    var checkUsage = function() {
        if (!ValidateUsage(Usage)) {
            setErrorUsage("border-red");
            return;
        } else
            setErrorUsage("");
    };
    var handleUsage = function(event) {
        setUsage(event.target.value);
    };

    function handleDateChange(event) {
        // let dt = event.format("YYYY/M/D hh:mm:ss A");
        // dt = dt.replace("ق.ظ", "AM");
        // dt = dt.replace("ب.ظ", "PM");
        setSelectedDate(event);
    }
    var saveJobCard = function() {
        var data = [];
        for (var i = 0; i < props.jobCardInfo.length; i++) {
            var element = props.jobCardInfo[i];
            var curData = {
                workOrderId: props.jobCardInfo[i].workOrderId,
                assetId: props.jobCardInfo[i].assetId,
                jobCardId: props.jobCardInfo[i].jobCardId,
                ActualFinish: SelectedDate,
                value: parseInt(Usage, 10)
            };
            data.push(curData);
        }
        fetch(config_1.APIUrl + "/WorkOrder/SaveJobCard", {
                method: "POST",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                body: JSON.stringify(data)
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    setUsage("0");
                    setSelectedDate(undefined);
                    props.AlertMessage(responseModel.message, general_1.MessageTypes.Success);
                    props.JobcardItemLoad(true);
                    setTimeout(function() {
                        props.RefreshJobCards();
                        // window.location.reload();
                    }, 1000);
                    // props.RefreshJobCards();
                    // if (props.showSwitch)
                    //   setShowSave(false);
                    // else
                    //   props.hideModal();
                } else {
                    props.AlertMessage(responseModel.message, general_1.MessageTypes.Error);
                    props.JobcardItemLoad(false);
                }
            })["catch"](function(error) {
                props.JobcardItemLoad(false);
                console.log("error");
                console.log(error);
            });
    };
    var ValidateUsage = function(text) {
        if (/^\d+$/.test(text)) {
            return true;
        }
        return false;
    };
    var handleJobCardCheck = function(event) {
        console.log(props.jobCardInfo[0]);
        var data = {
            workOrderId: props.jobCardInfo[0].workOrderId,
            assetId: props.jobCardInfo[0].assetId,
            jobCardId: props.jobCardInfo[0].jobCardId,
            ActualFinish: SelectedDate,
            value: Usage
        };
        fetch(config_1.APIUrl + "/WorkOrder/RejectJobCard", {
                method: "POST",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                body: JSON.stringify(data)
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    console.log("call refresh");
                    props.RefreshJobCards();
                }
            })["catch"](function(error) {
                console.log("error");
                console.log(error);
            });
    };
    var enabledRange = {
        min: momentjl().add(-36000, "days"),
        max: momentjl().add(0, "days")
    };
    return (react_1["default"].createElement("div", { className: "jobcard-title" },
        props.jobCardInfo.length === 1 ?
        props.jobCardInfo.map(function(item) {
            return (react_1["default"].createElement("a", { key: item.workOrderId, href: "#", title: item.jobCardSign },
                item.jobCardSign,
                ",\u00A0"));
        }) :
        "",
        props.jobCardInfo[0].priorityCode !== "Urgent" && props.showSwitch ? (react_1["default"].createElement("div", { className: "toggle-container" },
            react_1["default"].createElement("label", { className: "Toggle_Switch" },
                react_1["default"].createElement("input", {
                    type: "checkbox",
                    onChange: handleJobCardCheck,
                    // disabled={
                    //   props.jobCardInfo[0].priorityCode === "Urgent" ? true : false
                    // }
                    defaultChecked: true
                }),
                react_1["default"].createElement("span", { className: "Toggle_Slider round" })))) : null,
        react_1["default"].createElement("div", { className: "jobcard-form" },
            react_1["default"].createElement("div", { className: " form-group mt-3" },
                react_1["default"].createElement("div", { className: "plfield " },
                    react_1["default"].createElement("input", {
                        type: "text",
                        placeholder: " ",
                        autoComplete: "off",
                        title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062E\u0648\u062F\u0631\u0648  \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
                        required: true,
                        onChange: function(e) { return handleUsage(e); },
                        onBlur: function() { return checkUsage(); },
                        value: Usage,
                        // defaultValue={DefaultUsage}
                        className: "form-control ltr-control txt-mobile " +
                            (ErrorUsage === "" ? "pl-input" : "pl-input-error"),
                        id: "username"
                    }),
                    react_1["default"].createElement("span", { className: "grow" }, "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062E\u0648\u062F\u0631\u0648 "),
                    react_1["default"].createElement("i", { className: "icon-tachometer fa fa-tachometer" }))),
            react_1["default"].createElement("div", { className: " form-group mt-3" },
                react_1["default"].createElement("div", { className: "plfield " },
                    react_1["default"].createElement(react_datepicker2_1["default"], __assign({ isGregorian: false, calendarClass: "calendar-picker", timePicker: false, min: enabledRange.min, max: enabledRange.max }, { placeholder: "تاریخ آخرین ", value: SelectedDate }, { className: "form-control", onChange: handleDateChange })))),
            react_1["default"].createElement("div", null, ShowSave ? (react_1["default"].createElement("button", { className: "btn-save-jobcard btn ", onClick: saveJobCard }, "\u0630\u062E\u06CC\u0631\u0647")) : (react_1["default"].createElement("button", { className: "btn-edit-jobcard btn ", onClick: function() { return setShowSave(true); } }, "\u0648\u06CC\u0631\u0627\u06CC\u0634"))))));
};
var ValidateUsage = function(text) {
    if (/^\d+$/.test(text)) {
        return true;
    }
    return false;
};
var CheckboxItem = function(props) {
    var _a = react_1.useState(false),
        Checked = _a[0],
        setChecked = _a[1];
    react_1.useEffect(function() {
        //alert(props.checked)
        setChecked(props.checked);
    }, [props.checked, props.jobCard]);
    var handleCheckbox = function(e) {
        setChecked(e.target.checked);
        if (e.target.checked) {
            props.addToWorkOrderList(props.jobCard);
        } else
            props.removeFromWorkOrderList(props.jobCard);
    };
    return (react_1["default"].createElement("input", { type: "checkbox", defaultChecked: false, checked: Checked, onChange: function(e) { return handleCheckbox(e); } }));
};
var CarMaintenance = function(props) {
    var _a = react_1.useState([]),
        carList = _a[0],
        setCarList = _a[1];
    var _b = react_1.useState([]),
        JobCards = _b[0],
        setJobCards = _b[1];
    var _c = react_1.useState(undefined),
        CurrentJobCard = _c[0],
        setCurrentJobCard = _c[1];
    var _d = react_1.useState([]),
        WorkOrderList = _d[0],
        setWorkOrderList = _d[1];
    var _e = react_1.useState(""),
        Usage = _e[0],
        setUsage = _e[1];
    var _f = react_1.useState(""),
        ErrorUsage = _f[0],
        setErrorUsage = _f[1];
    var _g = react_1.useState(false),
        Refresh = _g[0],
        setRefresh = _g[1];
    var _h = react_1.useState(false),
        AllChecked = _h[0],
        setAllChecked = _h[1];
    var _j = react_1.useState(0),
        View = _j[0],
        setView = _j[1];
    var _k = react_1.useState(false),
        UsageSaved = _k[0],
        setUsageSaved = _k[1];
    var _l = react_1.useState(false),
        EditUsage = _l[0],
        setEditUsage = _l[1];
    var _m = react_1.useState(false),
        showModal = _m[0],
        setshowModal = _m[1];
    var _o = react_1.useState(false),
        ShowMultipleModal = _o[0],
        setShowMultipleModal = _o[1];
    var strLocation = props.location.pathname;
    var n = strLocation.search(/maintenance/);
    var carId = strLocation.substring(n + 12, n + 12 + 36);
    var curDate = new Date().toLocaleDateString("fa-IR");
    var gotoCar = function(id) {
        if (id === carId)
            return;
        var history = props.history;
        history.push("/user/maintenance/" + id);
        setRefresh(!Refresh);
    };
    var gotoCarServices = function() {
        var history = props.history;
        history.push({
            pathname: "/user/cars/"
        });
    };
    var getJobCards = function(id) {
        console.log("getJobCards" + id);
        fetch(config_1.APIUrl + "/JobCard/GetJobCardsByAssetId?assetId=" + id, {
                method: "GET",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json"
                }
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    if (props.showCard === true) {
                        setView(3);
                    } else {
                        setView(2);
                    }
                    setJobCards(responseModel.data);
                }
                if (responseModel.messageCode === 5) {
                    setView(1);
                    setJobCards(responseModel.data);
                }
                props.UserLoad(false);
            })["catch"](function(error) {
                console.log(error);
                props.UserLoad(false);
            });
    };
    var RefreshJobCards = function() {
        setAllChecked(false);
        setWorkOrderList([]);
        getJobCards(carId);
        setRefresh(!Refresh);
        hideModal();
    };
    var hideModal = function() {
        setshowModal(false);
        setShowMultipleModal(false);
    };
    var saveUsage = function(carId, update) {
        props.UserLoad(true);
        var Url = config_1.APIUrl +
            "/AssetUsage/SaveUsage?Id=" +
            carId +
            "&Usage=" +
            Usage +
            "&Update=" +
            update;
        // if (EditUsage)
        //   Url =
        //     APIUrl +
        //     "/AssetUsage/UpdateLatestUsage?Id=" +
        //     carId +
        //     "&Usage=" +
        //     Usage;
        fetch(Url, {
                method: "GET",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                }
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    setUsageSaved(true);
                    getUserCars(carId);
                    RefreshJobCards();
                    setTimeout(function() {
                        setUsageSaved(false);
                    }, 6000);
                } else {
                    props.UserLoad(false);
                    props.addMessage([
                        { msg: responseModel.message, msgType: general_1.MessageTypes.Error },
                    ]);
                }
            })["catch"](function(error) {
                console.log(error);
                props.UserLoad(false);
            });
    };
    var getUserCars = function(id) {
        fetch(config_1.APIUrl + "/Asset/GetUserCarsMroPlanActive?PersonId=" + props.personId, {
                method: "GET",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json"
                }
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    var data = responseModel.data;
                    var car = data.find(function(c) { return c.id === carId; });
                    var data2 = data.filter(function(c) { return c.id !== carId; });
                    if (car) {
                        data2.unshift(car);
                    }
                    //setCarList(data.filter(m => m.id === id));
                    setCarList(data2);
                }
            })["catch"](function(error) {
                console.log(error);
            });
    };
    react_1.useEffect(function() {
        window.scrollTo(0, 0);
        props.UserLoad(true);
        getUserCars(carId);
        getJobCards(carId);
        console.log("mount " + carId);
    }, [Refresh, AllChecked, WorkOrderList]);
    var checkUsage = function() {
        if (!ValidateUsage(Usage)) {
            setErrorUsage("border-red");
            return;
        } else
            setErrorUsage("");
    };
    var handleUsage = function(event) {
        setUsage(event.target.value);
    };
    var handleShowList = function(event) {
        props.showCardList(false);
        setView(2);
    };
    var handleShowCard = function(event) {
        props.showCardList(true);
        setView(3);
    };
    var ValidateUsage = function(text) {
        if (/^\d+$/.test(text)) {
            return true;
        }
        return false;
    };
    var getPosition = function(strvalue, remain) {
        var value = parseInt(strvalue, 10);
        if (remain > 0) {
            if (remain > 0.1 * value)
                return 150;
            else
                return 75 + (75 * remain) / (value * 0.1);
        } else {
            if (-1 * remain > 0.1 * value)
                return 0;
            else
                return 75 - (-75 * remain) / (value * 0.1);
        }
        return 30;
    };
    var getColor = function(strvalue, remain) {
        var value = parseInt(strvalue, 10);
        if (remain > 0) {
            if (remain > 0.1 * value)
                return "pos2";
            else
                return "pos1";
        } else {
            if (-1 * remain < 0.1 * value)
                return "neg1";
            else
                return "neg2";
        }
    };
    var getColorCard = function(remain) {
        if (remain > 0) {
            return "car-color-success";
        } else if (remain < 0) {
            return "car-color-danger";
        } else if (remain === 0) {
            return "car-color-warning";
        }
    };
    var getColorCard2 = function(remain) {
        if (remain > 0) {
            return "car-color-success";
        } else if (remain < 0) {
            return "car-color-danger2";
        } else if (remain === 0) {
            return "car-color-warning";
        }
    };
    var getClCard = function(remain) {
        if (remain > 0) {
            return "car-cl-success";
        } else if (remain < 0) {
            return "car-cl-danger";
        } else if (remain === 0) {
            return "car-cl-warning";
        }
    };
    var getColorBorder = function(remain) {
        if (remain > 0) {
            return "car-border-success";
        } else if (remain < 0) {
            return "car-border-danger";
        } else if (remain === 0) {
            return "car-border-warning";
        }
    };
    var submit = function() {
        props.UserLoad(true);
        var data = {
            Id: carId
        };
        fetch(config_1.APIUrl + "/JobCard/SaveJCUserRejected", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                }
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    setView(2);
                }
                props.UserLoad(false);
            })["catch"](function(error) {
                props.UserLoad(false);
                console.log(error);
            });
    };
    var removeFromRejectedJobCards = function(workOrderId, jobCardId, assetId) {
        var data = {
            workOrderId: workOrderId,
            jobCardId: jobCardId,
            assetId: assetId
        };
        fetch(config_1.APIUrl + "/WorkOrder/RemoveFromRejectJobCard", {
                method: "POST",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                body: JSON.stringify(data)
            })
            .then(function(response) { return response.json(); })
            .then(function(responseModel) {
                if (responseModel.messageCode === 0) {
                    getJobCards(carId);
                }
            })["catch"](function(error) {
                console.log("error");
                console.log(error);
            });
    };
    var checkUncheckAll = function(e) {
        if (e.target.checked) {
            setAllChecked(true);
            for (var i = 0; i < JobCards.length; i++) {
                addToWorkOrderList(JobCards[i]);
            }
        } else {
            setAllChecked(false);
            setWorkOrderList([]);
        }
    };
    var addToWorkOrderList = function(jobCard) {
        if (WorkOrderList.filter(function(p) { return p.workOrderId === jobCard.workOrderId; })
            .length === 0) {
            var newWorkOrderList = WorkOrderList;
            newWorkOrderList.push(jobCard);
            setWorkOrderList(newWorkOrderList);
        }
        console.log(WorkOrderList);
    };
    var removeFromWorkOrderList = function(jobCard) {
        var newWorkOrderList = WorkOrderList.filter(function(p) { return p.workOrderId !== jobCard.workOrderId; });
        setWorkOrderList(newWorkOrderList);
    };
    var doMultipleJobCards = function() {
        if (WorkOrderList.length > 0)
            setShowMultipleModal(true);
    };
    var JobcardItemLoad = function(c) {
        props.UserLoad(c);
    };
    var AlertMessage = function(m, t) {
        props.addMessage([{ msg: m, msgType: t }]);
    };
    var View1 = (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", null),
        react_1["default"].createElement("div", { className: "w-100 text-right" },
            react_1["default"].createElement("ul", { className: "jobcard-list" }, JobCards.filter(function(p) { return p.mroPlanActive === true || p.mroPlanActive === null; }).map(function(item) {
                return (react_1["default"].createElement("li", { key: item.jobCardId, className: "jobcard-item" },
                    react_1["default"].createElement(JobCardItem, __assign({}, {
                        showSwitch: true,
                        jobCardInfo: [item],
                        token: props.token,
                        RefreshJobCards: function() { return RefreshJobCards(); },
                        hideModal: function() { return hideModal(); },
                        AlertMessage: AlertMessage,
                        JobcardItemLoad: JobcardItemLoad
                    }))));
            }))),
        react_1["default"].createElement("div", { className: "clearfix" }),
        JobCards &&
        JobCards.filter(function(p) { return p.mroPlanActive === false; }).length > 0 ? (react_1["default"].createElement("div", { className: "text-right rtl" }, "\u0627\u0632 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0645\u06CC\u062A\u0648\u0627\u0646\u06CC\u062F \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u06CC\u06AF\u0631 \u0631\u0627 \u0646\u06CC\u0632 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0641\u0639\u0627\u0644 \u0646\u0645\u0627\u06CC\u06CC\u062F")) : null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("ul", { className: "jobcard-list" }, JobCards.filter(function(p) { return p.mroPlanActive === false; }).map(function(item) {
                return (react_1["default"].createElement("li", { key: item.workOrderId, className: "jobcard-item" },
                    item.jobCardSign,
                    react_1["default"].createElement("div", { className: "toggle-container" },
                        react_1["default"].createElement("label", { className: "Toggle_Switch" },
                            react_1["default"].createElement("input", {
                                type: "checkbox",
                                onChange: function() {
                                    return removeFromRejectedJobCards(item.workOrderId, item.jobCardId, item.assetId);
                                }
                            }),
                            react_1["default"].createElement("span", { className: "Toggle_Slider round" })))));
            }))),
        react_1["default"].createElement("div", { className: "clearfix" }),
        react_1["default"].createElement("div", { className: "maintenance-buttons float-left" },
            react_1["default"].createElement("button", { className: "btn-green btn ", onClick: function() { return submit(); } }, "\u062A\u0627\u06CC\u06CC\u062F \u0648 \u0627\u062F\u0627\u0645\u0647"),
            react_1["default"].createElement("button", { className: "btn-gray btn " }, "\u0628\u0627\u0632\u06AF\u0634\u062A"))));
    var View2 = (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "w-100 text-right table-responsive" },
            react_1["default"].createElement("div", { className: "row car-mt-th" },
                react_1["default"].createElement("div", { className: "col-lg-11 col-md-11  col-sm-11  col-xs-11 card-titr-service srv-car" },
                    react_1["default"].createElement("i", { className: "fa fa-arrow-right", onClick: gotoCarServices }),
                    react_1["default"].createElement("span", { onClick: gotoCarServices }, "\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646"))),
            react_1["default"].createElement("table", { className: "tbl-jobcards table" },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", { className: "FirstTR  car-mt-th3" },
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("img", { src: require("../../img/mechanic.png"), srcSet: "/static/media/mechanic@2x.png 2x, /static/media/mechanic@3x.png 3x", alt: "" })),
                        react_1["default"].createElement("th", { scope: "col-lg-2 col-xl-2", className: "caption-header" }, "\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646"),
                        react_1["default"].createElement("th", { scope: "col-lg-3 col-xl-3" },
                            react_1["default"].createElement("button", { className: "btn btn-All-done", onClick: function() { return doMultipleJobCards(); } }, "\u0647\u0645\u0632\u0645\u0627\u0646 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0646\u062F")),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }),
                        react_1["default"].createElement("th", { scope: "col-lg-1 col-xl-1" }))),
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("input", { type: "checkbox", onChange: function(e) { return checkUncheckAll(e); } })),
                        react_1["default"].createElement("th", { scope: "col-lg-2  col-xl-2" },
                            react_1["default"].createElement("span", null, "\u0646\u0627\u0645 \u0633\u0631\u0648\u06CC\u0633")),
                        react_1["default"].createElement("th", { scope: "col-lg-3  col-xl-3" },
                            react_1["default"].createElement("span", null, "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0627\u0646\u062C\u0627\u0645 \u0622\u062E\u0631\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633")),
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("span", null, "\u062A\u0627\u0631\u06CC\u062E")),
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("span", null, " \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0627\u0646\u062C\u0627\u0645 \u0633\u0631\u0648\u06CC\u0633")),
                        react_1["default"].createElement("th", { scope: "col-lg-2  col-xl-2" },
                            react_1["default"].createElement("span", null, " \u0628\u0627\u0642\u06CC\u0645\u0627\u0646\u062F\u0647 ")),
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("span", null, " \u0648\u0627\u062D\u062F"),
                            " :"),
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" },
                            react_1["default"].createElement("span", null, " \u0648\u0636\u0639\u06CC\u062A")),
                        react_1["default"].createElement("th", { scope: "col-lg-1  col-xl-1" }, props.showCard === true ? (react_1["default"].createElement("div", null,
                            react_1["default"].createElement("i", { className: "Carlist CarlistActive fa fa-th-large fa-2x", "aria-hidden": "true", onClick: handleShowCard }),
                            react_1["default"].createElement("i", { onClick: handleShowList, className: "Carlist fa fa-list fa-2x", "aria-hidden": "true" }))) : (react_1["default"].createElement("div", null,
                            react_1["default"].createElement("i", { className: "Carlist fa fa-th-large fa-2x", "aria-hidden": "true", onClick: handleShowCard }),
                            react_1["default"].createElement("i", { onClick: handleShowList, className: "Carlist CarlistActive fa fa-list fa-2x", "aria-hidden": "true" })))))),
                react_1["default"].createElement("tbody", null, JobCards.map(function(item) {
                    return (react_1["default"].createElement("tr", { key: item.jobCardId },
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement(CheckboxItem, {
                                checked: AllChecked,
                                jobCard: item,
                                addToWorkOrderList: function(jobCard) {
                                    return addToWorkOrderList(item);
                                },
                                removeFromWorkOrderList: function(jobCard) {
                                    return removeFromWorkOrderList(item);
                                }
                            })),
                        react_1["default"].createElement("td", { className: "CarServicesTitle" }, item.jobCardSign),
                        react_1["default"].createElement("td", { className: "CarServicesTitle" }, item.latestJobCardUsage),
                        react_1["default"].createElement("td", { className: "CarServicesTitle" }, item.latestJobCardTime),
                        react_1["default"].createElement("td", { className: "CarServicesTitle" }, item.usageAmount),
                        react_1["default"].createElement("td", {
                                className: item.planTitleCode.toUpperCase() === "U" ?
                                    "remain-usage " + getClCard(item.remainJCUsage) :
                                    "remain-usage " + getClCard(item.remainJCDay)
                            }, item.planTitleCode.toUpperCase() === "U" ?
                            changeEnc_1["default"](item.remainJCUsage.toString()) :
                            item.planTitleCode.toUpperCase() === "T" ?
                            changeEnc_1["default"](item.remainJCDay.toString()) :
                            null),
                        react_1["default"].createElement("td", {
                                className: "CarServicesTitle" +
                                    getColor(item.value, item.remainJCUsage)
                            }, item.planTitleCode.toUpperCase() === "U" ?
                            "کیلومتر" :
                            item.planTitleCode.toUpperCase() === "T" ?
                            "روز" :
                            null),
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement("span", {
                                className: item.planTitleCode.toUpperCase() === "U" ?
                                    "Car-Col-Card-Circle2 " +
                                    getColorCard2(item.remainJCUsage) :
                                    "Car-Col-Card-Circle2 " +
                                    getColorCard2(item.remainJCDay)
                            }),
                            item.planTitleCode.toUpperCase() === "U" &&
                            item.remainJCUsage < 0 ? (react_1["default"].createElement("img", { className: "Car-Card_Ambulance2", src: require("../../img/ambulance.png"), srcSet: "/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x", alt: "" })) : item.planTitleCode.toUpperCase() === "T" &&
                            item.remainJCDay < 0 ? (react_1["default"].createElement("img", { className: "Car-Card_Ambulance2", src: require("../../img/ambulance.png"), srcSet: "/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x", alt: "" })) : (react_1["default"].createElement("span", null))),
                        react_1["default"].createElement("td", null,
                            react_1["default"].createElement("button", {
                                className: "btn btn-done",
                                onClick: function() {
                                    setCurrentJobCard(item);
                                    setshowModal(true);
                                }
                            }, "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F"))));
                })))),
        react_1["default"].createElement("div", { className: "clearfix" })));
    var View3 = (react_1["default"].createElement("div", null,
        props.showCard === true ? (react_1["default"].createElement("div", { className: "cardlist" },
            react_1["default"].createElement("i", { className: "Carlist CarlistActive fa fa-th-large fa-2x", "aria-hidden": "true", onClick: handleShowCard }),
            react_1["default"].createElement("i", { onClick: handleShowList, className: "Carlist fa fa-list fa-2x", "aria-hidden": "true" }))) : (react_1["default"].createElement("div", null,
            react_1["default"].createElement("i", { className: "Carlist fa fa-th-large fa-2x", "aria-hidden": "true", onClick: handleShowCard }),
            react_1["default"].createElement("i", { onClick: handleShowList, className: "Carlist CarlistActive fa fa-list fa-2x", "aria-hidden": "true" }))),
        react_1["default"].createElement("div", { className: "row Car-Card_Container2" }, JobCards.map(function(item) {
            return (react_1["default"].createElement("div", {
                    className: item.planTitleCode.toUpperCase() === "U" ?
                        "col-lg-3 Car-Card " + getColorBorder(item.remainJCUsage) :
                        "col-lg-3 Car-Card " + getColorBorder(item.remainJCDay),
                    key: item.jobCardId
                },
                react_1["default"].createElement("div", { className: "Car-Card-Item" },
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp3", "data-toggle": "tooltip", title: item.jobCardSign }, item.jobCardSign),
                    item.planTitleCode.toUpperCase() === "U" &&
                    item.remainJCUsage < 0 ? (react_1["default"].createElement("img", { className: "Car-Card_Ambulance", src: require("../../img/ambulance.png"), srcSet: "/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x", alt: "" })) : item.planTitleCode.toUpperCase() === "T" &&
                    item.remainJCDay < 0 ? (react_1["default"].createElement("img", { className: "Car-Card_Ambulance", src: require("../../img/ambulance.png"), srcSet: "/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x", alt: "" })) : (react_1["default"].createElement("span", null)),
                    react_1["default"].createElement("div", {
                        className: item.planTitleCode.toUpperCase() === "U" ?
                            "Car-Col-Card-Circle " + getColorCard(item.remainJCUsage) :
                            "Car-Col-Card-Circle " + getColorCard(item.remainJCDay)
                    })),
                react_1["default"].createElement("div", { className: "Car-Card-Item" },
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp4" }, " \u0627\u0646\u062C\u0627\u0645 \u0622\u062E\u0631\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633 :")),
                react_1["default"].createElement("div", { className: "Car-Card-Item" },
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp5" },
                        changeEnc_1["default"](item.latestJobCardUsage ?
                            item.latestJobCardUsage.toString() :
                            ""),
                        react_1["default"].createElement("img", { src: require("../../img/dashboard.png"), srcSet: "/static/media/dashboard(1)@2x.png 2x, /static/media/dashboard(1)@3x.png 3x", alt: "" })),
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp5" },
                        changeEnc_1["default"](item.latestJobCardTime ? item.latestJobCardTime : ""),
                        react_1["default"].createElement("img", { src: require("../../img/calendar(1).png"), srcSet: "/static/media/calendar(1)@2x.png 2x, /static/media/calendar(1)@3x.png 3x", alt: "" }))),
                react_1["default"].createElement("div", { className: "Car-Card-Item" },
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp6" }, "\u0628\u0627\u0642\u06CC\u0645\u0627\u0646\u062F\u0647 "),
                    react_1["default"].createElement("span", { className: "Car-Card-Item-Sp2" }, item.planTitleCode.toUpperCase() === "U" ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("span", { className: "float-left" }, "\u00A0\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631\u00A0"),
                        react_1["default"].createElement("span", { className: "float-left ltr" },
                            formatCurrency_1["default"](changeEnc_1["default"](item.remainJCUsage.toString())),
                            "\u00A0"))) : item.planTitleCode.toUpperCase() === "T" ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("span", { className: "float-left" }, "\u00A0\u0631\u0648\u0632\u00A0"),
                        react_1["default"].createElement("span", { className: "float-left ltr" },
                            changeEnc_1["default"](item.remainJCDay.toString()),
                            "\u00A0"))) : null)),
                react_1["default"].createElement("div", { className: "Car-Card-Item" },
                    react_1["default"].createElement("button", {
                        className: "Car-Card-Item-Button",
                        onClick: function() {
                            setCurrentJobCard(item);
                            setshowModal(true);
                        }
                    }, "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F"))));
        }))));
    var ViewCar = (react_1["default"].createElement("div", { className: "car-info-side row" }, carList.map(function(c) {
        return (react_1["default"].createElement("div", {
                key: c.id,
                onClick: function() { return gotoCar(c.id); },
                className: c.id === carId ?
                    "Car-Col  col-lg-12" :
                    "Car-Col disbaled-component  col-lg-12"
            },
            react_1["default"].createElement("div", { className: "Car-Col-Card" },
                react_1["default"].createElement("div", { className: "Car_Row " },
                    react_1["default"].createElement("div", { className: "lable-mycard-cap1" },
                        react_1["default"].createElement("div", { className: "Car-Img" },
                            react_1["default"].createElement("img", { alt: "", src: require("../img/../../img/plak.png") }),
                            react_1["default"].createElement("span", { className: "plk1" }, changeEnc_1["default"](c.pelak1 ? c.pelak1.toString() : "")),
                            react_1["default"].createElement("span", { className: "plk2" }, changeEnc_1["default"](c.pelak2 ? c.pelak2.toString() : "")),
                            react_1["default"].createElement("span", { className: "plk3" }, changeEnc_1["default"](c.pelakSign ? c.pelakSign.toString() : "")),
                            react_1["default"].createElement("span", { className: "plk4" }, changeEnc_1["default"](c.pelak3 ? c.pelak3.toString() : ""))))),
                react_1["default"].createElement("div", { className: "text-center car-container" },
                    react_1["default"].createElement(Image_1["default"], { fallbackSrc: config_1.APIImage + "/car.png", alt: "", src: config_1.APIImage + "/" + c.imageProduct })),
                react_1["default"].createElement("div", { className: "line-100" }),
                react_1["default"].createElement("p", { className: "carSign" },
                    c.sign,
                    " ",
                    c.year),
                react_1["default"].createElement("div", { className: "mt-2" },
                    react_1["default"].createElement("div", { className: "float-right lable" },
                        react_1["default"].createElement("img", { className: "icon", src: require("../../img/letter.png"), alt: "" }),
                        "\u06CC\u0627\u062F\u0622\u0648\u0631\u06CC \u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC"),
                    react_1["default"].createElement("div", { className: "float-left ltr" },
                        react_1["default"].createElement("label", { className: "Toggle_Switch" },
                            react_1["default"].createElement("input", { type: "checkbox" }),
                            react_1["default"].createElement("span", { className: "Toggle_Slider round" })))),
                react_1["default"].createElement("div", { className: "clearfix" }),
                react_1["default"].createElement("div", { className: "mt-2" },
                    react_1["default"].createElement("div", { className: "float-right lable" },
                        react_1["default"].createElement("img", { className: "icon", src: require("../../img/gage.png"), alt: "" }),
                        "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062E\u0648\u062F\u0631\u0648"),
                    react_1["default"].createElement("div", { className: "float-left ltr lable" },
                        changeEnc_1["default"](c.latestUsage.toString()),
                        "\u00A0Km")),
                react_1["default"].createElement("div", { className: "clearfix" }),
                react_1["default"].createElement("div", { className: "mt-2" },
                    react_1["default"].createElement("div", { className: "float-right lable" },
                        react_1["default"].createElement("img", { className: "icon", src: require("../../img/calendar.png"), alt: "" }),
                        "\u062A\u0627\u0631\u06CC\u062E \u0627\u0645\u0631\u0648\u0632"),
                    react_1["default"].createElement("div", { className: "float-left ltr lable" }, curDate)),
                react_1["default"].createElement("div", { className: "clearfix" }),
                View === 2 ? (react_1["default"].createElement("div", { className: " form-group mt-3" }, UsageSaved ? (react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: "green-box" }, "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0627\u0645\u0631\u0648\u0632 \u062E\u0648\u062F\u0631\u0648 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F"))) : (react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: "plfield " },
                        react_1["default"].createElement("input", {
                            type: "text",
                            placeholder: " ",
                            disabled: c.id !== carId,
                            autoComplete: "off",
                            title: "\u0644\u0637\u0641\u0627 \u0641\u06CC\u0644\u062F \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0641\u0639\u0644\u06CC \u062E\u0648\u062F\u0631\u0648  \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
                            required: true,
                            onChange: function(e) { return handleUsage(e); },
                            onBlur: function() { return checkUsage(); },
                            className: "form-control ltr-control txt-mobile " +
                                (ErrorUsage === "" ? "pl-input" : "pl-input-error")
                        }),
                        react_1["default"].createElement("span", { className: "grow" }, "\u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0641\u0639\u0644\u06CC \u062E\u0648\u062F\u0631\u0648 "),
                        react_1["default"].createElement("i", { className: "icon-tachometer fa fa-tachometer" })),
                    EditUsage ? (react_1["default"].createElement("span", { className: "edit-usage-alert" }, "\u062F\u0631 \u0647\u0631 \u0631\u0648\u0632 \u062A\u0646\u0647\u0627 1 \u0628\u0627\u0631 \u0627\u0635\u0644\u0627\u062D \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u062B\u0628\u062A \u0634\u062F\u0647 \u0627\u0645\u06A9\u0627\u0646\u067E\u0630\u06CC\u0631 \u0627\u0633\u062A.")) : null,
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("button", {
                            className: c.id === carId ?
                                "btn-save-car btn " :
                                "btn-save-car gray btn ",
                            disabled: c.id !== carId,
                            "data-id": c.id,
                            onClick: function() {
                                return saveUsage(c.id, EditUsage);
                            }
                        }, "\u0630\u062E\u06CC\u0631\u0647")))))) : null)));
    })));
    return (react_1["default"].createElement("div", { className: "Maintenance " },
        CurrentJobCard !== undefined ? (react_1["default"].createElement(react_bootstrap_1.Modal, { size: "xl", show: showModal, onHide: function() { return setshowModal(false); }, className: "modal-jobcard" },
            react_1["default"].createElement(react_bootstrap_1.Modal.Header, null,
                react_1["default"].createElement(react_bootstrap_1.Modal.Title, null, CurrentJobCard.jobCardSign),
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faWindowClose, color: "gray", size: "lg", onClick: function() { return setshowModal(false); } })),
            react_1["default"].createElement(react_bootstrap_1.Modal.Body, null,
                react_1["default"].createElement(JobCardItem, __assign({}, {
                    showSwitch: false,
                    jobCardInfo: [CurrentJobCard],
                    token: props.token,
                    RefreshJobCards: function() { return RefreshJobCards(); },
                    hideModal: function() { return hideModal(); },
                    AlertMessage: AlertMessage,
                    JobcardItemLoad: JobcardItemLoad
                }))))) : null,
        WorkOrderList.length > 0 ? (react_1["default"].createElement(react_bootstrap_1.Modal, { size: "xl", show: ShowMultipleModal, onHide: function() { return setShowMultipleModal(false); }, className: "modal-jobcard" },
            react_1["default"].createElement(react_bootstrap_1.Modal.Header, null,
                react_1["default"].createElement(react_bootstrap_1.Modal.Title, null, "\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u0647\u0645\u0632\u0645\u0627\u0646 :"),
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faWindowClose, color: "gray", size: "lg", onClick: function() { return setShowMultipleModal(false); } })),
            react_1["default"].createElement(react_bootstrap_1.Modal.Body, null,
                react_1["default"].createElement(JobCardItem, __assign({}, {
                    showSwitch: false,
                    jobCardInfo: WorkOrderList,
                    token: props.token,
                    RefreshJobCards: function() { return RefreshJobCards(); },
                    hideModal: function() { return hideModal(); },
                    AlertMessage: AlertMessage,
                    JobcardItemLoad: JobcardItemLoad
                }))))) : null,
        react_1["default"].createElement("div", { className: "rtl maintenance-card" },
            react_1["default"].createElement("div", { className: "row" },
                react_1["default"].createElement("div", { className: "col-lg-2 col-md-6 col-xs-12 col-xl-2  col-cars-show2" }, ViewCar),
                react_1["default"].createElement("div", { className: "col-lg-10 col-md-6 col-xs-12 col-xl-9" },
                    react_1["default"].createElement("div", null, props.showCard === false ? null : (react_1["default"].createElement("div", { className: "row car-mt-th2 " },
                        react_1["default"].createElement("div", { className: "col-lg-11 col-md-11  col-sm-11  col-xs-11 srv-car" },
                            react_1["default"].createElement("i", { className: "fa fa-arrow-right", onClick: gotoCarServices }),
                            react_1["default"].createElement("span", { onClick: gotoCarServices }, "\u0633\u0631\u0648\u06CC\u0633 \u0647\u0627\u06CC \u062F\u0648\u0631\u0647 \u0627\u06CC \u062E\u0648\u062F\u0631\u0648 \u0645\u0646"))))),
                    View === 1 ? View1 : null,
                    View === 2 ? View2 : null,
                    View === 3 ? View3 : null),
                react_1["default"].createElement("div", { className: "col-lg-2 col-md-6 col-xs-12 col-xl-1 col-cars-show" }, ViewCar)),
            react_1["default"].createElement("div", { className: "w-100 text-center" }))));
};
exports["default"] = react_redux_1.connect(function(state) { return state.userinfo; }, UserInfo.actionCreators)(CarMaintenance);