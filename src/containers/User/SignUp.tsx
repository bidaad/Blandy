import React, { Component } from 'react'
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { responseModel } from '../../model/general/responseModel';
import MsgBox from '../../components/MsgBox';
import { APIUrl } from '../../helper/config';
import { ShowMessage } from '../../components/ShowMessage';
import { VwSysConfig } from '../../model/viewModel/VwSysConfig';


type SignUpProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    { match: any, location: any, history: any } &
    RouteComponentProps<{}>;

class SignUp extends Component<SignUpProps, {
    firstName: string, lastName: string, mobile: string, isLoading: boolean, acceptTerms: boolean, modalNotification: boolean,
    password: string, success: boolean, confirmPassword: string, passwordType: string,
    msgConfirmPassword: string | undefined, msgTerms: string | undefined, step: number, counter: number, challengeCode: string, modal: boolean, classError: string
    msgFirstName: string | undefined, msgLastName: string | undefined, msgMobile: string | undefined, msgPassword: string | undefined, showCounter: boolean, userId: string |undefined
}> {
    constructor(props: any) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            mobile: '',
            password: '',
            confirmPassword: '',
            success: false,
            passwordType: 'password',
            msgFirstName: undefined,
            msgLastName: undefined,
            msgMobile: undefined,
            msgPassword: undefined,
            msgConfirmPassword: undefined,
            msgTerms: undefined,
            isLoading: false,
            acceptTerms: false,
            step: 1,
            counter: 60,
            challengeCode: '',
            modal: false,
            classError: '',
            showCounter: true,
            modalNotification: false,
            userId:undefined
        };
    };


    componentDidMount() {
        console.log('counter=' + this.state.counter);
        setTimeout(() => {
            let s = this.state.counter;
            console.log('s=' + this.state.counter);
            if (s === 0) {

                this.setState({ showCounter: false });
                return false;
            }
            else {
                this.setState({ counter: this.state.counter - 1 });
            }

        }, 1000);
    }

    componentDidUpdate() {
        console.log('update counter' + this.state.counter);
        if (this.state.counter > 0) {
            setTimeout(() => {
                let s = this.state.counter;
                if (s === 0) {

                    this.setState({ showCounter: false });
                    return false;
                }
                else {
                    this.setState({ counter: this.state.counter - 1 });
                }

            }, 1000);
        }

    }
    handleMobile = (event: any) => {
        this.setState({ mobile: event.target.value })
    }

    handleTerms = (event: any) => {
        if(event.target.checked)
            this.setState({ acceptTerms: true })
        else
            this.setState({ acceptTerms: false })
    }
    handleOk = () => {
        this.setState({ acceptTerms: true, modal: false })
    }
    handleNotOk = () => {
        this.setState({ acceptTerms: false, modal: false })
    }
    handlePermisionNotification = (event: any) => {
        
        let n = event.currentTarget.dataset.permision;
        if (n === "1") {
            n = true;
        }
        else {
            n = false;
        }

        let data: VwSysConfig = { userId: this.state.userId, isActive: true, notificationSendAllow: n as boolean };
        fetch(APIUrl + '/SysConfig/Save', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                this.setState({ isLoading: false })
                
                if (responseModel.messageCode !== 0) {
                    this.setState({ msgMobile: responseModel.message ,modalNotification:false});
                    return;
                }
                else {

                    this.setState({ step: 3, modalNotification: false });
                }
            })
            .catch(
                () => {
                    this.setState({ isLoading: false ,modalNotification:false })
                }
            );
    }
    // handleFirstName = (event: any) => {
    //     this.setState({ firstName: event.target.value });
    //     if (event.target.value !== '')
    //         this.setState({ msgFirstName: undefined });
    //     else
    //         this.setState({ msgFirstName: 'لطفا نام را وارد کنید' })
    // }
    // handleLastName = (event: any) => {
    //     this.setState({ lastName: event.target.value });
    //     if (event.target.value !== '')
    //         this.setState({ msgLastName: undefined });
    //     else
    //         this.setState({ msgLastName: 'لطفا نام خانوادگی را وارد کنید' })

    // }

    handlePassword = (event: any) => {
        this.setState({ password: event.target.value });
        if (event.target.value !== '')
            this.setState({ msgPassword: undefined });

    }
    handleConfirmPassword = (event: any) => {
        this.setState({ confirmPassword: event.target.value })
    }

    handleChallengeCode = (event: any) => {
        this.setState({ challengeCode: event.target.value })

        if (event.target.value.length === 4)
            this.checkChallenge(event.target.value)
    }

    

    ValidateMobile = (mobile: string) => {
        console.log('mobile=' + mobile);

        if (/^\d{11}$/.test(mobile)) {
            return true
        }
        return false
    }

    doCounter = (init: number) => {
        this.setState({ counter: init })
        setTimeout(() => {
            if (this.state.counter > 0)
                this.doCounter(this.state.counter - 1);
        }, 1000);

    }

    gotoLogin = () => {
        const { history } = this.props;

        history.push({
            pathname: '/userlogin',
        })

    }

    submit = () => {

        const mobile = this.state.mobile;
        const password = this.state.password;
        
        if (!this.state.mobile) {
            if (!this.ValidateMobile(this.state.mobile)) {
                this.setState({ msgMobile: 'لطفا شماره تلفن همراه را وارد کنید' });
                return;
            }
            else
                this.setState({ msgMobile: undefined });
        }
        if (this.state.mobile !== '') {
            if (!this.ValidateMobile(this.state.mobile)) {
                this.setState({ msgMobile: 'شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید.' });
                return;
            }
            else
                this.setState({ msgMobile: undefined });
        }
        else
            this.setState({ msgMobile: undefined });


        if (this.state.password === '') {
            this.setState({ msgPassword: 'لطفا کلمه عبور را وارد کنید' });
            return;
        }
        else
            this.setState({ msgPassword: undefined });

        if (this.state.password.trim().length < 6) {
            this.setState({ msgPassword: 'کلمه عبور حداقل 6 حرف یا اعداد انگلیسی باشد. ' });
            return;
        }
        else
            this.setState({ msgPassword: undefined });

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ msgConfirmPassword: 'کلمه عبور و تایید کلمه عبور یکی نیستند' });
            return;
        }
        else
            this.setState({ msgConfirmPassword: undefined });

        if (!this.state.acceptTerms) {
            this.setState({ msgTerms: 'لطفا توافقنامه حریم خصوصی و قوانین و شرایط استفاده از سرویس را تایید کنید' });
            return;
        }
        else
            this.setState({ msgTerms: undefined });

        console.log('mobile=' + mobile);



        const data = {
            // firstName: firstName,
            // lastName: lastName,
            username: mobile,
            password: password,
        };
        this.setState({ isLoading: true })
        fetch(APIUrl + '/User/SignUp', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                this.setState({ isLoading: false })
                //console.log('messageCode=' + responseModel.messageCode);

                if (responseModel.messageCode !== 0) {
                    //this.props.addMessage({ msg: responseModel.message, msgType: MessageTypes.Error });
                    this.setState({ msgMobile: responseModel.message });
                    return;
                }
                else {

                    this.setState({ step: 2, counter: 60, userId: responseModel.keyId });
                }


                // const { history } = this.props;
                // console.log('pushing to home');

                // history.push({
                //     pathname: '/admin/home',
                //     userID: responseModel.data.id
                // })
            })
            .catch(
                error => {
                    console.log('error');

                    console.log(error);
                    this.setState({ isLoading: false })
                }
            );

    }

    showPassword = () => {
        //console.log(this.passwordRef.current.value);
        if (this.state.passwordType === 'password')
            this.setState({ passwordType: 'text' });
        else
            this.setState({ passwordType: 'password' });
    }

    checkChallenge = (challengeCode: string) => {
        const mobile = this.state.mobile;
        console.log('fffffff');
        this.setState({ classError: '' });

        this.setState({ isLoading: true })
        fetch(APIUrl + '/User/CheckChallenge/?mobile=' + mobile + '&challengeCode=' + challengeCode, {
            method: 'GET',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                this.setState({ isLoading: false })

                if (responseModel.messageCode !== 0) {
                    this.setState({ msgMobile: responseModel.message, classError: 'plfielderror' });
                    return;
                }
                else {
                    this.setState({modalNotification:true  });
                }

            })
            .catch(
                error => {
                    console.log('error');

                    console.log(error);
                    this.setState({ isLoading: false })
                }
            );
    }

    resendChallenge = () => {
        
        const data = {
            username: this.state.mobile,
            password: '***',
        };
        fetch(APIUrl + '/User/ResendCode', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                this.setState({ isLoading: false })

                if (responseModel.messageCode !== 0) {
                    this.setState({ msgMobile: responseModel.message });
                    return;
                }
                else {
                    this.setState({ step: 2, counter: 60 });
                }
            })
            .catch(
                error => {
                    console.log('error');

                    console.log(error);
                    this.setState({ isLoading: false })
                }
            );
    }

    editProfile = () => {
        const { history } = this.props;
        history.push('/user/profile')

    }

    gotoMainPage = () => {

    }


    render() {
        const Step1 = <div>
            {this.state.modal === true ?
                <div>
                    <div className="overlaySignUp">

                    </div>
                    <div className="SignUp-Modal">
                        <p>حقوق و قوانین استفاده از اتوچار</p>
                        <div><p>
                            قوانین
                </p>
                        </div>
                        <span className="SignUp-Modal-Row">
                            <button onClick={this.handleOk} >می پذیرم</button>
                            <button onClick={this.handleNotOk} > نمی پذیرم</button>
                        </span>
                    </div>
                </div>
                : null
            }

            <div>
                <div className="text-center text-small">
                    ثبت نام از طریق شماره تلفن همراه امکانپذیر است.
    </div>
                <div className="card-body"><div className="">

                    {/* <div className="form-group">

                    <div className="plfield ">
                        <input pattern="[A-Za-z]{3}" placeholder=" " type="text" title="لطفا فیلد نام را وارد کنید" required onChange={(e) => this.handleFirstName(e)} className="pl-input form-control" id="staticName" />
                        <span className="grow">نام</span>

                    </div>
                    <ShowMessage msg={this.state.msgFirstName} />
                </div> */}

                    {/* <div className="form-group">
                    <div className="plfield ">
                        <input type="text" placeholder=" " title="لطفا فیلد نام خانوادگی را وارد کنید" required onChange={(e) => this.handleLastName(e)} className="pl-input form-control" id="staticFamily" />
                        <span className="grow">نام خانوادگی</span>
                    </div>
                    <ShowMessage msg={this.state.msgLastName} />
                </div> */}
                    <div className=" form-group">
                        <div className="plfield ">
                            <input type="text" placeholder=" " title="لطفا فیلد شماره موبایل  را وارد کنید" required onChange={(e) => this.handleMobile(e)} className="pl-input form-control ltr-control txt-mobile" id="staticEmail" />
                            <span className="grow">شماره موبایل </span>
                            <i className="icon-cellphone fa fa-mobile"></i>
                            
                        </div>
                        <ShowMessage msg={this.state.msgMobile} />
                    </div>
                    <div className="form-group">
                        <div className="plfield password-conatiner">
                            <input type={this.state.passwordType} autoComplete="new-password" placeholder=" " title="لطفا فیلد کلمه عبور را وارد کنید" required onChange={(e) => this.handlePassword(e)} className="pl-input form-control ltr-control txt-password" id="staticPassword" />
                            <span className="grow">کلمه عبور</span>
                            <i className="icon-lock fa fa-lock"></i>
                            <button onClick={this.showPassword} className="icon-eye fa fa-eye"></button>
                        </div>
                        <ShowMessage msg={this.state.msgPassword} />
                    </div>
                    <div className="form-group">

                        <div className="plfield ">
                            <input type="Password" autoComplete="new-password" placeholder=" " title="لطفا فیلد تکرار کلمه عبور را وارد کنید" required onChange={(e) => this.handleConfirmPassword(e)} className="pl-input form-control ltr-control txt-mobile" id="staticPassword" />
                            <span className="grow">تایید کلمه عبور</span>
                            <i className="icon-lock fa fa-lock"></i>

                        </div>
                        <ShowMessage msg={this.state.msgConfirmPassword} />
                    </div>
                    <div className="text-center privacy checkboxes">
                        <label>
                            <input onChange={this.handleTerms} type="checkbox" checked={this.state.acceptTerms}></input>
                            
                            <span onClick={() => this.setState({modal: true})}>
                                حریم خصوصی و قوانین و شرایط استفاده از سرویس وبسایت اتوچار را می پذیرم.
                            </span>
                            
                        </label>
                    </div>
                    <div className="text-center">
                        <ShowMessage msg={this.state.msgTerms} />
                    </div>

                    {!this.state.success ?
                        <div className="text-center p-2">
                            {this.state.isLoading ?
                                <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                                : <button className="btn-signup btn btn-info w-25 w-100" onClick={this.submit} >ثبت نام</button>
                            }
                        </div>
                        : null}
                    {/* <div className="text-center p-2">
                    <button className="btn-primary btn btn-info w-25 w-100" onClick={this.gotoLogin} >ورود</button>
                </div> */}

                </div>
                </div>
            </div>
        </div>
        const Step2 = <div>
            {
                this.state.modalNotification === true ?
                    <div>
                        <div className="overlaySignUp">
                        </div>
                        <div className="Notification-Modal">
                            <p>آیا تمایل دارید تا اعلان های اتوچار برایتان نمایش داده شود؟</p>
                            <span className="Notification-Modal-Row">
                                <button onClick={this.handlePermisionNotification} data-permision="1" >بله</button>
                                <button onClick={this.handlePermisionNotification} data-permision="2"> خیر </button>
                            </span>
                        </div>
                    </div> :
                    null
            }

            <div className="card-body" >
                <div className="text-center msg-step2 ">
                    <span>کد تایید ثبت نام به شماره تلفن همراه {this.state.mobile} ارسال شد.  </span>
                </div>
                <div className="mt-5 form-group">
                    <div className={"plfield " + this.state.classError}>
                        <input type="text" placeholder=" " maxLength={4} title="کد تایید دریافتی" required onChange={(e) => this.handleChallengeCode(e)} className="pl-input form-control ltr-control txt-challenge" id="staticEmail" />
                        <span className="grow">کد تایید دریافتی</span>
                        <i className="icon-challenge fa fa-envelope"></i>
                        <div className="underline-container">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <ShowMessage msg={this.state.msgMobile} />
                </div>
                <div className="clearfix"></div>
                <div className="mt-5 form-group">
                    {
                        this.state.isLoading ?
                            <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                            :
                            this.state.counter !== 0 ?
                                <button disabled className="btn-resend-challenge btn btn-info w-25 w-100" >ارسال مجدد کد تایید {this.state.counter} ثانیه</button>
                                :
                                <button className="btn-resend-challenge-orgin btn btn-info w-25 w-100" onClick={this.resendChallenge} >ارسال مجدد کد تایید</button>
                    }
                </div>
                <div className="form-group">
                    <button className="btn-back btn btn-info w-25 w-100" onClick={() => this.setState({ step: 1 })} >بازگشت</button>
                </div>
            </div>
        </div>

        const Step3 =
            <div className="card-body " >
                <div className="text-center msg-step3 outer-center">
                    <div className="check-container inner-center"><i className="fa fa-check"></i></div>
                    <div>
                        <span>کاربر گرامی ثبت نام شما با موفقیت انجام شد.</span>
                    </div>
                </div>

                <div className="clearfix"></div>
                <div className="mt-5 form-group">
                    <button className="btn-resend-challenge-orgin btn btn-info w-25 w-100" onClick={this.editProfile} >تکمیل پروفایل</button>
                </div>
                <div className="form-group">
                    <button className="btn-back btn btn-info w-25 w-100" onClick={this.gotoMainPage} >صفحه اصلی</button>
                </div>
            </div>
        return (
            <div className="login-container" >
                <div className="signup ">
                    <div className="">
                        <div className="shadow rtl card">
                            <MsgBox />
                            <div className="mt-3 w-100 text-center outer-center">
                                <div className="inner-center logo"></div>
                            </div>
                            <div className="text-center caption-header">ثبت نام در اتوچار</div>
                            {this.state.step === 1 ? Step1 : null}
                            {this.state.step === 2 ? Step2 : null}
                            {this.state.step === 3 ? Step3 : null}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(SignUp as any);






