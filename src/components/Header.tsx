import React from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';

interface HeaderProps {
    firstName: string;
    lastName: string;
    ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type AdminHeaderProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    {
        ClickHandler: () => void,
        userToken: string | null
    } &
    HeaderProps
    ;


const Header = (props: AdminHeaderProps) => {
    const toggleMenuBar = () => {
        props.setAdminMenuBar(!props.showAdminMenu);
    }

    return (
        <div className="t-header">
            <nav className=" ">
                <div className="btn-toggelbar user-fullname float-right hand">
                    <i onClick={()=> toggleMenuBar()} className="admin-menu-bar fa fa-bars"></i>
                </div>
                <div id="userFullName" className="user-fullname float-right">
                    <i className="adminuser-menu-header fa fa-user-circle"></i>
                    {props.firstName} {props.lastName}
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="header-item float-left mirror hand">
                    <i onClick={() => { props.ClickHandler(); }} className="fa text-medium fa-white fa-sign-out"></i>
                </div>
                {/* <div className="header-item float-left ml-3">
                    <LangSelector />
                </div> */}
            </nav>
            {/* <Nav className="justify-content-end t-header" activeKey="/home">
                <NavItem className="t-header-left">
                    <NavLink href="/home">Active</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink eventKey="link-1"> <LangSelector /></NavLink>
                </NavItem>
                <NavItem>
                    <NavbarBrand>
                    <i className="fa fa-user-circle"></i>
                    {props.firstName}   {props.lastName}
                    </NavbarBrand>
  
                </NavItem>
                <NavItem>
                    <NavLink eventKey="disabled"  disabled>
                        Disabled
      </NavLink>
                </NavItem>
            </Nav> */}
        </div>


    )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Header as any);

