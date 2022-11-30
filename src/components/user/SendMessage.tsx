import React, { Component } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectData } from "../../model/general/selectData";
import Select from "react-select";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
export interface MessageProps {
  controller: string;
  action: string;
  header: string;
}
type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> &
  MessageProps;
interface mystate {
  value: number;
  subjects: selectData[];
  subjectId: string;
  text?: string;
  Send: boolean;
  Error: boolean;
}
class SendMessage extends Component<InputProps, mystate> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 1,
      subjects: [],
      subjectId: "",
      Send: false,
      Error: false,
    };
  }
  async componentDidMount() {
    fetch(
      APIUrl + "/HCChatTitle/GetHCListForUser?lang=" + this.props.lang.abr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          this.setState({ subjects: responseModel.data, Send: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleText = (event: any) => {
    this.setState({ text: event.currentTarget.value });
  };
  handleSend = () => {
    console.log(this.state.text);
    if (this.state.text === undefined || this.state.text === "") {
      this.setState({ Error: true });
      return;
    }
    if (this.state.subjectId === undefined || this.state.subjectId === "") {
      this.setState({ Error: true });
      return;
    }

    var data = {
      sign: this.state.text,
      hcchatTitle: this.state.subjectId,
      userId: this.props.userId,
    };
    fetch(APIUrl + "/Chat/SaveMessageBoxForUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        let resmsg = responseModel as responseModel;
        if (resmsg.messageCode === 0) {
          this.setState({
            subjectId: "",
            Error: false,
            Send: false,
            text: "",
            value: 3,
          });
        } else {
          this.setState({
            subjectId: "",
            Error: false,
            Send: false,
            text: "",
            value: 4,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // const res = fetchData<responseModel>(APIUrl + '/Chat/SaveMessageBoxForUser', 'POST', this.props, false, data, this.props.token, undefined, 'fa');

    // res.then(rm => {

    //     if (rm) {
    //         let resmsg = rm as responseModel;
    //         if (resmsg.messageCode === 0) {
    //             this.setState({ subjectId: '', Error: false, Send: false, text: '', value: 3 });
    //         }
    //         else {
    //             this.setState({ subjectId: '', Error: false, Send: false, text: '', value: 4 });
    //         }

    //     }

    // })
  };
  handleSubject = (event: any) => {
    this.setState({ subjectId: event.value });
  };
  handleHideAlert = () => {
    this.setState({
      subjectId: "",
      Error: false,
      Send: false,
      text: "",
      value: 0,
    });
  };
  handleShowMessageBox = () => {
    this.setState({
      subjectId: "",
      Error: false,
      Send: false,
      text: "",
      value: 2,
    });
  };
  handleShowMessageBoxClose = () => {
    this.props.showContact(false);
  };
  render() {
    const View1 = (
      <div className="overlayMessageBox">
        <div className="MessageBox-Modal">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-1">
                  <div
                    className="SendMessageBoxClose2"
                    onClick={this.handleShowMessageBoxClose}
                  ></div>
                </div>
                <div className="col-lg-11">
                  <p className="MessageBox-Modal-Row-Paraph">
                    تماس با پشتیبانی
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11">
                  <div className="row">
                    <div className="col-lg-1 MessageBox-Modal-Row"></div>
                    <div className="col-lg-3 MessageBox-Modal-Row">
                      <div className="row">
                        <div className="col-lg-6 col-md-5   ">
                          <div className="MBX-Img">
                            <img
                              src={require("../../img/Untitled-1.png")}
                              className="img-fluid"
                              srcSet="/static/media/Untitled-1.png 2x, /static/media/Untitled-1.png 3x"
                              alt="Message Box"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-5  ">
                          <p className="MessageBox-Modal-Row-InParaph">
                            تماس تلفنی
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 MessageBox-Modal-Row">
                      <div className="row">
                        <div className="col-lg-6 col-md-5">
                          <div className="MBX-Img">
                            <img
                              src={require("../../img/539227.png")}
                              className="img-fluid"
                              srcSet="/static/media/539227.png 2x, /static/media/539227.png 3x"
                              alt="Message Box"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                          <p
                            className="MessageBox-Modal-Row-InParaph"
                            onClick={this.handleShowMessageBox}
                          >
                            ارسال پیام
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 MessageBox-Modal-Row">
                      <div className="row">
                        <div className="col-lg-6 col-md-5">
                          <div className="MBX-Img">
                            <img
                              src={require("../../img/Untitled-1.png")}
                              className="img-fluid"
                              srcSet="/static/media/Untitled-1.png 2x, /static/media/Untitled-1.png 3x"
                              alt="Message Box"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                          <p className="MessageBox-Modal-Row-InParaph">
                            <div
                              onClick={() => {
                                this.props.showContact(false);
                                this.props.showChat(true);
                              }}
                            >
                              چت آنلاین
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 MessageBox-Modal-Row"></div>
                  </div>
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </div>
          {/* <div className="MessageBox-Modal-Row2">
                        <div className="SendMessageBoxClose2" onClick={this.handleShowMessageBoxClose}></div>
                        <p className="MessageBox-Modal-Row-Paraph">تماس با پشتیبانی</p>
                    </div>
                    <div className="MessageBox-Modal-Row">
                        <div>
                            <img src={require("../../img/Untitled-1.png")} className="img-fluid"
                                srcSet="/static/media/Untitled-1.png 2x, /static/media/Untitled-1.png 3x" alt="Message Box" />
                        </div>


                        <div>
                            <img src={require("../../img/539227.png")} className="img-fluid"
                                srcSet="/static/media/539227.png 2x, /static/media/539227.png 3x" alt="Message Box" />
                        </div>

                        <div>
                            <img src={require("../../img/Untitled-1.png")} className="img-fluid"
                                srcSet="/static/media/Untitled-1.png 2x, /static/media/Untitled-1.png 3x" alt="Message Box" />
                        </div>

                    </div>
                    <div className="MessageBox-Modal-Row">
                        <div>
                            <p className="MessageBox-Modal-Row-InParaph">
                                تماس تلفنی
                                    </p>
                        </div>


                        <div>
                            <p className="MessageBox-Modal-Row-InParaph" onClick={this.handleShowMessageBox}>
                                ارسال پیام
                                    </p>
                        </div>

                        <div>
                            <p className="MessageBox-Modal-Row-InParaph">
                                <div onClick={() => { this.props.showContact(false); this.props.showChat(true) }  }>
                                    چت آنلاین
                                    </div>
                            </p>
                        </div>
                    </div> */}
        </div>
      </div>
    );
    const View2 = (
      <div className="overlayMessageBox">
        <div className="MessageBox-SendModal">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="SendMessageBoxClose"
                onClick={this.handleShowMessageBoxClose}
              ></div>
            </div>
            <div className="col-lg-12">
            <p className="SendMessageBoxTitr">
                ارسال پیام
                <img
                  src={require("../../img/539227.png")}
                  className="img-fluid"
                  srcSet="/static/media/539227@2x.png 2x"
                  alt="Message Box"
                />
              </p>
              </div>
            <div className="col-lg-12">
              {/* <p className="SendMessageBoxTitr">
                ارسال پیام
                <img
                  src={require("../../img/539227.png")}
                  className="img-fluid"
                  srcSet="/static/media/539227@2x.png 2x"
                  alt="Message Box"
                />
              </p> */}
              <div className="section-header-Msg">
                <i className="fa fa-arrow-right"></i>پیام های من{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <Select
                  className="ddProvinces SendMessageBoxSubject"
                  required
                  onChange={this.handleSubject}
                  placeholder={"دسته بندی موضوعات"}
                  value={this.state.subjects.filter(
                    (option) => option.value === this.state.subjectId
                  )}
                  options={this.state.subjects}
                />
              </div>
              {/* <ShowMessage msg={this.state.msgProvince} /> */}
            </div>

            <div className="col-lg-12">
              <div className="form-group w-100">
                <div className="plfield ">
                  <textarea
                    value={this.state.text}
                    onChange={this.handleText}
                    placeholder="متن پیام"
                    rows={5}
                    title=""
                    required
                    className="form-control MessageBoxText"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-7 col-md-6  col-sm-5">
                  {this.state.Error === true ? (
                    <div className="col-lg-8 MessageBoxModalErrorRow">
                      <span className="MessageBoxModalError">
                        .پر کردن این قسمتها الزامی است
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="col-lg-5 col-md-6  col-sm-5">
                  <button
                    className="btn MessageBoxSendButtonModalGray"
                    onClick={this.handleSend}
                    disabled={this.state.Send}
                  >
                    {" "}
                    ارسال پیام
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const View3 = (
      <div className="overlayMessageBox">
        <div className="MessageBoxModalAlert">
          <div className="MessageBoxListAlert">
            <span className="MessageBoxModalAlertIcon"></span>
            <p>کاربر گرامی</p>
            <p>.پیام شما با موفقیت ارسال شد</p>

            <button
              className="MessageBoxUnderstandButton"
              onClick={this.handleHideAlert}
            >
              {" "}
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    );
    const View4 = (
      <div className="overlayMessageBox">
        <div className="MessageBoxModalAlert">
          <div className="MessageBoxListAlertError">
            <span className="MessageBoxModalAlertIconError"></span>
            <p>کاربر گرامی</p>
            <p>.متاسفانه پیام شما ارسال نشد</p>
            <p>.لطفا دقایقی دیگر مجدد تلاش کنید</p>
            <button
              className="MessageBoxUnderstandButton"
              onClick={this.handleHideAlert}
            >
              {" "}
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {this.state.value === 1
          ? View1
          : this.state.value === 2
          ? View2
          : this.state.value === 3
          ? View3
          : this.state.value === 4
          ? View4
          : null}
      </div>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SendMessage as any);
