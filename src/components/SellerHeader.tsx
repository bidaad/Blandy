import React, { useEffect, Fragment } from 'react'
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';



type SellerHeaderProps =
  UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  {
    ClickHandler: () => void,
    userToken: string | null
  }
  ;


const SellerHeader = (props: SellerHeaderProps) => {
  let history = useHistory();

  //const [, setSmallBasketVisible] = useState(false)


  useEffect(() => {
    console.log('basket changed');
    console.log('token=' + props.token);

  }, [props.basket.length, props.token]);

  function gotoMain() {
    history.push('/')
  }
  return (
    <div className="top-SellerHeader">
      {props.userToken !== null ?
        <Fragment>
          <div className="ml-26 menu-item mirror float-left p-2 mt-3" onClick={() => { props.ClickHandler(); }}>
            <i className="logout-seller fa fa-sign-out"></i>
          </div>
          <div className="ml-26 menu-item mirror float-left p-2 mt-3" >
            <i className="logout-seller fa fa-envelope"></i>
          </div>

          {props.userId === null || props.userId === '' || props.userId === undefined ?
            <NavLink to="/userlogin" tag={Link} className="">
              <img src={require('../img/user/user-header.png')} alt="" />
            </NavLink> :
            <div className="ml-26 menu-item mirror float-left p-2 mt-3" >
            <NavLink to="/user/profile" tag={Link} className="">
                <i className="logout-seller fa fa-user-circle"></i>
            </NavLink>
            </div>
          }
          <div className="ml-26 menu-item float-left p-2 mt-3" >
            <button className="btn btn-news-seller">خبرها</button>
          </div>

        </Fragment>
        : null}



      <div onClick={() => gotoMain()} className=" float-right ">
        <div className="smalllogo"></div>
      </div>
      <div className=" float-right mr-2">
        <div onClick={() => gotoMain()} className="autochar-container" >
          <div className="SellerText">مرکز فروشندگان اتوچـــــار</div>

        </div>
      </div>

      <div className="clearfix"></div>
    </div>
  )
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SellerHeader as any);
