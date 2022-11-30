import React from 'react'
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import {
  ControlledMenu,
  MenuItem,
  SubMenu,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { NavLink } from 'reactstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

type SellerMenuProps =
  UserInfo.UserInfoState &
  typeof UserInfo.actionCreators;

const SellerMenu = (props: SellerMenuProps) => {

  let history = useHistory();


  const gotoNewAsset = () => {
    history.push('/seller/newasset')

  }

  return (
    <div className="seller-info-container outer-center">
      
      <div className="seller-info-card inner-center">
        <div className="user-info-card-body">
          <i className="fa fa-user-circle"></i>
          <div>
            {props.firstName} {props.lastName}
          </div>
        </div>
      </div>
      
      <div className="text-center w-100">
        <button onClick={gotoNewAsset} className="btn btn-add-asset" > + افزودن کالا</button>
      </div>
      <div className="">
      <ControlledMenu  isOpen={true} >
        <MenuItem>
          <img src={require('../../img/user/seller-profile.png')} alt="" />
          پروفایل
        </MenuItem>
        <MenuItem >
          <img src={require('../../img/user/box.png')} alt="" />
          <SubMenu label="مدیریت کالاها" >
              <MenuItem   >
                <div >
              <NavLink tag={Link} to="/seller/newasset">افزودن کالای جدید</NavLink>
              </div>
                </MenuItem>
              <MenuItem >
              <NavLink tag={Link} to="/seller/assetlist">لیست کالاها</NavLink>
                </MenuItem>
            <MenuItem >مدیریت قیمت گذاری</MenuItem>
          </SubMenu>
        </MenuItem>

        <MenuItem >
          <img src={require('../../img/user/orders-box.png')} alt="" />
          مدیریت سفارشات
        </MenuItem>


        <MenuItem>
          <img src={require('../../img/user/reports.png')} alt="" />
          گزارش‌ها</MenuItem>
        <MenuItem>
          <img src={require('../../img/user/faq.png')} alt="" />
          پرسش و پاسخ</MenuItem>
        <MenuItem>
          <img src={require('../../img/user/scores.png')} alt="" />
          امتیازهای شما</MenuItem>
        <MenuItem>
          <img src={require('../../img/user/help.png')} alt="" />
          راهنما</MenuItem>
        </ControlledMenu >
        </div>
    </div>
  )
}


export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SellerMenu as any);
