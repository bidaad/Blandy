import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfoStore from '../store/UserInfo';
import { RouteComponentProps } from 'react-router';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


type HomeProps =
  UserInfoStore.UserInfoState &
  typeof UserInfoStore.actionCreators &
  RouteComponentProps<{}>;
console.log('Admin Home Renderrrr');

const Home = (props: HomeProps) => (
  <div id='homePage' className="testclass">
    {/* <div id="test">{props.firstName}</div> */}
    {/* <div><SelectList label="prd" name="BrandId" entityName={"product"}  /></div> */}
    {props.menuResources !== undefined ?
      <ul className="home-items">
        {
          props.menuResources.map((item: any) =>
            <li >
              <NavLink  tag={Link} className="pl-0" to={"/Admin/" + item.resourceCode}>
              {item.resourceLanguageName}
              </NavLink>
            </li>
          )
        }
      </ul>
      : null}

  </div>
);

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfoStore.actionCreators
)(Home as any);

