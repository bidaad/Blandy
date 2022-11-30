import React, { Component } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as UserInfoStore from "../../store/UserInfo";
import UserSmallInfo from "./UserSmallInfo";
import { useHistory } from "react-router";
import UserPanelOrders from "./UserPanelOrders";
import AssetSuggestion from "../Asset/AssetSuggestion";
import UserNavMenu from "../../components/UserNavMenu";
import { UserInfoCard } from "../../components/UserLayout";

type UserPanelProps = UserInfoStore.UserInfoState &
  typeof UserInfoStore.actionCreators & { history: any };
//{ match: any, location: any, history: any } ;

class UserPanel extends Component<UserPanelProps> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  //logout user if not logged in
  // componentDidUpdate(){
  //     if(this.props.token === null)
  //     {
  //         const { history } = this.props;

  //         history.push({
  //             pathname: '/login',
  //         })
  //     }
  // }
  componentDidMount() {
    console.log("user panel didmount");
    this.props.UserLoad(false)

    // if(this.props.token === null)
    // {
    //     const { history } = this.props;

    //     history.push({
    //         pathname: '/login',
    //     })
    // }
  }

  render() {
    return (
      <div id="userpanel">
        <div className="row">
          <div className="col">
            <div className="d-block d-sm-none">
              <UserInfoCard
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                mobile={this.props.mobile}
                personId={this.props.personId}
                token={this.props.token}
                checkStatus={this.props.checkStatus}
              />
              <UserNavMenu />
            </div>
            <UserSmallInfo />
            <UserPanelOrders />
          </div>
          <div className="col">
            <AssetSuggestion />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfoStore.actionCreators
)(UserPanel);
