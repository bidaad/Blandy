import React, { useState, useEffect } from "react";
import { APIImage, APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import Image from "../../components/Image";
import { VwCar } from "../../model/viewModel/VwCar";
import { VwAssetJobCard } from "../../model/viewModel/VwAssetJobCard";
import DatePicker from "react-datepicker2";
import changeEnc from "../../helper/changeEnc";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { MessageTypes } from "../../model/general";
import formatAndEncCurrency from "../../helper/formatCurrency";

type CarMaintenanceProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & { match: any; location: any; history: any };

interface JobCardItemProps {
  token: string;
  jobCardInfo: VwAssetJobCard[];
  RefreshJobCards: () => void;
  hideModal: () => void;
  showSwitch: boolean;
}

const JobCardItem = (
  props: JobCardItemProps & { JobcardItemLoad: any; AlertMessage: any }
) => {
  const [ErrorUsage, setErrorUsage] = useState("");
  const [Usage, setUsage] = useState("0");
  var momentjl = require("moment-jalaali");
  const [SelectedDate, setSelectedDate] = useState(momentjl());
  const [ShowSave, setShowSave] = useState(true);
  //const [DefaultUsage, setDefaultUsage] = useState(0);

  const checkUsage = () => {
    if (!ValidateUsage(Usage)) {
      setErrorUsage("border-red");
      return;
    } else setErrorUsage("");
  };

  const handleUsage = (event: any) => {
    setUsage(event.target.value);
  };

  function handleDateChange(event: any) {
    // let dt = event.format("YYYY/M/D hh:mm:ss A");
    // dt = dt.replace("ق.ظ", "AM");
    // dt = dt.replace("ب.ظ", "PM");
    setSelectedDate(event);
  }

  const saveJobCard = () => {
    var data = [];
    for (let i = 0; i < props.jobCardInfo.length; i++) {
      //const element = props.jobCardInfo[i];
      const curData = {
        workOrderId: props.jobCardInfo[i].workOrderId,
        assetId: props.jobCardInfo[i].assetId,
        jobCardId: props.jobCardInfo[i].jobCardId,
        ActualFinish: SelectedDate,
        value: parseInt(Usage, 10),
      };
      data.push(curData);
    }
    fetch(APIUrl + "/WorkOrder/SaveJobCard", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setUsage("0");
          setSelectedDate(undefined);
          props.AlertMessage(responseModel.message, MessageTypes.Success);
          props.JobcardItemLoad(true);
          setTimeout(() => {
            props.RefreshJobCards();
            // window.location.reload();
          }, 1000);

          // props.RefreshJobCards();
          // if (props.showSwitch)
          //   setShowSave(false);
          // else
          //   props.hideModal();
        } else {
          props.AlertMessage(responseModel.message, MessageTypes.Error);
          props.JobcardItemLoad(false);
        }
      })
      .catch((error) => {
        props.JobcardItemLoad(false);
        console.log("error");
        console.log(error);
      });
  };

  // const ValidateUsage = (text: string) => {
  //   if (/^\d+$/.test(text)) {
  //     return true;
  //   }
  //   return false;
  // };

  const handleJobCardCheck = (event: any) => {
    console.log(props.jobCardInfo[0]);
    const data = {
      workOrderId: props.jobCardInfo[0].workOrderId,
      assetId: props.jobCardInfo[0].assetId,
      jobCardId: props.jobCardInfo[0].jobCardId,
      ActualFinish: SelectedDate,
      value: Usage,
    };

    fetch(APIUrl + "/WorkOrder/RejectJobCard", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          console.log("call refresh");
          props.RefreshJobCards();
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  var enabledRange = {
    min: momentjl().add(-36000, "days"),
    max: momentjl().add(0, "days"),
  };
  return (
    <div className="jobcard-title">
      {props.jobCardInfo.length === 1
        ? props.jobCardInfo.map((item) => (
            <span key={item.workOrderId} title={item.jobCardSign}>
              {item.jobCardSign},&nbsp;
              {/* {item.priorityCode} */}
            </span>
          ))
        : ""}

      {props.jobCardInfo[0].priorityCode !== "Urgent" && props.showSwitch ? (
        <div className="toggle-container">
          <label className="Toggle_Switch">
            <input
              type="checkbox"
              onChange={handleJobCardCheck}
              // disabled={
              //   props.jobCardInfo[0].priorityCode === "Urgent" ? true : false
              // }
              defaultChecked={true}
            />
            <span className="Toggle_Slider round"></span>
          </label>
        </div>
      ) : null}

      <div className="jobcard-form">
        <div className=" form-group mt-3">
          <div className={"plfield "}>
            <input
              type="text"
              placeholder=" "
              autoComplete="off"
              title="لطفا فیلد کیلومتر خودرو  را وارد کنید"
              required
              onChange={(e) => handleUsage(e)}
              onBlur={() => checkUsage()}
              value={Usage}
              // defaultValue={DefaultUsage}
              className={
                "form-control ltr-control txt-mobile " +
                (ErrorUsage === "" ? "pl-input" : "pl-input-error")
              }
              id="username"
            />
            <span className="grow">کیلومتر خودرو </span>
            <i className="icon-tachometer fa fa-tachometer"></i>
          </div>
        </div>

        <div className=" form-group mt-3">
          <div className={"plfield "}>
            <DatePicker
              isGregorian={false}
              calendarClass="calendar-picker"
              timePicker={false}
              min={enabledRange.min}
              max={enabledRange.max}
              // {...{ placeholder: 'تاریخ آخرین ' + props.jobCardInfo.jobCardSign }}
              {...{ placeholder: "تاریخ آخرین ", value: SelectedDate }}
              className={"form-control"}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div>
          {ShowSave ? (
            <button className="btn-save-jobcard btn " onClick={saveJobCard}>
              ذخیره
            </button>
          ) : (
            <button
              className="btn-edit-jobcard btn "
              onClick={() => setShowSave(true)}
            >
              ویرایش
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface CheckboxItemProps {
  checked: boolean;
  jobCard: VwAssetJobCard;
  addToWorkOrderList: (jobCard: VwAssetJobCard) => void;
  removeFromWorkOrderList: (jobcard: VwAssetJobCard) => void;
}

const ValidateUsage = (text: string) => {
  if (/^\d+$/.test(text)) {
    return true;
  }
  return false;
};

const CheckboxItem = (props: CheckboxItemProps) => {
  const [Checked, setChecked] = useState(false);

  useEffect(() => {
    //alert(props.checked)
    setChecked(props.checked);
  }, [props.checked, props.jobCard]);

  const handleCheckbox = (e: any) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      props.addToWorkOrderList(props.jobCard);
    } else props.removeFromWorkOrderList(props.jobCard);
  };

  return (
    <input
      type="checkbox"
      defaultChecked={false}
      checked={Checked}
      onChange={(e) => handleCheckbox(e)}
    />
  );
};

const CarMaintenance = (props: CarMaintenanceProps) => {
  const [carList, setCarList] = useState<VwCar[]>([]);
  const [JobCards, setJobCards] = useState<VwAssetJobCard[]>([]);
  const [CurrentJobCard, setCurrentJobCard] = useState<
    VwAssetJobCard | undefined
  >(undefined);

  const [WorkOrderList, setWorkOrderList] = useState<VwAssetJobCard[]>([]);
  const [Usage, setUsage] = useState("");
  const [ErrorUsage, setErrorUsage] = useState("");
  const [Refresh, setRefresh] = useState(false);
  const [AllChecked, setAllChecked] = useState(false);
  const [View, setView] = useState(0);
  const [UsageSaved, setUsageSaved] = useState(false);
  const [EditUsage, setEditUsage] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [ShowMultipleModal, setShowMultipleModal] = useState(false);

  var strLocation: string = props.location.pathname;
  var n: number = strLocation.search(/maintenance/);
  const carId = strLocation.substring(n + 12, n + 12 + 36);
  const curDate = new Date().toLocaleDateString("fa-IR");

  const gotoCar = (id: string) => {
    if (id === carId) return;
    const { history } = props;
    history.push("/user/maintenance/" + id);
    setRefresh(!Refresh);
  };
  const gotoCarServices = () => {
    const { history } = props;
    history.push({
      pathname: "/user/cars/",
    });
  };
  const getJobCards = (id: string) => {
    
    console.log("getJobCards" + id);

    fetch(APIUrl + "/JobCard/GetJobCardsByAssetId?assetId=" + id, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        
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
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  };

  const RefreshJobCards = () => {
    setAllChecked(false);
    setWorkOrderList([]);
    getJobCards(carId);
    setRefresh(!Refresh);
    hideModal();
  };

  const hideModal = () => {
    setshowModal(false);
    setShowMultipleModal(false);
  };

  const saveUsage = (carId: string, update?: boolean) => {
    props.UserLoad(true);
    var Url =
      APIUrl +
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
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setUsageSaved(true);
          getUserCars(carId);
          RefreshJobCards();
          setTimeout(() => {
            setUsageSaved(false);
          }, 6000);
        } else {
          props.UserLoad(false);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  };
  const getUserCars = (id: string) => {
    fetch(
      APIUrl + "/Asset/GetUserCarsMroPlanActive?PersonId=" + props.personId,
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
        if (responseModel.messageCode === 0) {
          let data = responseModel.data as VwCar[];
          let car = data.find((c) => c.id === carId);
          let data2 = data.filter((c) => c.id !== carId);
          if (car) {
            data2.unshift(car);
          }
          //setCarList(data.filter(m => m.id === id));
          setCarList(data2);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    props.UserLoad(true);
    getUserCars(carId);
    getJobCards(carId);
    console.log("mount " + carId);
  
  }, [Refresh, AllChecked, WorkOrderList]);

  const checkUsage = () => {
    if (!ValidateUsage(Usage)) {
      setErrorUsage("border-red");
      return;
    } else setErrorUsage("");
  };

  const handleUsage = (event: any) => {
    setUsage(event.target.value);
  };
  const handleShowList = (event: any) => {
    props.showCardList(false);
    setView(2);
  };
  const handleShowCard = (event: any) => {
    props.showCardList(true);
    setView(3);
  };
  const ValidateUsage = (text: string) => {
    if (/^\d+$/.test(text)) {
      return true;
    }
    return false;
  };

  const getPosition = (strvalue: string, remain: number) => {
    const value: number = parseInt(strvalue, 10);
    if (remain > 0) {
      if (remain > 0.1 * value) return 150;
      else return 75 + (75 * remain) / (value * 0.1);
    } else {
      if (-1 * remain > 0.1 * value) return 0;
      else return 75 - (-75 * remain) / (value * 0.1);
    }
//    return 30;
  };

  const getColor = (strvalue: string, remain: number) => {
    const value: number = parseInt(strvalue, 10);
    if (remain > 0) {
      if (remain > 0.1 * value) return "pos2";
      else return "pos1";
    } else {
      if (-1 * remain < 0.1 * value) return "neg1";
      else return "neg2";
    }
  };
  const getColorCard = (remain: number) => {
    if (remain > 0) {
      return "car-color-success";
    } else if (remain < 0) {
      return "car-color-danger";
    } else if (remain === 0) {
      return "car-color-warning";
    }
  };
  const getColorCard2 = (remain: number) => {
    if (remain > 0) {
      return "car-color-success";
    } else if (remain < 0) {
      return "car-color-danger2";
    } else if (remain === 0) {
      return "car-color-warning";
    }
  };
  const getClCard = (remain: number) => {
    if (remain > 0) {
      return "car-cl-success";
    } else if (remain < 0) {
      return "car-cl-danger";
    } else if (remain === 0) {
      return "car-cl-warning";
    }
  };
  const getColorBorder = (remain: number) => {
    if (remain > 0) {
      return "car-border-success";
    } else if (remain < 0) {
      return "car-border-danger";
    } else if (remain === 0) {
      return "car-border-warning";
    }
  };

  const submit = () => {
    props.UserLoad(true);
    const data = {
      Id: carId,
    };
    fetch(APIUrl + "/JobCard/SaveJCUserRejected", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setView(2);
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
        console.log(error);
      });
  };

  const removeFromRejectedJobCards = (
    workOrderId: string,
    jobCardId: string,
    assetId: string
  ) => {
    const data = {
      workOrderId: workOrderId,
      jobCardId: jobCardId,
      assetId: assetId,
    };
    fetch(APIUrl + "/WorkOrder/RemoveFromRejectJobCard", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          getJobCards(carId);
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const checkUncheckAll = (e: any) => {
    if (e.target.checked) {
      setAllChecked(true);
      for (let i = 0; i < JobCards.length; i++) {
        addToWorkOrderList(JobCards[i]);
      }
    } else {
      setAllChecked(false);
      setWorkOrderList([]);
    }
  };

  const addToWorkOrderList = (jobCard: VwAssetJobCard) => {
    if (
      WorkOrderList.filter((p) => p.workOrderId === jobCard.workOrderId)
        .length === 0
    ) {
      const newWorkOrderList = WorkOrderList;
      newWorkOrderList.push(jobCard);
      setWorkOrderList(newWorkOrderList);
    }
    console.log(WorkOrderList);
  };
  const removeFromWorkOrderList = (jobCard: VwAssetJobCard) => {
    const newWorkOrderList = WorkOrderList.filter(
      (p) => p.workOrderId !== jobCard.workOrderId
    );
    setWorkOrderList(newWorkOrderList);
  };
  const doMultipleJobCards = () => {
    if (WorkOrderList.length > 0) setShowMultipleModal(true);
  };
  const JobcardItemLoad = (c: any) => {
    props.UserLoad(c);
  };
  const AlertMessage = (m: any, t: MessageTypes) => {
    props.addMessage([{ msg: m, msgType: t }]);
  };

  const View1 = (
    <div>
      <div>
        {/* <div className="text-right caption-header">
          سرویس های دوره ای خودرو من
        </div> */}
      </div>
      <div className="w-100 text-right">
        <ul className="jobcard-list">
          {JobCards.filter(
            (p) => p.mroplanActive === true || p.mroplanActive === null
          ).map((item) => (
            <li key={item.jobCardId} className="jobcard-item">
              <JobCardItem
                {...{
                  showSwitch: true,
                  jobCardInfo: [item],
                  token: props.token as string,
                  RefreshJobCards: () => RefreshJobCards(),
                  hideModal: () => hideModal(),
                  AlertMessage: AlertMessage,
                  JobcardItemLoad: JobcardItemLoad,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="clearfix"></div>
      {JobCards &&
      JobCards.filter((p) => p.mroplanActive === false).length > 0 ? (
        <div className="text-right rtl">
          از این بخش میتوانید سرویس های دیگر را نیز انتخاب و فعال نمایید
        </div>
      ) : null}

      <div>
        <ul className="jobcard-list">
          {JobCards.filter((p) => p.mroplanActive === false).map((item) => (
            <li key={item.workOrderId} className="jobcard-item">
              {item.jobCardSign}
              <div className="toggle-container">
                <label className="Toggle_Switch">
                  <input
                    type="checkbox"
                    onChange={() =>
                      removeFromRejectedJobCards(
                        item.workOrderId,
                        item.jobCardId as string,
                        item.assetId as string
                      )
                    }
                  />
                  <span className="Toggle_Slider round"></span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="clearfix"></div>

      <div className="maintenance-buttons float-left">
        <button className="btn-green btn " onClick={() => submit()}>
          تایید و ادامه
        </button>
        <button className="btn-gray btn ">بازگشت</button>
      </div>
    </div>
  );

  const View2 = (
    <div>
      <div className="w-100 text-right table-responsive">
        <div className="row car-mt-th">
          <div className="col-lg-11 col-md-11  col-sm-11  col-xs-11 card-titr-service srv-car">
            <i className="fa fa-arrow-right" onClick={gotoCarServices}></i>
            <span onClick={gotoCarServices}>سرویس های دوره ای خودرو من</span>
          </div>
        </div>
        {/* <div className="row car-mt-th">
          <div className="col-lg-11 col-md-6  col-sm-6  col-xs-6">
            <i className="fa fa-arrow-right"></i>
            سرویس های دوره ای خودرو من
          </div>
          <div className="col-lg-1 col-md-6  col-sm-6  col-xs-6">
            {props.showCard === true ? (
              <span>
                <i
                  className="Carlist CarlistActive fa fa-th-large fa-1x"
                  aria-hidden="true"
                  onClick={handleShowCard}
                ></i>
                <i
                  onClick={handleShowList}
                  className="Carlist fa fa-list fa-1x"
                  aria-hidden="true"
                ></i>
              </span>
            ) : (
              <span>
                <i
                  className="Carlist fa fa-th-large fa-1x"
                  aria-hidden="true"
                  onClick={handleShowCard}
                ></i>
                <i
                  onClick={handleShowList}
                  className="Carlist CarlistActive fa fa-list fa-1x"
                  aria-hidden="true"
                ></i>
              </span>
            )}
          </div>
        </div> */}
        <table className="tbl-jobcards table">
          <thead>
            <tr className="FirstTR  car-mt-th3">
              <th scope="col-lg-1  col-xl-1">
                <img
                  src={require("../../img/mechanic.png")}
                  srcSet="/static/media/mechanic@2x.png 2x, /static/media/mechanic@3x.png 3x"
                  alt=""
                />
              </th>
              <th scope="col-lg-2 col-xl-2" className="caption-header">
                سرویس های دوره ای خودرو من
              </th>
              <th scope="col-lg-3 col-xl-3">
                <button
                  className="btn btn-All-done"
                  onClick={() => doMultipleJobCards()}
                >
                  همزمان انجام شدند
                </button>
              </th>
              <th scope="col-lg-1 col-xl-1"></th>
              <th scope="col-lg-1 col-xl-1"></th>
              <th scope="col-lg-1 col-xl-1"></th>
              <th scope="col-lg-1 col-xl-1"></th>
              <th scope="col-lg-1 col-xl-1"></th>
              <th scope="col-lg-1 col-xl-1"></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col-lg-1  col-xl-1">
                <input type="checkbox" onChange={(e) => checkUncheckAll(e)} />
              </th>
              <th scope="col-lg-2  col-xl-2">
                <span>نام سرویس</span>
              </th>
              <th scope="col-lg-3  col-xl-3">
                <span>کیلومتر انجام آخرین سرویس</span>
              </th>
              <th scope="col-lg-1  col-xl-1">
                <span>تاریخ</span>
              </th>
              <th scope="col-lg-1  col-xl-1">
                <span> کیلومتر انجام سرویس</span>
              </th>
              <th scope="col-lg-2  col-xl-2">
                <span> باقیمانده </span>
              </th>
              <th scope="col-lg-1  col-xl-1">
                <span> واحد</span> :
              </th>
              {/* <th>روزهای باقیمانده</th> */}
              <th scope="col-lg-1  col-xl-1">
                <span> وضعیت</span>
              </th>
              <th scope="col-lg-1  col-xl-1">
                {props.showCard === true ? (
                  <div>
                    <i
                      className="Carlist CarlistActive fa fa-th-large fa-2x"
                      aria-hidden="true"
                      onClick={handleShowCard}
                    ></i>
                    <i
                      onClick={handleShowList}
                      className="Carlist fa fa-list fa-2x"
                      aria-hidden="true"
                    ></i>
                  </div>
                ) : (
                  <div>
                    <i
                      className="Carlist fa fa-th-large fa-2x"
                      aria-hidden="true"
                      onClick={handleShowCard}
                    ></i>
                    <i
                      onClick={handleShowList}
                      className="Carlist CarlistActive fa fa-list fa-2x"
                      aria-hidden="true"
                    ></i>
                  </div>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {JobCards.map((item) => (
              <tr key={item.jobCardId}>
                <td>
                  {/* <input type="checkbox" defaultChecked={AllChecked} /> */}
                  <CheckboxItem
                    checked={AllChecked}
                    jobCard={item}
                    addToWorkOrderList={(jobCard: VwAssetJobCard) =>
                      addToWorkOrderList(item)
                    }
                    removeFromWorkOrderList={(jobCard: VwAssetJobCard) =>
                      removeFromWorkOrderList(item)
                    }
                  />
                </td>
                <td className="CarServicesTitle">{item.jobCardSign}</td>
                <td className="CarServicesTitle">{item.latestJobCardUsage}</td>
                <td className="CarServicesTitle">{item.latestJobCardTime}</td>
                <td className="CarServicesTitle">{item.usageAmount}</td>
                <td
                  className={
                    item.planTitleCode.toUpperCase() === "U"
                      ? "remain-usage " + getClCard(item.remainJcusage)
                      : "remain-usage " + getClCard(item.remainJcday)
                  }
                >
                  {item.planTitleCode.toUpperCase() === "U"
                    ? changeEnc(item.remainJcusage+"")
                    : item.planTitleCode.toUpperCase() === "T"
                    ? changeEnc(item.remainJcday+"")
                    : null}
                </td>
                <td
                  className={
                    "CarServicesTitle" +
                    getColor(item.value, item.remainJcusage)
                  }
                >
                  {item.planTitleCode.toUpperCase() === "U"
                    ? "کیلومتر"
                    : item.planTitleCode.toUpperCase() === "T"
                    ? "روز"
                    : null}
                </td>
                {/* <td
                 className={
                   "remain-usage " + getColor(item.value, item.remainJcday)
                 }
               >
                 {changeEnc(item.remainJcday.toString())}
               </td> */}
                <td>
                  <span
                    className={
                      item.planTitleCode.toUpperCase() === "U"
                        ? "Car-Col-Card-Circle2 " +
                          getColorCard2(item.remainJcusage)
                        : "Car-Col-Card-Circle2 " +
                          getColorCard2(item.remainJcday)
                    }
                  ></span>
                  {item.planTitleCode.toUpperCase() === "U" &&
                  item.remainJcusage < 0 ? (
                    <img
                      className="Car-Card_Ambulance2"
                      src={require("../../img/ambulance.png")}
                      srcSet="/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x"
                      alt=""
                    />
                  ) : item.planTitleCode.toUpperCase() === "T" &&
                    item.remainJcday < 0 ? (
                    <img
                      className="Car-Card_Ambulance2"
                      src={require("../../img/ambulance.png")}
                      srcSet="/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x"
                      alt=""
                    />
                  ) : (
                    <span></span>
                  )}

                  {/* {item.remainJcusage < 0 ? (
                    <div className="ambulance">
                      <img
                        src={require("../../img/ambulance.png")}
                        srcSet="/static/media/ambulance@2x.png 2x, /static/media/ambulance@3x.png 3x"
                        alt=""
                      />
                    </div>
                  ) : null}
                  <div className="gradiant">
                    <div
                      style={{
                        left: getPosition(item.value, item.remainJcusage),
                      }}
                      className={"indikator"}
                    ></div>
                  </div> */}
                </td>
                <td>
                  <button
                    className="btn btn-done"
                    onClick={() => {
                      setCurrentJobCard(item);
                      setshowModal(true);
                    }}
                  >
                    انجام شد
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="clearfix"></div>
    </div>
  );
  const View3 = (
    <div>
      {props.showCard === true ? (
        <div className="cardlist">
          <i
            className="Carlist CarlistActive fa fa-th-large fa-2x"
            aria-hidden="true"
            onClick={handleShowCard}
          ></i>
          <i
            onClick={handleShowList}
            className="Carlist fa fa-list fa-2x"
            aria-hidden="true"
          ></i>
        </div>
      ) : (
        <div>
          <i
            className="Carlist fa fa-th-large fa-2x"
            aria-hidden="true"
            onClick={handleShowCard}
          ></i>
          <i
            onClick={handleShowList}
            className="Carlist CarlistActive fa fa-list fa-2x"
            aria-hidden="true"
          ></i>
        </div>
      )}
      {/* <div className="row Car-Card_Container">
        <div className="col-lg-1">
          <img
            src={require("../../img/mechanic.png")}
            srcSet="/static/media/mechanic@2x.png 2x, /static/media/mechanic@3x.png 3x"
            alt=""
          />
        </div>
        <div className="col-lg-3 caption-header">
          سرویس های دوره ای خودرو من
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-1"></div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4"></div>
        <div className="col-lg-1">
          {" "}
          {props.showCard === true ? (
            <div>
              <i
                className="Carlist CarlistActive fa fa-th-large fa-2x"
                aria-hidden="true"
                onClick={handleShowCard}
              ></i>
              <i
                onClick={handleShowList}
                className="Carlist fa fa-list fa-2x"
                aria-hidden="true"
              ></i>
            </div>
          ) : (
            <div>
              <i
                className="Carlist fa fa-th-large fa-2x"
                aria-hidden="true"
                onClick={handleShowCard}
              ></i>
              <i
                onClick={handleShowList}
                className="Carlist CarlistActive fa fa-list fa-2x"
                aria-hidden="true"
              ></i>
            </div>
          )}
        </div>
      </div> */}
      <div className="row Car-Card_Container2">
        {JobCards.map((item) => (
          <div
            className={
              item.planTitleCode.toUpperCase() === "U"
                ? "col-lg-3 Car-Card " + getColorBorder(item.remainJcusage)
                : "col-lg-3 Car-Card " + getColorBorder(item.remainJcday)
            }
            key={item.jobCardId}
          >
            <div className="Car-Card-Item">
              <span
                className="Car-Card-Item-Sp3"
                data-toggle="tooltip"
                title={item.jobCardSign}
              >
                {item.jobCardSign}
              </span>

              {item.planTitleCode.toUpperCase() === "U" &&
              item.remainJcusage < 0 ? (
                <img
                  className="Car-Card_Ambulance"
                  src={require("../../img/ambulance.png")}
                  srcSet="/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x"
                  alt=""
                />
              ) : item.planTitleCode.toUpperCase() === "T" &&
                item.remainJcday < 0 ? (
                <img
                  className="Car-Card_Ambulance"
                  src={require("../../img/ambulance.png")}
                  srcSet="/static/media/ambulance(1)@2x.png 2x, /static/media/ambulance(1)@3x.png 3x"
                  alt=""
                />
              ) : (
                <span></span>
              )}

              <div
                className={
                  item.planTitleCode.toUpperCase() === "U"
                    ? "Car-Col-Card-Circle " + getColorCard(item.remainJcusage)
                    : "Car-Col-Card-Circle " + getColorCard(item.remainJcday)
                }
              ></div>
            </div>

            <div className="Car-Card-Item">
              <span className="Car-Card-Item-Sp4"> انجام آخرین سرویس :</span>
            </div>

            <div className="Car-Card-Item">
              <span className="Car-Card-Item-Sp5">
                {changeEnc(
                  item.latestJobCardUsage
                    ? item.latestJobCardUsage.toString()
                    : ""
                )}
                <img
                  src={require("../../img/dashboard.png")}
                  srcSet="/static/media/dashboard(1)@2x.png 2x, /static/media/dashboard(1)@3x.png 3x"
                  alt=""
                />
              </span>
              <span className="Car-Card-Item-Sp5">
                {changeEnc(
                  item.latestJobCardTime ? item.latestJobCardTime : ""
                )}
                <img
                  src={require("../../img/calendar(1).png")}
                  srcSet="/static/media/calendar(1)@2x.png 2x, /static/media/calendar(1)@3x.png 3x"
                  alt=""
                />
              </span>
            </div>
            <div className="Car-Card-Item">
              <span className="Car-Card-Item-Sp6">باقیمانده </span>
              <span className="Car-Card-Item-Sp2">
                {item.planTitleCode.toUpperCase() === "U" ? (
                  <>
                    <span className="float-left">&nbsp;کیلومتر&nbsp;</span>
                    <span className="float-left ltr">
                      {formatAndEncCurrency(
                        changeEnc(item.remainJcusage+"")
                      )}
                      &nbsp;
                    </span>
                  </>
                ) : item.planTitleCode.toUpperCase() === "T" ? (
                  <>
                    <span className="float-left">&nbsp;روز&nbsp;</span>
                    <span className="float-left ltr">
                      {changeEnc(item.remainJcday+"")}&nbsp;
                    </span>
                  </>
                ) : null}
              </span>
            </div>
            <div className="Car-Card-Item">
              <button
                className="Car-Card-Item-Button"
                onClick={() => {
                  setCurrentJobCard(item);
                  setshowModal(true);
                }}
              >
                انجام شد
              </button>
            </div>
          </div>
        ))}
        {/* <div className="col-lg-3 Car-Card">
          <div className="Car-Card-Item">
            <span className="Car-Card-Item-Sp3">تعویض فیلتر هوا</span>
            <div className="Car-Col-Card-Circle"></div>
          </div>
          <div className="Car-Card-Item">
            <span className="Car-Card-Item-Sp4">انجام آخرین سرویس</span>
          </div>
          <div className="Car-Card-Item">
            <span className="Car-Card-Item-Sp5">121.000
            <img
                src={require("../../img/dashboard.png")}
                srcSet="/static/media/dashboard(1)@2x.png 2x, /static/media/dashboard(1)@3x.png 3x"
                alt=""
              />
            </span>
            <span className="Car-Card-Item-Sp5">
              1399/01/10
              <img
                src={require("../../img/calendar(1).png")}
                srcSet="/static/media/calendar(1)@2x.png 2x, /static/media/calendar(1)@3x.png 3x"
                alt=""
              />
            </span>
          </div>
          <div className="Car-Card-Item">
            <span className="Car-Card-Item-Sp6">باقیمانده (روز/کیلومتر)</span>
            <span className="Car-Card-Item-Sp2">4700 KM</span>
          </div>
          <div className="Car-Card-Item">
            <button className="Car-Card-Item-Button">انجام شد</button>
          </div>
        </div> */}
      </div>
    </div>
  );
  const ViewCar = (
    <div className="car-info-side row">
      {carList.map((c: VwCar) => (
        <div
          key={c.id}
          onClick={() => gotoCar(c.id as string)}
          className={
            c.id === carId
              ? "Car-Col  col-lg-12"
              : "Car-Col disbaled-component  col-lg-12"
          }
        >
          <div className="Car-Col-Card">
            <div className="Car_Row ">
              <div className="lable-mycard-cap1">
                <div className="Car-Img">
                  <img alt={""} src={require("../img/../../img/plak.png")} />

                  <span className="plk1">
                    {changeEnc(c.pelak1 ? c.pelak1.toString() : "")}
                  </span>
                  <span className="plk2">
                    {changeEnc(c.pelak2 ? c.pelak2.toString() : "")}
                  </span>
                  <span className="plk3">
                    {changeEnc(c.pelakSign ? c.pelakSign.toString() : "")}
                  </span>
                  <span className="plk4">
                    {changeEnc(c.pelak3 ? c.pelak3.toString() : "")}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center car-container">
              <Image
                fallbackSrc={APIImage + "/car.png"}
                alt={""}
                src={APIImage + "/" + c.imageProduct}
              />
            </div>
            <div className="line-100"></div>
            <p className="carSign">
              {c.sign} {c.year}
            </p>

            <div className="mt-2">
              <div className="float-right lable">
                <img
                  className="icon"
                  src={require("../../img/letter.png")}
                  alt=""
                />
                یادآوری سرویس های دوره ای
              </div>
              <div className="float-left ltr">
                <label className="Toggle_Switch">
                  <input type="checkbox" />
                  <span className="Toggle_Slider round"></span>
                </label>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="mt-2">
              <div className="float-right lable">
                <img
                  className="icon"
                  src={require("../../img/gage.png")}
                  alt=""
                />
                کیلومتر خودرو
              </div>
              <div className="float-left ltr lable">
                {changeEnc(c.latestUsage.toString())}&nbsp;Km
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="mt-2">
              <div className="float-right lable">
                <img
                  className="icon"
                  src={require("../../img/calendar.png")}
                  alt=""
                />
                تاریخ امروز
              </div>
              <div className="float-left ltr lable">{curDate}</div>
            </div>
            <div className="clearfix"></div>

            {View === 2 ? (
              <div className=" form-group mt-3">
                {UsageSaved ? (
                  <div>
                    <div className="green-box">
                      کیلومتر امروز خودرو شما ثبت شد
                    </div>
                    {/* {!EditUsage ? (
                    <div>
                      <button
                        className="btn-save-car btn "
                        data-id={c.id}
                        onClick={() => {
                          setUsageSaved(false);
                          setEditUsage(true);
                        }}
                      >
                        ویرایش کیلومتر امروز
                      </button>
                    </div>
                  ) : null} */}
                  </div>
                ) : (
                  <div>
                    <div className={"plfield "}>
                      <input
                        type="text"
                        placeholder=" "
                        disabled={c.id !== carId}
                        autoComplete="off"
                        title="لطفا فیلد کیلومتر فعلی خودرو  را وارد کنید"
                        required
                        onChange={(e) => handleUsage(e)}
                        onBlur={() => checkUsage()}
                        className={
                          "form-control ltr-control txt-mobile " +
                          (ErrorUsage === "" ? "pl-input" : "pl-input-error")
                        }
                      />
                      <span className="grow">کیلومتر فعلی خودرو </span>
                      <i className="icon-tachometer fa fa-tachometer"></i>
                    </div>
                    {EditUsage ? (
                      <span className="edit-usage-alert">
                        در هر روز تنها 1 بار اصلاح کیلومتر ثبت شده امکانپذیر
                        است.
                      </span>
                    ) : null}

                    <div>
                      <button
                        className={
                          c.id === carId
                            ? "btn-save-car btn "
                            : "btn-save-car gray btn "
                        }
                        disabled={c.id !== carId}
                        data-id={c.id}
                        onClick={() =>
                          saveUsage(c.id as string, EditUsage as boolean)
                        }
                      >
                        ذخیره
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="Maintenance ">
      {CurrentJobCard !== undefined ? (
        <Modal
          size="xl"
          show={showModal}
          onHide={() => setshowModal(false)}
          className={"modal-jobcard"}
        >
          <Modal.Header>
            <Modal.Title>
              {(CurrentJobCard as VwAssetJobCard).jobCardSign}
            </Modal.Title>
            <FontAwesomeIcon
              icon={faWindowClose}
              color="gray"
              size="lg"
              onClick={() => setshowModal(false)}
            />
          </Modal.Header>
          <Modal.Body>
            <JobCardItem
              {...{
                showSwitch: false,
                jobCardInfo: [CurrentJobCard as VwAssetJobCard],
                token: props.token as string,
                RefreshJobCards: () => RefreshJobCards(),
                hideModal: () => hideModal(),
                AlertMessage: AlertMessage,
                JobcardItemLoad: JobcardItemLoad,
              }}
            />
          </Modal.Body>
        </Modal>
      ) : null}

      {WorkOrderList.length > 0 ? (
        <Modal
          size="xl"
          show={ShowMultipleModal}
          onHide={() => setShowMultipleModal(false)}
          className={"modal-jobcard"}
        >
          <Modal.Header>
            <Modal.Title>سرویس های همزمان :</Modal.Title>
            <FontAwesomeIcon
              icon={faWindowClose}
              color="gray"
              size="lg"
              onClick={() => setShowMultipleModal(false)}
            />
          </Modal.Header>
          <Modal.Body>
            <JobCardItem
              {...{
                showSwitch: false,
                jobCardInfo: WorkOrderList,
                token: props.token as string,
                RefreshJobCards: () => RefreshJobCards(),
                hideModal: () => hideModal(),
                AlertMessage: AlertMessage,
                JobcardItemLoad: JobcardItemLoad,
              }}
            />
          </Modal.Body>
        </Modal>
      ) : null}

      <div className="rtl maintenance-card">
      <div className="text-center caption-header">
            {
              <li
                onClick={() =>
                  props.history.push({ pathname: "/user/panel" })
                }
                className="fa fa-arrow-right back-arrow"
              ></li>
            }
            سرویس های دوره ای
          </div>
        <div className="row">
          <div className="col-lg-2 col-md-6 col-xs-12 col-xl-2  col-cars-show2">
            {ViewCar}
          </div>
          <div className="col-lg-10 col-md-6 col-xs-12 col-xl-9">
            <div>
              {props.showCard === false ? null : (
                <div className="row car-mt-th2 ">
                  <div className="col-lg-11 col-md-11  col-sm-11  col-xs-11 srv-car">
                    <i
                      className="fa fa-arrow-right"
                      onClick={gotoCarServices}
                    ></i>
                    <span onClick={gotoCarServices}>
                      سرویس های دوره ای خودرو من
                    </span>
                  </div>
                </div>
              )}
            </div>
            {View === 1 ? View1 : null}
            {View === 2 ? View2 : null}
            {View === 3 ? View3 : null}
          </div>
          <div className="col-lg-2 col-md-6 col-xs-12 col-xl-1 col-cars-show">
            {ViewCar}
          </div>
        </div>
        <div className="w-100 text-center"></div>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(CarMaintenance as any);
