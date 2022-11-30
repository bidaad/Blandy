import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
// import './NavMenu.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfoStore from '../store/UserInfo';
import { Directions } from '../model/general';
import { VwPermisionResource } from '../model/viewModel/VwPermisionResource';
import { Nav } from 'react-bootstrap';
import $ from 'jquery';

type NavMenuProps =
    UserInfoStore.UserInfoState &
    typeof UserInfoStore.actionCreators

class NavMenu extends React.PureComponent<NavMenuProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };
    componentDidUpdate() {

        let expands = $(".T-menu").find('[data-expand=true]');
        expands.each((index, element) => {
            $("#" + element.id).closest('li').children('li').fadeToggle(200);
        });
        let actives = $(".T-menu").find('[data-active=true]');
        actives.each((index, element) => {
            $("#" + element.id).css('font-weight', 'bold').css('color', 'red');
        });

    }
    handler_Click = (e: any) => {
        
        let resourceCode=e.currentTarget.dataset.resourcecode;
        let name=e.currentTarget.dataset.name;
        if(name && resourceCode)
        {
            this.props.AddTab(name,resourceCode.toLowerCase());
        }
        if (e.currentTarget.dataset.child === "1") {
            $(e.currentTarget).closest('li').children('li').fadeToggle(200);
            // e.preventDefault();

        }
        if (e.currentTarget.dataset.active !== undefined) {
            let activeId = e.currentTarget.id;
            let expandId = e.currentTarget.parentElement.parentElement.parentElement.firstElementChild.id;
            this.props.ChangeMenu(expandId, activeId);
        }
        // e.preventDefault();
    }
    handler_Mousenter = (e: any) => {
        e.currentTarget.style.backgroundColor = '#336280';
    }
    handler_Mouseleave = (e: any) => {
        e.currentTarget.style.backgroundColor = '#248185';
    }

    predicateBy = (prop: any) => {
        return function (a: any, b: any) {
            //    if (a[prop] > b[prop]){
            return a[prop] - b[prop]
            //        return 1;
            //    } else if(a[prop] > b[prop]){
            //        return -1;
            //    }
            //    return 0;
        }
    }

    public render() {
        let navClass = "";
        let navItemClass = "nav-item-Ltr";
        if (this.props.dir === Directions.RTL) {
            navClass = "nav-Rtl";
            navItemClass = "nav-item-Rtl";
        }

        
            return (
                <Nav className={"admin-menu flex-column " + navClass}>
                    {/* <div className="collapse navbar-collapse"> */}
                    {
                        this.props.resources !== undefined ?
                            this.props.resources.filter((d: any) => d.parentId === null && d.lang === this.props.lang.abr.toUpperCase()).sort(this.predicateBy("orderBy")).map((item: VwPermisionResource) => {
                                if (item) {
                                    if (item.actionTypes) {
                                        if (item.actionTypes.includes("V")) {
                                            if (item.actionTypes.includes("E")) {
                                                return (
                                                    <NavItem key={ item.id} className={navItemClass} >
                                                        <NavLink onMouseEnter={this.handler_Mousenter} to={'#'} onMouseLeave={this.handler_Mouseleave} onClick={this.handler_Click} id={item.id} data-child="1" data-expand={item.isExpand === null ? false : item.isExpand} tag={Link} className="pl-0" >{item.resourceLanguageName}</NavLink>
                                                        <ul>
                                                        {
                                                            this.props.resources !== undefined ?
                                                                this.props.resources.filter((d: any) => d.parentId === item.id && d.lang === this.props.lang.abr.toUpperCase()).map((child: VwPermisionResource) => {
                                                                    if (child) {
                                                                        if (child.actionTypes) {
                                                                            if (child.actionTypes.includes("V")) {
                                                                                if (child.actionTypes.includes("E")) {
                                                                                    return (
                                                                                    <NavItem key={'key2' + child.id} className={navItemClass}>
                                                                                        {/* to={"/Admin/" + child.resourceCode} */}
                                                                                        <NavLink to={'#'} onMouseEnter={this.handler_Mousenter} data-resourcecode={child.resourceCode} data-name={child.resourceLanguageName} onMouseLeave={this.handler_Mouseleave} tag={Link} id={child.id} onClick={this.handler_Click} className="pl-0" data-active={child.isActive === null ? false : child.isActive}  >{child.resourceLanguageName}
                                                                                        
                                                                                        </NavLink>

                                                                                    </NavItem>)
                                                                                }
                                                                                else {
                                                                                    return (
                                                                                        // to={"/Admin/" + child.resourceCode}
                                                                                        <NavItem key={'key3'+ child.id} className={navItemClass}>
                                                                                            <NavLink onMouseEnter={this.handler_Mousenter} data-resourcecode={child.resourceCode} data-name={child.resourceLanguageName}  onMouseLeave={this.handler_Mouseleave} disabled={false} id={child.id} tag={Link} to={'#'} onClick={this.handler_Click} className="pl-0" data-active={child.isActive === null ? false : child.isActive}>{child.resourceLanguageName}</NavLink>
                                                                                        </NavItem>
                                                                                        )
                                                                                }

                                                                            }
                                                                        }

                                                                    }
                                                                }
                                                                ) : null}
                                                                </ul>
                                                                
                                                    </NavItem>
                                                )
                                            }
                                            else {
                                                return (
                                                    <NavItem key={'key4' + item.id} className={navItemClass}>
                                                        <NavLink disabled={false} tag={Link} className="pl-0" to={"/Admin/" + item.resourceCode}>{item.resourceLanguageName}</NavLink>
                                                    </NavItem>
                                                )
                                            }

                                        }
                                    }

                                }
                            }
                            ) : null}


                    {/* </div> */}
                </Nav>

            )
        

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
)(NavMenu as any);

