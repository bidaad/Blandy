import React, { useState, useEffect } from "react";
import { NavLink } from "reactstrap";
import ProductAutoComplete from "./ProductComplete";
import SmallBasket from "../containers/User/SmallBasket";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as UserInfo from "../store/UserInfo";
import changeEnc from "../helper/changeEnc";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ProductSearchMode } from "../model/general";
import Product_Category from "./user/ProductCategory";

type UserHeaderProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    ClickHandler: () => void;
    userToken: string | null;
  };

// interface UserHeaderProps {
//     //ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
//     ClickHandler: () => void,
//     userToken: string | null
// }

const UserHeader = (props: UserHeaderProps) => {
  let history = useHistory();

  const [smallBasketVisible, setSmallBasketVisible] = useState(false);
  function showBasket() {
    setSmallBasketVisible(true);
  }

  useEffect(() => {
    console.log("basket changed");
    console.log("token=" + props.token);
  }, [props.basket.length, props.token]);

  function gotoMain() {
    history.push("/");
  }
  return (
    <div className="top-UserHeader">
      <div className="container">
        <div
          onClick={() => props.ToggleHumburgerMenu()}
          className="menu-bars d-lg-none"
        >
          <li className="fa fa-bars"></li>
        </div>
        {smallBasketVisible ? <SmallBasket /> : null}
        {/* {props.userToken !== null ? (
          <div
            className="ml-26 menu-item mirror float-left p-2"
            onClick={() => {
              props.ClickHandler();
            }}
          >
            <li className="fa fa-sign-out" />
          </div>
        ) : null} */}
        {/* <div className="menu-item mirror float-left p-2">
                <i className="fa fa-envelope"></i>
            </div> */}
        <div
          onClick={() => showBasket()}
          className="show-tiny-basket menu-item float-left p-2"
        >
          {props.basket.length > 0 ? (
            <div className="badge badge-light">
              {changeEnc(props.basket.length.toString())}
            </div>
          ) : null}
          <img
            src={require("../img/shopping-cart.png")}
            className={"fa-shopping-cart"}
            alt=""
          />
        </div>
        {/* <div className="menu-item mirror float-left p-2">
                <i className="fa fa-bell"></i>
            </div> */}
        {/* <div className="float-left p-1">
                <LangSelector />
            </div> */}

        <div className=" menu-item float-left p-2">
          {props.userId === null ||
          props.userId === "" ||
          props.userId === undefined ? (
            <NavLink to="/userlogin" tag={Link} className="">
              <div className="login-to-account">
                <img
                  src={require("../img/Profile.png")}
                  className={"fa-account"}
                  alt="Account"
                />
                {/* <li className="fa fa-user-circle"></li> */}
                <div>ورود به حساب کاربری</div>
              </div>
            </NavLink>
          ) : (
            <div className="blandy-dropdown">
              {/* <NavLink to="/user/profile" tag={Link} > */}
              <img
                src={require("../img/Profile.png")}
                className={"fa-account"}
                alt="Account"
              />
              {/* </NavLink> */}
              <div className="blandy-dropdown-content">
                <p className="sp-userinfo">
                  {props.firstName + " " + props.lastName}
                </p>
                <NavLink
                  to="/user/profile"
                  tag={Link}
                  className="link-userinfo"
                >
                  <span>مشاهده حساب کاربری</span>
                  <div className="ic-user"></div>
                </NavLink>
                <NavLink to="/user/orders" tag={Link} className="link-userinfo">
                  <span>سفارشات من</span>
                  <div className="ic-user-order"></div>
                </NavLink>
                <NavLink
                  onClick={() => {
                    props.ClickHandler();
                  }}
                  tag={Link}
                  className="link-userinfo"
                >
                  <span>خروج از حساب کاربری</span>
                  <div className="ic-user-logout"></div>
                </NavLink>
              </div>
            </div>
          )}
        </div>

        <div onClick={() => gotoMain()} className=" float-right ">
          <div className="smalllogo"></div>
        </div>
        <ProductAutoComplete {...{ mode: ProductSearchMode.Search }} />
        <div onClick={() => gotoMain()} className=" float-right ">
          <Product_Category
            {...{ controller: "Category", action: "AllCategory" }}
          />
        </div>

        {/* <div className="menu-item mirror float-right p-2 mr-2">
                <i className="fa fa-bars"></i>
            </div> */}

        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserHeader as any);
