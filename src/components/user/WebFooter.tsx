import React, {  useRef, useState } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import Chat from "../../containers/User/Chat";
import { APIUrl, GetIP4 } from "../../helper/config";
import { VwUserNews } from "../../model/viewModel/VwUserNews";
import { responseModel } from "../../model/general/responseModel";
import { MessageTypes } from "../../model/general";
import { useEffect } from "react";
import { VwSeacrh } from "../../model/viewModel/VwSeacrh";
import HomeTools from "./HomeTools";

type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}>;
export interface NewsState {
  email?: any;
  enableSend?: boolean;
}
function useOutsideAlerter(ref: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        $("#EmailNews").hide();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const WebFooter = (props: InputProps) => {
  const [ChatVisible, ] = useState(false);
  const [EmailValue, SetEmailValue] = useState<NewsState>({
    email: "",
    enableSend: undefined,
  });
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  // function showChat() {
  //     setChatVisible(true)
  // }

  const setEmailVal = async (e: any) => {
     // if (e.currentTarget.value) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.currentTarget.value)) {
      await SetEmailValue({ enableSend: true, email: e.currentTarget.value });
    } else {
      $("#EmailNews").show();
      await SetEmailValue({ enableSend: false, email: e.currentTarget.value });
    }
    //  await   SetEmailValue({
    //       enableSend: undefined,
    //       email: e.currentTarget.value,
    //     });
    //     return;
    // }
  };

  async function EmailValidation(e: any) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.currentTarget.value)) {
      await SetEmailValue({ enableSend: true, email: e.currentTarget.value });
    } else {
      $("#EmailNews").show();
      await SetEmailValue({ enableSend: false, email: e.currentTarget.value });
    }
  }
  function SendEmailHandler(e: any) {
    props.UserLoad(true);
    var data: VwUserNews = {
      email: EmailValue.email,
      personId: props.personId,
    };
    fetch(APIUrl + "/Contact/SaveMembership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Success },
          ]);
          SetEmailValue({ email: "", enableSend: undefined });
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.addMessage([]);
        props.addMessage([
          { msg: "???????? ???? ???????????????? ???????? ????????????", msgType: MessageTypes.Error },
        ]);
        SetEmailValue({ email: "", enableSend: undefined });
        props.UserLoad(false);
      });
  }
  const SaveSearch = (data: any) => {
    fetch(APIUrl + "/ProductSearch/SaveSearchAndClick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: "Fa",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          if (responseModel.data) {
          }
        }
      })
      .catch((error) => {
        console.log(error);
        props.UserLoad(false);
      });
  };
  function clickHandler(e: any) {
    e.stopPropagation();
    let code = e.currentTarget.dataset.code;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let dt: VwSeacrh = {
      id: id,
      code: code,
      mid: "",
      mName: "",
      name: name,
      type: "CATEGORY",
    };

    GetIP4()
      .then((ip: any) => {
        let data = {
          categoryId: id,
          searchText: name,
          userId: props.userId,
          createUserID: props.userId,
          clicked: true,
          isActive: true,
          IP: ip,
        };
        SaveSearch(data);
      })
      .catch((res) => {});
    props.Search(dt);
    props.UserLoad(true);
  }
  const backtoupHandler=(e:any)=>{
    window.scrollTo(0, 0);
  }
  //    componentDidMount() {
  // if (projectStrong.info.url && projectStrong.info.token && this.props.controller && this.props.action) {

  //     fetch(projectStrong.info.url +'/'+ this.props.controller + '/' + this.props.action + '?lang=', {
  //         method: 'GET',
  //         headers: {
  //             'Authorization': 'Bearer ' + projectStrong.info.token,
  //             // 'Content-Type': 'application/json;charset=UTF-8',
  //         }
  //     })
  //         .then(response => response.json() as responseModel | any)
  //         .then(mr => {
  //             if ((mr as responseModel).messageCode === 0) {
  //                 var data = (mr as responseModel).data;
  //             }
  //         });
  // }
  //    }

  return (
    <div className='footer'>
       <div className="row ">
            <div className="col-12 backToUpdiv">
              <button className="btn backToUp" onClick={backtoupHandler}>
                <img alt='' src={require('../../img/Group 556.png') } />
              </button>
            </div>
          </div>
      <div className="container autochar-features">
        <HomeTools {...{ props: props }} />
      </div>
      <div className="footer-container">
        {ChatVisible ? <Chat {...{ joinUserId: null }} /> : null}

        <div className="Web_Footer">
          <div className="container">
            {/* <div className="row">
            <div className="col-12 backToUp">?????????? ???? ????????</div>
          </div> */}
            <div className="row">
              <div className="col-lg-3 col-xs-12">
                <ul>
                  <li className="li-Footer">
                    <NavLink tag={Link} className="footer-link" to={"/aboutus"}>
                      ???????????? ????
                    </NavLink>
                  </li>
                  <hr className="hr-footer" />
                  <div className="aboutus-desc">
                    ???????????? ?????????? ???? ?????????? ???????? ???????????? ?????????? ?????????? ?????? ????
                    {"        "} ?????????? ?????? ????????{" "}
                    <a href="http://www.tpha.ir">???? ?????????? ???????????? ??????????</a> ?????? .
                    ?????????? ?? ?????? ???????? ?? ???????? ???????????? ?????? ?????????????? ???????????? ???????? ??????
                    ???? ?????????? ???? ???? ?????????? ?????????????? ?????? ???? ?????? ?? ???????????? ???? ??????
                    ?????????? ?????????? ???????? ?? ???????? ???? ?????? ????????????.
                  </div>
                </ul>
              </div>
              <div className="col-lg-1 col-6 ">
                <ul>
                  {/* <li className="li-Footer">
                  ???????????? ????????
                  </li> */}
                  <li className="li-Footer">
                    <NavLink
                      tag={Link}
                      className="footer-link"
                      to={"/contactus"}
                    >
                      ???????? ????????
                    </NavLink>
                  </li>

                  <hr className="hr-footer" />

                  {/* <li className="qaccess li-Footer">
                  <NavLink
                    tag={Link}
                    className="footer-link"
                    to={"/Asset/Category/" + "?????????? ??????????".replace(/\s+/g, "-")}
                    onClick={clickHandler}
                    data-code="152"
                    data-id="b4a7bd5c-8ce2-4380-a647-9a9434b55b18"
                    data-name="?????????? ??????????"
                  >
                    ?????????? ?????????? ??????????
                  </NavLink>
                </li>
                <li className="qaccess li-Footer">
                  <NavLink
                    tag={Link}
                    className="footer-link"
                    to={"/Asset/Category/" + "?????????? ????????".replace(/\s+/g, "-")}
                    onClick={clickHandler}
                    data-code="218"
                    data-id="f37bd96e-bade-43b8-8610-cef8532bc3f0"
                    data-name="?????????? ????????"
                  >
                    ?????????? ???????? ??????????
                  </NavLink>
                </li>
                <li className="qaccess li-Footer">
                  <NavLink
                    tag={Link}
                    className="footer-link"
                    to={
                      "/Asset/Category/" +
                      "?????????? ?????????? - ??????????????".replace(/\s+/g, "-")
                    }
                    onClick={clickHandler}
                    data-code="201"
                    data-id="5fc44225-9b01-497f-9100-c2d9be81811d"
                    data-name="?????????? ?????????? - ??????????????"
                  >
                    ?????????????? ??????????
                  </NavLink>
                </li> */}
                  {/* <li className="qaccess li-Footer">
                  <NavLink tag={Link} className="footer-link" to={"/contactus"}>
                    ???????? ???? ????
                  </NavLink>
                </li>
                <li className="qaccess li-Footer">
                  <NavLink
                    tag={Link}
                    className="footer-link"
                    to={"/user/career"}
                  >
                    ???????????? ???? ????
                  </NavLink>
                </li> */}
                </ul>
              </div>

              <div className="col-lg-1 col-6 ">
                <ul>
                  {/* <li className="li-Footer">?????????? ????????????????</li> */}
                  <li className="li-Footer">
                    <NavLink
                      tag={Link}
                      className="footer-link"
                      to={"/user/faq"}
                    >
                      ???????????? ????????????
                    </NavLink>
                  </li>
                  <hr className="hr-footer" />
                  {/* <li className="qaccess li-Footer">
                  <NavLink tag={Link} className="footer-link" to={"/user/faq"}>
                    ???????? ?? ????????
                  </NavLink>
                </li> */}
                  {/* <li className="qaccess li-Footer">
                                        <NavLink tag={Link} className="footer-link" to={"/user/aboutus"}>
                                            ?????? ???????? ??????
                                </NavLink>
                                    </li> */}
                  {/* <li className="qaccess li-Footer">
                  <NavLink
                    tag={Link}
                    className="footer-link"
                    to={"/user/terms"}
                  >
                    ?????????? ?? ??????????
                  </NavLink>
                </li> */}
                </ul>
              </div>
              <div className="col-lg-1 col-6 ">
                <ul>
                  <li className="li-Footer">
                    <NavLink tag={Link} to='#' className="footer-link">
                      ???????? ???? ????
                    </NavLink>
                  </li>
                  <hr className="hr-footer" />
                </ul>
              </div>

              <div className="col-lg-6 col-xs-12">
                <div>
                  <div className=" float-left social-icons">
                    <div>
                      <a
                        href="https://www.linkedin.com/company/autochar/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Linkedin"
                      >
                        <img src={require("../../img/linkedin.png")} alt="" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/user/wordpress"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Youtube"
                      >
                        <img src={require("../../img/youtube.png")} alt="" />
                      </a>
                    </div>

                    <div>
                      <a
                        href="https://www.instagram.com/accounts/login/?next=/autochar.project/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <img src={require("../../img/instagram.png")} alt="" />
                      </a>
                    </div>

                    <div>
                      <a
                        href="https://t.me/autochar7project"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                      >
                        <img src={require("../../img/telegram.png")} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="newsletter-caption">
                  ???????? ?????????? ???? ?????????? ?????????? ?? ?????????????? ???????? ?????????? ???????????? ???? ????????
                  ????????
                </div>
                <div className="newsforEmail">
                  {EmailValue.enableSend === false ? (
                    <span
                      id="EmailNews"
                      ref={wrapperRef}
                      className="tooltipemail"
                    >
                      ???????? ?????????? ???????????? ??????
                    </span>
                  ) : null}
                  <img
                    src={require("../../img/mail.png")}
                    alt="newsletter"
                    className="mail-blandy"
                  />
                  <input
                    type="email"
                    placeholder="???????? ???????????????? ???? ???????? ????????"
                    className={
                      "Text_News " +
                      (EmailValue.enableSend === true ? "" : "email-error")
                    }
                    onChange={setEmailVal}
                    onBlur={EmailValidation}
                    value={EmailValue.email}
                  ></input>

                  {/* <button className="btn btn_News_footer btn_News_footer-ds" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button> */}
                  <button
                    className={
                      EmailValue.enableSend === undefined ||
                      EmailValue.enableSend === false
                        ? "btn btn_News_footer btn_News_footer-ds"
                        : "btn btn_News_footer"
                    }
                    disabled={
                      EmailValue.enableSend === undefined ||
                      EmailValue.enableSend === false
                        ? true
                        : false
                    }
                    onClick={SendEmailHandler}
                  >
                    ?????? ??????????
                  </button>
                </div>

                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <span className="logo-samandehi-span1 text-center">
                      <img
                        id="nbqeesgtsizpjzpefukzoeuk"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            "https://logo.samandehi.ir/Verify.aspx?id=209768&p=uiwkobpdpfvljyoegvkamcsi",
                            "Popup",
                            "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                          )
                        }
                        alt="logo-samandehi"
                        src="https://logo.samandehi.ir/logo.aspx?id=209768&p=odrflymabsiyyndtwlbqaqgw"
                      />
                    </span>
                    <span className="logo-samandehi-span2 text-center">
                      <a
                        referrerPolicy="origin"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://trustseal.enamad.ir/?id=192566&amp;Code=AGxrdAQESfCnpYlyqINX"
                      >
                        <img
                          src="https://Trustseal.eNamad.ir/logo.aspx?id=192566&amp;Code=AGxrdAQESfCnpYlyqINX"
                          alt=""
                          style={{ cursor: "pointer" }}
                          id="AGxrdAQESfCnpYlyqINX"
                        />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 
          <hr className="hr-footer-line" /> */}
            <div className="footer-botoom-line">
              {/* <div className="Web_Footer_Item-CopyRight"> */}
              <label className="CopyRight">
                ?????????? ???????? ?????????? ????{" "}
                <a target="_blank" rel="noopener noreferrer" href="http://www.tpha.ir">
                  ???? ?????????? ???????????? ??????????
                </a>{" "}
                ???? ????????.1399{" "}
              </label>
            </div>
            <div className="clearfix"></div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(WebFooter as any);
