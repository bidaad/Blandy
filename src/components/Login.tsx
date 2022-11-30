import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
//import { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
import PropTypes from "prop-types";
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { MessageTypes } from '../model/general';
import { projectInfo } from '../model/general/projectInfo';
import { projectStrong } from '../helper/projectStrong';
import { responseModel } from '../model/general/responseModel';
import ReCAPTCHA from "react-google-recaptcha";
import { APIUrl } from '../helper/config';
import MsgBox from './MsgBox';



type LoginProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    { match: any, location: any, history: any } &
    RouteComponentProps<{}>;


class Login extends Component<LoginProps, {firstName:string, lastName:string,googleTokenID:string,picture:string | null,message:string | null, username:string | null, password:string | null, isLoading:boolean}> {
    static propTypes = {
        //match: PropTypes.object.isRequired,
        //location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    private recaptchaRef: React.RefObject<ReCAPTCHA>;
    constructor(props: LoginProps) {
        super(props);
        this.recaptchaRef = React.createRef();
        const cookies = new Cookies();
        this.state = {
            firstName: '',
            lastName: '',

            googleTokenID: cookies.get('googleTokenID') || null,
            picture: null,
            message: null,
            isLoading: false,
            username: null,
            password: null,
        };
    };


    handleClick = () => {
        //console.log(this.props.gotoHome());
        //this.props.gotoHome();
        const { history } = this.props;
        history.push('/addcase')
    }


    getGoogleAccountInfo = (googleTokenID: string) => {
        fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + googleTokenID)
            .then(response => response.json())
            .then(data => {
                console.log('data.given_name=' + data.given_name);

                this.setState({
                    googleTokenID: googleTokenID,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    username: data.username,
                    picture: data.picture,
                })

                //this.login(data.given_name, data.family_name, data.username, data.picture, googleTokenID);
            }
            );
    }

    responseErrorGoogle = (response: any) => {
        // console.log(response);

    }


    

    userPasslogin =  () => {
        // var captchaVal = (this.recaptchaRef.current as ReCAPTCHA).getValue();
        // if (captchaVal === '') {
        //     this.props.addMessage([{ msg: 'لطفا کپچا را تکمیل کنید', msgType: MessageTypes.Error }])
        //     return;
        // }

        this.props.emptyMessages();

        const username = this.props.username;
        const password = this.props.password;

        console.log('username after click=' + username);

        if (username === '') {
            this.props.addMessage([])
            this.props.addMessage([{ msg: 'نام کاربری نباید خالی باشد', msgType: MessageTypes.Error }])
            return;
        }
        if (password === '') {
            this.props.addMessage([])
            this.props.addMessage([{ msg: 'کلمه عبور نباید خالی باشد', msgType: MessageTypes.Error }])
            //            this.setState({ state: this.state });
            return;
        }

        const data = {
            Username: username,
            Password: password,
            lang: this.props.lang.abr,
            typeLogin:"ADMIN"
        };
        console.log('fetching');
        console.log('url=' + APIUrl);
        this.setState({isLoading:true})
        
        fetch(APIUrl + '/User/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                console.log('result received ...');
                
                this.setState({isLoading:false})
                console.log('messageCode=' + responseModel.messageCode);

                if (responseModel.messageCode !== 0) {
                    console.log('errrrrr');
                    this.props.addMessage([{ msg: responseModel.message, msgType: MessageTypes.Error }]);
                    return;
                }
                else {
                    console.log(responseModel.message);
                    
                    this.setState({ message: responseModel.message })
                }
                this.props.setUserInfo(
                    responseModel.data.id,
                    responseModel.data.firstName,
                    responseModel.data.lastName,
                    responseModel.data.username,
                    responseModel.data.mobile,
                    '',
                    responseModel.data.token,
                    responseModel.data.userPermissions, 1, 
                    responseModel.resources,
                    responseModel.data.personId)


                const localInfo: projectInfo = { token: responseModel.data.token, url: this.props.apiUrl };
                projectStrong.setInfo(localInfo);
                projectStrong.setMessageList(responseModel.messageList)
                const { history } = this.props;
                console.log('pushing to home');

                history.push({
                    pathname: '/admin/home',
                    userID: responseModel.data.id
                })
            })
            .catch(
                error => {
                    this.setState({isLoading:false})
                    console.log('error');

                    console.log(error);
                }
            );


    }

    handleUsername = (event: any) => {
        //this.setState({ ali: 33333 })
        //
        //this.setState({ username: event.target.value })
        //this.setState({ ...this.state, username: event.currentTarget.value })
        console.log('username=' + event.target.value);
        this.props.setUsername(event.target.value)
    }
    handlePassword = (event: any) => {
        console.log(event.target.value);

        this.props.setPassword(event.target.value)
    }

    responseGoogle = (response: any) => {
        this.setState({ isLoading: true });
        if (response.error)
            return
        const cookies = new Cookies();
        cookies.set('googleTokenID', response.tokenId, { path: '/' });
        cookies.set('username', response.username, { path: '/' });
        //;
        this.getGoogleAccountInfo(response.tokenId)

    }

    componentDidMount() {
        
        console.log('Admin login page');

        if (this.props.token !== null) {
            //console.log('google' + this.state.googleTokenID + 'sss');

            //this.getGoogleAccountInfo(this.props.googleTokenID)
        }

    }

    onChange = (value: string | null) => {
        console.log('nnnnnnnnn');

        console.log("Captcha value:", value);
    }


    render() {
        console.log('Admin Login Render');

        const Loading = <div className="spinner-border" role="status">        <span className="sr-only">Loading...</span>      </div>;
        if (this.props.isLoading)
            return Loading;
        else
            return (

                    <div id="loginComp" className="container-fluid admin-login-container">
                                
                        <div >
                            
                            <div >
                                <MsgBox />
                                <main className="col bg-faded py-3 flex-grow-1  T-container-fluid">
                                    <div className="M-login">

                                        <div className="text-center w-100">

                                            <div className="login">

                                                <div className="inline">
                                                    <div className="account_circle inner-center">
                                                    
                                                    </div>

                                                    <div className="">
                                                        {/* <label className="admin-login-label-caption" >نام کاربری</label> */}
                                                        <div className="input-group mb-2">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <img src={require('../img/perm_identity_24px.png')} alt="" />
                                                                </div>
                                                            </div>
                                                            <input onChange={(e) => this.handleUsername(e)} type="text" className="form-control" id="username" placeholder="نام کاربری" />
                                                        </div>
                                                    </div>


                                                    <div className="">
                                                        <label className="sr-only" >Username</label>
                                                        <div className="input-group mb-2">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <img src={require('../img/https_24px.png')} alt="" />
                                                                </div>
                                                            </div>
                                                            <input onChange={(e) => this.handlePassword(e)} type="Password" className="form-control" id="password" placeholder="کلمه عبور" />
                                                        </div>
                                                    </div>
                                                    <div className="gc-container">
                                                        <ReCAPTCHA
                                                            size={'normal'}
                                                            sitekey="6LcznuMUAAAAAD7ljL7snFPPVQySK5Ii7HqKLXGY"
                                                            onChange={() => this.onChange}
                                                            ref={this.recaptchaRef}

                                                        />
                                                    </div>


                                                    <div className="text-center">
                                                    {this.state.isLoading ?
                                                        <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                                                        :<button id="login" className="btn_Green mt-3 admin-button-login" onClick={this.userPasslogin} >ورود</button>  }
                                                        </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                            
                        </div>

                    </div>

            )
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Login as any);
