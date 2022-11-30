import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfoStore from '../store/UserInfo';
import { Directions } from '../model/general';

type UserNavMenuProps =
    UserInfoStore.UserInfoState &
    typeof UserInfoStore.actionCreators

class UserNavMenu extends React.PureComponent<UserNavMenuProps, { isOpen: boolean, activeMenu: string }> {
    public state = {
        isOpen: false,
        activeMenu: ''
    };

    activate = (menu: string) => {
        this.setState({activeMenu: menu})
    }

    public render() {
        let navClass = "";
        //let navItemClass = "nav-item-Ltr";
        if (this.props.dir === Directions.RTL) {
            navClass = "nav-Rtl";
        //    navItemClass = "nav-item-Rtl";
        }

            return (
                <nav className={"user-aside-nav navbar navbar-expand navbar-light bg-light flex-md-column flex-row align-items-start py-2 "+navClass}>
                    <div className="collapse navbar-collapse">
                        <ul className="user-nav flex-md-column flex-row navbar-nav w-100 justify-content-between">
                        <NavItem key={5} >
                                <NavLink tag={Link}  ><img src={require('../img/Star-profile.png')} className="blandy-icon-profile" alt="dashbord"/><span className="sp-profile">داشبورد</span></NavLink>
                            </NavItem>
                            <NavItem key={10} >
                                <NavLink tag={Link} onClick={()=> this.activate('profile')} className={this.state.activeMenu === 'profile'? 'active' : ""} to="/user/profile"><img src={require('../img/ProfileIcon.png')} className="blandy-icon-profile" alt="dashbord"/> <span className="sp-profile">اطلاعات کاربر</span></NavLink>
                            </NavItem>
                            <NavItem key={20} >
                                <NavLink tag={Link} onClick={()=> this.activate('orders')} className={this.state.activeMenu === 'orders'? 'active' : ""} to="/user/orders"><img src={require('../img/Bag.png')} className="blandy-icon-profile" alt="orders"/> <span className="sp-profile">سفارشات</span></NavLink>
                            </NavItem>
                            <NavItem key={30} >
                                <NavLink tag={Link} onClick={()=> this.activate('favs')} className={this.state.activeMenu === 'favs'? 'active' : ""} to="/user/favs"><img src={require('../img/Heart-Icon.png')} className="blandy-icon-profile" alt="Favorite"/> <span className="sp-profile">علاقمندی ها</span></NavLink>
                            </NavItem>
{/*                             
                            <NavItem key={50} >
                                <NavLink tag={Link} onClick={()=> this.activate('addresses')} className={this.state.activeMenu === 'addresses'? 'active' : ""} to="/user/addresses"><i className="user-menu-header fa fa-map-marker"></i> <span className="">آدرس ها</span></NavLink>
                            </NavItem> */}
                            <NavItem key={60} >
                                <NavLink tag={Link} onClick={()=> this.activate('comments')} className={this.state.activeMenu === 'comments'? 'active' : ""} to="/user/comments"><img src={require('../img/Document.png')} className="blandy-icon-profile" alt="survey"/> <span className="sp-profile">نظر و پیشنهاد</span></NavLink>
                            </NavItem>
                            <NavItem key={70} >
                                <NavLink tag={Link} onClick={()=> this.activate('messages')} className={this.state.activeMenu === 'messages'? 'active' : ""} to="/user/messages"><img src={require('../img/Chat.png')} className="blandy-icon-profile" alt="message"/> <span className="sp-profile">پرسش و پاسخ</span></NavLink>
                            </NavItem>

                        </ul>
                    </div>
                </nav>
            );

    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfoStore.actionCreators
)(UserNavMenu as any);

