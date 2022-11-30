import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as UserInfoStore from "../store/UserInfo";
import MsgBox from "./MsgBox";
import { Directions, LayoutTypes } from "../model/general";
import UserHeader from "./UserHeader";
import UserNavMenu from "./UserNavMenu";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import WebFooter from "../components/user/WebFooter";
import SendMessage from "./user/SendMessage";
import Product_Category from "./user/ProductCategory";
import Chat from "../containers/User/Chat";
import UserLogin from "../containers/User/UserLogin";
import SellerHeader from "./SellerHeader";
import SellerMenu from "../containers/User/SellerMenu";
import { APIImage, APIUrl } from "../helper/config";
import { responseModel } from "../model/general/responseModel";
import { VwDocument } from "../model/viewModel/VwDocument";

type UserLayoutProps = UserInfoStore.UserInfoState &
  typeof UserInfoStore.actionCreators & { typeLayout: LayoutTypes } & {
    children?: React.ReactNode;
    showLogout: boolean;
  };

// function DoLogout() {
//     let history = useHistory();

//     history.push("/");

//     return (
//         <div>
//         </div>
//     );
// }
const GotoInvite = () => {
  return (
    <NavLink
      tag={Button}
      className="btn-orange btn w-25 w-100 mt-30"
      to="/user/invite"
    >
      دعوت از دوستان
    </NavLink>
  );
};

export class UserInfoCard extends Component<
  {
    firstName: string;
    lastName: string;
    mobile: number | null;
    token: any;
    checkStatus: any;
    personId: any;
  },
  { showLogout: boolean; filepath: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLogout: false,
      filepath: "",
    };
  }
  componentDidMount() {
    this.GetPictureProfile();
  }
  GetPictureProfile = () => {
    fetch(APIUrl + "/Document/GetPicProfile?PersonId=" + this.props.personId, {
      method: "GET",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        this.props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        debugger;
        if (responseModel.messageCode === 0) {
          let res = responseModel.data as VwDocument;
          this.setState({ filepath: res.filePath });
        }
      })
      .catch((error) => {});
  };
  render() {
    return (
      <div>
        {this.state.filepath ? (
          <div className="profile-info">
            <img src={APIImage + this.state.filepath} alt="Profile" />
            <span className="profile-info-sp">{this.props.mobile}</span>
            {/* <div>
         {this.props.firstName} {this.props.lastName}
       </div> */}
          </div>
        ) : (
          <div className="profile-info">
            {/* <img src={require("../img/ProfileIcon@3x.png")} alt="profile" className="profile-info-icon" /> */}
            <span className="profile-info-sp">{this.props.mobile}</span>
            {/* <div>
          {this.props.firstName} {this.props.lastName}
        </div> */}
          </div>
        )}
      </div>
    );
  }
}

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

const UserLayout = (props: UserLayoutProps) => {
  const logoutClickHandler = () => {
    props.logoutUser("/userlogin");
    history.push("/");
    //setshowLogout(true);
  };
  const logoutSellerClickHandler = () => {
    props.logoutUser("/sellerlogin");
    history.push("/sellerlogin");
    //setshowLogout(true);
  };

  useEffect(() => {
    props.hideLogin();
  }, []);
  let history = useHistory();

  if (props.dir === Directions.RTL) {
    return (
      <div className="clearfix">
        {props.showContactUs === true ? <SendMessage /> : null}
        {props.showLoginBox === true ? (
          <div className="overlayuserloadercontent">
            <UserLogin {...{ noRedirect: false }} />
          </div>
        ) : null}

        {props.showChatBox === true ? <Chat {...{ joinUserId: null }} /> : null}

        {props.typeLayout === LayoutTypes.Product ? (
          <div>
            <UserHeader
              {...{ ClickHandler: logoutClickHandler, userToken: props.token }}
            />

            {props.UserLoading === true ? (
              <div className="overlayuserloadercontent">
                <div className="userloadercontent">
                  <div className="userloaderBlandy"></div>
                  <span className="AutoCharTextLoad">
                    بازار لوازم خانگی بلندی
                  </span>
                </div>
              </div>
            ) : null}
            {props.SellerLoading === true ? (
              <div className="overlayuserloadercontentSeller">
                <div className="userloadercontentSeller">
                  <div className="userloaderseller"></div>
                  <span className="AutoCharTextLoadSeller">
                    مرکز فروشندگان اتوچار
                  </span>
                </div>
              </div>
            ) : null}

            <div className="container">
              <div className="user-panel-container">
                <div className="row min-vh-100 flex-column flex-md-row">
                  <div className="container Rtl">
                    <MsgBox />
                    {props.children}
                  </div>
                </div>
              </div>
            </div>

            <WebFooter />
          </div>
        ) : props.typeLayout === LayoutTypes.User ? (
          <div>
            <UserHeader
              {...{ ClickHandler: logoutClickHandler, userToken: props.token }}
            />

            {props.UserLoading === true ? (
              <div className="overlayuserloadercontent">
                <div className="userloadercontent">
                  <div className="userloaderBlandy"></div>
                  <span className="AutoCharTextLoad">
                    بازار لوازم خانگی بلندی
                  </span>
                </div>
              </div>
            ) : null}
            {props.SellerLoading === true ? (
              <div className="overlayuserloadercontentSeller">
                <div className="userloadercontentSeller">
                  <div className="userloaderseller"></div>
                  <span className="AutoCharTextLoadSeller">
                    مرکز فروشندگان اتوچار
                  </span>
                </div>
              </div>
            ) : null}
            <div className="container">
              <div className="user-panel-container">
                <div className="row min-vh-100 flex-column flex-md-row">
                  <main className="col-lg-10 col-md-6 bg-faded ">
                    <div className="M-container">
                      <MsgBox />
                      {props.children}
                    </div>
                  </main>
                  <aside className="d-none d-sm-block col-lg-2 col-md-6 col-xs-12 flex-shrink-1 user-side-menu ">
                    <UserInfoCard
                      firstName={props.firstName}
                      lastName={props.lastName}
                      mobile={props.mobile}
                      personId={props.personId}
                      token={props.token}
                      checkStatus={props.checkStatus}
                    />
                    <UserNavMenu />
                    <GotoInvite />
                  </aside>
                </div>
              </div>
            </div>
            <WebFooter />
          </div>
        ) : props.typeLayout === LayoutTypes.Main ? (
          <div>
            <UserHeader
              {...{ ClickHandler: logoutClickHandler, userToken: props.token }}
            />

            {props.UserLoading === true ? (
              <div className="overlayuserloadercontent">
                <div className="userloadercontent">
                  <div className="userloaderBlandy"></div>
                  <span className="AutoCharTextLoad">
                    بازار لوازم خانگی بلندی
                  </span>
                </div>
              </div>
            ) : null}
            {props.SellerLoading === true ? (
              <div className="overlayuserloadercontentSeller">
                <div className="userloadercontentSeller">
                  <div className="userloaderseller"></div>
                  <span className="AutoCharTextLoadSeller">
                    مرکز فروشندگان اتوچار
                  </span>
                </div>
              </div>
            ) : null}

            <div className="container">
              <div className="user-panel-container">
                <div className=" min-vh-100 flex-column flex-md-row">
                  <main className=" bg-faded ">
                    <div className="M-container">
                      <MsgBox />
                      {props.children}
                    </div>
                  </main>
                </div>
              </div>
            </div>
            <WebFooter />
          </div>
        ) : props.typeLayout === LayoutTypes.Seller ? (
          <div>
            <SellerHeader
              {...{
                ClickHandler: logoutSellerClickHandler,
                userToken: props.token,
              }}
            />

            {props.UserLoading === true ? (
              <div className="overlayuserloadercontent">
                <div className="userloadercontent">
                  <div className="userloaderBlandy"></div>
                  <span className="AutoCharTextLoad">
                    بازار لوازم خانگی بلندی
                  </span>
                </div>
              </div>
            ) : null}
            {props.SellerLoading === true ? (
              <div className="overlayuserloadercontentSeller">
                <div className="userloadercontentSeller">
                  <div className="userloaderseller"></div>
                  <span className="AutoCharTextLoadSeller">
                    مرکز فروشندگان اتوچار
                  </span>
                </div>
              </div>
            ) : null}

            <div className="container">
              <div className="seller-panel-container">
                <div className="row">
                  <main className="col-lg-10 col-md-10 col-xs-6 bg-faded ">
                    <div className="M-container">
                      <MsgBox />
                      {props.children}
                    </div>
                  </main>
                  <div className="col-lg-2 col-md-2 col-xs-6">
                    <SellerMenu />
                  </div>
                </div>
              </div>
            </div>
            <WebFooter />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="">
        {props.UserLoading === true ? (
          <div className="overlayuserloadercontent">
            <div className="userloadercontent">
              <div className="userloaderBlandy"></div>
              <span className="AutoCharTextLoad">بازار لوازم خانگی بلندی</span>
            </div>
          </div>
        ) : null}
        <div>
          {props.SellerLoading === true ? (
            <div className="overlayuserloadercontent">
              <div className="userloadercontent">
                <div className="userloader"></div>
                <span className="AutoCharTextLoad">مرکز فروشندگان اتوچار</span>
              </div>
            </div>
          ) : null}
        </div>
        <UserHeader
          {...{ ClickHandler: logoutClickHandler, userToken: props.token }}
        />
        <Product_Category
          {...{ controller: "Category", action: "AllCategory" }}
        />

        {props.typeLayout === LayoutTypes.Product ? (
          <div className="user-panel-container">
            <div className="row min-vh-100 flex-column flex-md-row">
              <main className="col bg-faded  flex-grow-1  T-container-fluid">
                <div className="M-container">
                  <MsgBox />
                  {props.children}
                </div>
              </main>
            </div>
          </div>
        ) : props.typeLayout === LayoutTypes.User ? (
          <div className="user-panel-container">
            {props.UserLoading === true ? (
              <div className="overlayuserloadercontent">
                <div className="userloadercontent">
                  <div className="userloaderBlandy"></div>
                  <span className="AutoCharTextLoad">
                    بازار لوازم خانگی بلندی
                  </span>
                </div>
              </div>
            ) : null}
            {props.SellerLoading === true ? (
              <div className="overlayuserloadercontentSeller">
                <div className="userloadercontentSeller">
                  <div className="userloaderseller"></div>
                  <span className="AutoCharTextLoadSeller">
                    مرکز فروشندگان اتوچار
                  </span>
                </div>
              </div>
            ) : null}
            <div className="row min-vh-100 flex-column flex-md-row">
              <aside className="col-12 col-md-2 p-0 flex-shrink-1 T-menu">
                <UserNavMenu />
              </aside>
              <main className="col bg-faded flex-grow-1  T-container-fluid">
                <div className="M-container">
                  <MsgBox />
                  {props.children}
                </div>
              </main>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfoStore.actionCreators
)(UserLayout as any);
