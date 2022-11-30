import React, { Component } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { selectData } from "../../model/general/selectData";
import Select from "react-select";
import { VwChat } from "../../model/viewModel/VwChat";
import { VwChatDetail } from "../../model/viewModel/VwChatDetail";
import { VwMessageBoxDetails } from "../../model/viewModel/VwMessageBoxDetails";

type UserMessageProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & { showSelectAddress: boolean } & RouteComponentProps<{}>;
interface mystate {
  value: number;
  subjects: selectData[];
  subjectId: string;
  text?: string;
  Send: boolean;
  Error: boolean;
  messageboxes: [];
  messageboxdetails: VwMessageBoxDetails;
  alertUpload: boolean;
  message: { chatText: string; chatId: string };
  SendAttach: boolean;
}

class UserMessages extends Component<UserMessageProps, mystate> {
  private stepInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0,
      subjects: [],
      subjectId: "",
      Send: true,
      Error: false,
      messageboxes: [],
      messageboxdetails: { messageBox: undefined, messageBoxDetail: [] },
      alertUpload: false,
      message: { chatId: "", chatText: "" },
      SendAttach: true,
    };
    this.stepInput = React.createRef();
    this.props.UserLoad(false);
  }

  async componentDidMount() {
    this.props.UserLoad(true);
    const data = {};
    fetch(APIUrl + "/Chat/GetMessageBoxByUserId", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        this.props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode !== 0) return;
        if (responseModel.data && responseModel.data.length > 0) {
          this.setState({
            messageboxes: responseModel.data,
            Send: false,
            value: 1,
          });
        } else {
          this.setState({
            messageboxes: responseModel.data,
            Send: false,
            value: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    fetch(
      APIUrl + "/HCChatTitle/GetHCListForUser?lang=" + this.props.lang.abr,
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
        this.setState({ subjects: responseModel.data, Send: false });
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  }

  handleSubject = (event: any) => {
    this.setState({ subjectId: event.value });
  };
  handleText = (event: any) => {
    this.setState({ text: event.currentTarget.value });
  };
  HandleShowSend = () => {
    this.setState({ value: 2 });
  };
  gotoMessages = () => {
     
    this.setState({ value: 1});
    const { history } = this.props;
    history.push({
      pathname: "/user/messages/",
    });
  };
  HandleMessageBoxDetail = async (event: any) => {
    this.props.UserLoad(true);
    let data = {
      chatId: event.currentTarget.dataset.chatid,
      chatText: "NODATA",
    };
    fetch(APIUrl + "/ChatDetail/GetMessageBoxesByChatId", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.setState({ messageboxdetails: responseModel.data, value: 4 });
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  handleSend = () => {
    this.props.UserLoad(true);
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
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then(() => {
        this.props.UserLoad(false);
      })
      .catch((error) => {
        this.props.UserLoad(false);
        console.log(error);
      });
  };
  toBase64 = async (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  handleFileChange = async (event: any) => {
    let chatId = event.currentTarget.dataset.chatid;
    let files: any[] = [];

    let f = await event.target.files;
    for (var i = 0, len = f.length; i < len; i++) {
      const size = f[i].size;

      const names = f[i].name.split(".");
      const name = names[0];
      const suffix = names[1];
      const type = f[i].type;
      if (
        size > 100 ||
        (suffix.toString().toUpperCase() !== "PNG" &&
          suffix.toString().toUpperCase() !== "JPG" &&
          suffix.toString().toUpperCase() !== "PDF")
      ) {
        this.setState({ alertUpload: true });
        setTimeout(() => {
          this.setState({ alertUpload: false });
        }, 2000);
        files = [];
        return;
      }
      await this.toBase64(f[i]).then((data) => {
        let mydata = {
          size: Number(size),
          name: name,
          type: type,
          extention: suffix,
          image: data,
        };
        files.unshift(mydata);
      });
    }

    this.setState({
      message: { chatId: chatId, chatText: this.state.message.chatText },
    });
    var Msg = {
      chatId: chatId,
      chatText: this.state.message.chatText,
      files: files,
    };
    fetch(APIUrl + "/ChatDetail/Save", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(Msg),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        let rm = responseModel as responseModel;
        let st =
          this.state.messageboxdetails !== undefined &&
          this.state.messageboxdetails.messageBoxDetail !== undefined
            ? this.state.messageboxdetails.messageBoxDetail.slice()
            : [];
        let rd = rm.data;
        if (st !== undefined) {
          for (var i = 0, len2 = files.length; i < len2; i++) {
            rd[0].fileText = "*" + files[i].name + "." + files[i].extention;
          }

          st.push(rd[0]);
          this.setState(
            {
              messageboxdetails: {
                messageBoxDetail: st,
                messageBox: this.state.messageboxdetails.messageBox,
              },
              message: { chatText: "", chatId: chatId },
              SendAttach: true,
            },
            () => console.log(this.state.message)
          );
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    // const res = await fetchData<responseModel>(APIUrl + '/ChatDetail/Save', 'POST', this.props, false, Msg, this.props.token, undefined, 'fa');
    // if (res) {
    //     let rm = res as responseModel;
    //     let st = (this.state.messageboxdetails !== undefined && this.state.messageboxdetails.messageBoxDetail !== undefined) ? this.state.messageboxdetails.messageBoxDetail.slice() : [];
    //     let rd = (rm as responseModel).data;
    //     if (st !== undefined) {
    //         for (var i = 0, len2 = files.length; i < len2; i++) {
    //             rd[0].fileText = '*' + files[i].name + '.' + files[i].extention;
    //         }

    //         st.push(rd[0]);
    //         this.setState({ messageboxdetails: { messageBoxDetail: st, messageBox: this.state.messageboxdetails.messageBox }, message: { chatText: '', chatId: chatId }, SendAttach: true }, () =>
    //             console.log(this.state.message));
    //     }
    // }
  };
  handleUploadClick = () => {
    if (this.stepInput.current !== null) {
      this.stepInput.current.click();
    }
  };
  handleSendMessage = async (event: any) => {
    this.props.UserLoad(true);
    var chatId = event.currentTarget.dataset.chatid;
    this.setState({
      message: { chatId: chatId, chatText: this.state.message.chatText },
    });
    var Msg = { chatId: chatId, chatText: this.state.message.chatText };
    fetch(APIUrl + "/ChatDetail/Save", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(Msg),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        let rm = responseModel;
        let st =
          this.state.messageboxdetails !== undefined &&
          this.state.messageboxdetails.messageBoxDetail !== undefined
            ? this.state.messageboxdetails.messageBoxDetail.slice()
            : [];
        let rd = rm.data;

        if (st !== undefined) {
          st.push(rd[0]);
          this.setState(
            {
              messageboxdetails: {
                messageBoxDetail: st,
                messageBox: this.state.messageboxdetails.messageBox,
              },
              message: { chatText: "", chatId: chatId },
              SendAttach: true,
            },
            () => console.log(this.state.message)
          );
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });

    // const res = await fetchData<responseModel>(APIUrl + '/ChatDetail/Save', 'POST', this.props, false, Msg, this.props.token, undefined, 'fa');
    // if (res) {
    //     let rm = res as responseModel;
    //     let st = (this.state.messageboxdetails !== undefined && this.state.messageboxdetails.messageBoxDetail !== undefined) ? this.state.messageboxdetails.messageBoxDetail.slice() : [];
    //     let rd = (rm as responseModel).data;

    //     if (st !== undefined) {
    //         st.push(rd[0]);
    //         this.setState({ messageboxdetails: { messageBoxDetail: st, messageBox: this.state.messageboxdetails.messageBox }, message: { chatText: '', chatId: chatId }, SendAttach: true }, () =>
    //             console.log(this.state.message));
    //     }
    // }
  };
  handleChangeMessage = (event: any) => {
    if (event.currentTarget.value.length > 0) {
      this.setState({
        message: { chatText: event.currentTarget.value, chatId: "" },
        SendAttach: false,
      });
    } else {
      this.setState({
        message: { chatText: event.currentTarget.value, chatId: "" },
        SendAttach: true,
      });
    }
  };
  handleEndMessage = (event: any) => {
    this.props.UserLoad(true);
    let chatId = event.currentTarget.dataset.chatid;
    var data = { id: chatId };
    fetch(APIUrl + "/Chat/EndMessageBoxForUser", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          this.setState({ value: 1 });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    this.setState({
      message: { chatText: event.currentTarget.value, chatId: "" },
    });
  };
  render() {
    const View1 = (
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="MessageBox">
              <div className="col-12">
                <p className="MessageBoxTitr">پیام های من</p>
              </div>
              <div className="MessageBoxTable">
                <table className="MessageBoxINTable table-bordered table-responsive table-hover">
                  <thead>
                    <tr key={Math.floor(Math.random() * 800000)}>
                      <th>#</th>
                      <th>شناسه پیام</th>
                      <th>عنوان پیام</th>
                      <th>تاریخ ارسال</th>
                      <th>وضعیت</th>
                      <th>جزئیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.messageboxes.map((item: VwChat) => {
                      return (
                        <tr key={Math.floor(Math.random() * 800000)}>
                          <td>{item.rowNumber}</td>
                          <td>{item.code}</td>
                          <td>{item.chatTitle}</td>
                          <td>{item.sendDate}</td>
                          <td>{item.chatStatus}</td>
                          <td>
                            <span
                              data-chatid={item.id}
                              onClick={this.HandleMessageBoxDetail}
                              className="MessageDetailIcon"
                            ></span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="MessageBoxSendCentered">
                <div className="col-12">
                  <button
                    className="btn MessageBoxSendButton"
                    onClick={this.HandleShowSend}
                  >
                    {" "}
                    ارسال پیام
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="MessageBoxImage">
              <img
                src={require("../../img/235.png")}
                className="img-fluid"
                srcSet="/static/media/235@2x.png 2x, /static/media/235@3x.png 3x"
                alt="Message Box"
              />
            </div>
          </div>
        </div>
      </div>
    );
    const View2 = (
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="SendMessageBox">
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
                <div className="section-header-Msg msg-color">
                  <i
                    className="fa fa-arrow-right"
                    onClick={this.gotoMessages}
                  ></i>
                  <span onClick={this.gotoMessages}>پیام های من</span>
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
              {/* <div className="form-group w-100">
                            <div className="plfield ">
                                <input type="text" placeholder="موضوع پیام" required className="form-control MessageBoxSubject" />
                            </div>
                        </div> */}
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
              <div className="row">
                <div className="col-lg-7">
                  {this.state.Error === true ? (
                    <span className="MessageBoxError">
                      .پر کردن این قسمتها الزامی است
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5">
                  <button
                    className="btn MessageBoxSendButtonGray"
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

          <div className="col-lg-5">
            <div className="SendMessageBoxImage">
              <img
                src={require("../../img/236.png")}
                className="img-fluid"
                srcSet="/static/media/236@2x.png 2x, /static/media/236@3x.png 3x"
                alt="Message Box"
              />
            </div>
          </div>
        </div>
      </div>
    );

    const View3 = (
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="MessageBoxResult">
              <div className="col-12">
                <p className="MessageBoxTitr">پیام های من</p>
                <div className="MessageResultIcon"></div>
                <p className="MessageResult">!موردی برای نمایش وجود ندارد</p>
              </div>

              <div className="MessageBoxSendCentered">
                <div className="col-12">
                  <button
                    className="btn MessageBoxSendButton"
                    onClick={this.HandleShowSend}
                  >
                    {" "}
                    ارسال پیام
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="SendMessageBoxImage">
              <img
                src={require("../../img/236.png")}
                className="img-fluid"
                srcSet="/static/media/236@2x.png 2x, /static/media/236@3x.png 3x"
                alt="Message Box"
              />
            </div>
          </div>
        </div>
      </div>
    );
    const View4 = (
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="MessageBox">
              <div className="col-12">
                <p className="MessageBoxTitr">پیام های من</p>
              </div>
              <div className="section-header-Msg msg-color">
                <i className="fa fa-arrow-right" onClick={this.gotoMessages}></i>
                <span onClick={this.gotoMessages}>
                پیام های من
                </span>
              </div>
              <div className="MessageTable">
                <div className="row">
                  {this.state.messageboxdetails !== undefined &&
                  this.state.messageboxdetails !== null &&
                  this.state.messageboxdetails.messageBox !== undefined &&
                  this.state.messageboxdetails.messageBox !== null ? (
                    <div className="MessaageHeader row">
                      <span className="col-lg-4 col-md-4  col-sm-4 ">
                        شناسه پیام{" "}
                        <b>
                          {
                            (this.state.messageboxdetails.messageBox as VwChat)
                              .code
                          }
                        </b>
                      </span>
                      <span className="col-lg-4 col-md-4  col-sm-4">
                        موضوع پیام :{" "}
                        <b>
                          {
                            (this.state.messageboxdetails.messageBox as VwChat)
                              .chatTitle
                          }
                        </b>
                      </span>
                      <span className="col-lg-4 col-md-4  col-sm-4">
                        تاریخ ارسال :{" "}
                        <b>
                          {
                            (this.state.messageboxdetails.messageBox as VwChat)
                              .sendDate
                          }
                        </b>
                      </span>
                    </div>
                  ) : (
                    <div className="MessaageHeader">
                      <span>شناسه پیام </span>
                      <span>موضوع پیام : </span>
                      <span>تاریخ ارسال : </span>
                    </div>
                  )}
                </div>
                {this.state.messageboxdetails.messageBoxDetail !== undefined &&
                  this.state.messageboxdetails.messageBoxDetail.map(
                    (item: VwChatDetail) => {
                      return (
                        <div>
                          {item.isUser ? (
                            <div className="row">
                              <div
                                className="col-lg-1 col-md-2 col-sm-2"
                                key={Math.floor(Math.random() * 800000)}
                              >
                                <div
                                  className="UserIcon"
                                  key={Math.floor(Math.random() * 800000)}
                                ></div>
                              </div>
                              <div
                                className="col-lg-11 col-md-10 col-sm-10"
                                key={Math.floor(Math.random() * 800000)}
                              >
                                <div
                                  className="UserMessage"
                                  key={Math.floor(Math.random() * 800000)}
                                >
                                  <p>{item.sendDate}</p>
                                  {item.chatText}
                                  <p>
                                    {item.fileText !== null &&
                                    item.fileText !== undefined &&
                                    item.fileText.trim() !== "" &&
                                    item.fileText.split("*") !== null &&
                                    item.fileText.indexOf("*") > -1
                                      ? item.fileText
                                          .split("*")
                                          .map((item2) => {
                                            return (
                                              <span>
                                                {item2 !== "" &&
                                                item2 !== undefined ? (
                                                  <a
                                                    className="MessageBoxFiles"
                                                    target="_blank"
                                                    href='#'
                                                  >
                                                    {item2}
                                                  </a>
                                                ) : null}
                                              </span>
                                            );
                                          })
                                      : null}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div
                                className="col-lg-11  col-md-10 col-sm-10"
                                key={Math.floor(Math.random() * 800000)}
                              >
                                <div
                                  className="ExpertMessage"
                                  key={Math.floor(Math.random() * 800000)}
                                >
                                  <p>{item.expertInfo}</p>
                                  {item.chatText}
                                </div>
                              </div>
                              <div
                                className="col-lg-1  col-md-2 col-sm-2"
                                key={Math.floor(Math.random() * 800000)}
                              >
                                <div
                                  className="ExpertIcon"
                                  key={Math.floor(Math.random() * 800000)}
                                >
                                  <img
                                    src={require("../../img/Ellipse 8.png")}
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                {this.state.messageboxdetails !== undefined &&
                this.state.messageboxdetails !== null &&
                this.state.messageboxdetails.messageBox !== undefined &&
                this.state.messageboxdetails.messageBox !== null &&
                this.state.messageboxdetails.messageBox.endChat !== true ? (
                  <div className="row">
                    <div className="col-lg-12  col-md-12 col-sm-12">
                      <div
                        className="EndMessage"
                        onClick={this.handleEndMessage}
                        key={Math.floor(Math.random() * 800000)}
                        data-chatid={this.state.messageboxdetails.messageBox.id}
                      >
                        پایان گفتگو
                      </div>
                    </div>
                    <div className="col-lg-12  col-md-12 col-sm-12">
                      <input
                        ref={this.stepInput}
                        className="uploader"
                        onChange={this.handleFileChange}
                        type="file"
                        multiple
                        data-chatid={this.state.messageboxdetails.messageBox.id}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  {this.state.messageboxdetails !== undefined &&
                  this.state.messageboxdetails !== null &&
                  this.state.messageboxdetails.messageBox !== undefined &&
                  this.state.messageboxdetails.messageBox !== null &&
                  this.state.messageboxdetails.messageBox.endChat !== true ? (
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="plfield ">
                          <input
                            type="text"
                            onChange={this.handleChangeMessage}
                            value={this.state.message.chatText}
                            placeholder="پیام خود را وارد کنید"
                            required
                            className="form-control MessageBoxAttach"
                          />
                        </div>
                      </div>
                      <div className="MessageBoxIcons">
                        {this.state.alertUpload ? (
                          <p className="MessageBoxAlert">
                            مجاز به انتخاب فایل با فرمت با حجم حداکثر 100
                            کیلوبایت هستید
                          </p>
                        ) : null}

                        <button
                          className="MessageBoxAttachIcon"
                          disabled={this.state.SendAttach}
                          onClick={this.handleUploadClick}
                        ></button>
                        {this.state.messageboxdetails !== undefined &&
                        this.state.messageboxdetails !== null &&
                        this.state.messageboxdetails.messageBox !== undefined &&
                        this.state.messageboxdetails.messageBox !== null ? (
                          <button
                            disabled={this.state.SendAttach}
                            className="MessageBoxAttachIcon"
                            onClick={this.handleSendMessage}
                            data-chatid={
                              (this.state.messageboxdetails
                                .messageBox as VwChat).id
                            }
                          ></button>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <p className="EmdTextMessage">
                      .این گفتگو در تاریخ{" "}
                      {this.state.messageboxdetails.messageBox !== undefined &&
                      this.state.messageboxdetails.messageBox.endChatDate !==
                        undefined &&
                      this.state.messageboxdetails.messageBox.endChatDate !==
                        null
                        ? this.state.messageboxdetails.messageBox.endChatDate
                        : ""}{" "}
                      توسط پشتیبانی اتوچار بسته شد
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="MessageBoxImage">
              <img
                src={require("../../img/235.png")}
                className="img-fluid"
                srcSet="/static/media/235@2x.png 2x, /static/media/235@3x.png 3x"
                alt="Message Box"
              />
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <div className="text-center caption-header">
          {
            <li
              onClick={() => this.props.history.push({ pathname: "/user/panel" })}
              className="fa fa-arrow-right back-arrow"
            ></li>
          }
           صندوق پیام{" "}
        </div>
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
)(UserMessages as any);
