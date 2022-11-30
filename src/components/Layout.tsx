import React from 'react'
import NavMenu from './NavMenu';
import Header from './Header';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfoStore from '../store/UserInfo';
import MsgBox from './MsgBox';
import { Directions } from '../model/general';
import { useHistory } from 'react-router'


type LayoutProps =
    UserInfoStore.UserInfoState &
    typeof UserInfoStore.actionCreators;

function DoLogout() {
    let history = useHistory();

    history.push("/");

    return (
        <div>
        </div>
    );
}

class Layout extends React.PureComponent<LayoutProps, { children?: React.ReactNode, showLogout: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            showLogout: false,
        }
    }

    logoutClickHandler = () => {
        this.props.logoutUser('/adminlogin');
        this.setState({ showLogout: true })
    }
    render() {
        if (this.props.dir === Directions.RTL) {
            return (
                <div className="">
                    {this.state.showLogout ?
                        <DoLogout /> : null}
                    <Header {...{ firstName: this.props.firstName, lastName: this.props.lastName, ClickHandler: this.logoutClickHandler }} />
                    <div className="admin-panel-container">
                        <div className="row ">
                            <main className="col-lg-10 bg-faded py-3 ">
                                <div className="M-container">

                                            <MsgBox />
                                            {this.props.isLoading === true ? <div className="centered"><div className="spinner-grow text-warning" role="status"><span className="sr-only">Loading...</span></div></div> :
                                                this.props.children
                                            }

                                </div>
                            </main>
                            {this.props.isLoading === true ? <div className="centered"><div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div></div> :
                                this.props.showAdminMenu?
                                <aside className="col-lg-2 admin-menu  p-0  flex-shrink-1 T-menu">
                                    <NavMenu />
                                </aside>:null
                            }

                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="">
                    <Header {...{ firstName: this.props.firstName, lastName: this.props.lastName, ClickHandler: this.logoutClickHandler }} />
                    <div className="admin-panel-container">
                        <div className="row ">
                            {this.props.isLoading === true ? <div className="centered"><div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div></div> :

                                <aside className="admin-menu flex-shrink-1 T-menu">
                                    <NavMenu />
                                </aside>
                            }
                            <main className="col bg-faded flex-grow-1  T-container">
                                <div className="M-container">
                                    <MsgBox />
                                    {this.props.isLoading === true ? <div className="centered"><div className="spinner-grow text-warning" role="status"><span className="sr-only">Loading...</span></div></div> :
                                        this.props.children
                                    }

                                </div>
                            </main>


                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfoStore.actionCreators
)(Layout);

