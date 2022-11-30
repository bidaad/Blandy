import React from 'react'
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

type SellerMainProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const SellerMain = () => {
  return (
    <div>
      Seller Main
    </div>
  )
}


export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(SellerMain as any);
