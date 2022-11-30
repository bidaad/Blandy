import React, { Component, Fragment } from 'react'
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MessageTypes } from '../../model/general';
import { responseModel } from '../../model/general/responseModel';
import { APIUrl } from '../../helper/config';


type ChangePassProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    { match: any, location: any, history: any } &
    RouteComponentProps<{}>;

class ChangePass extends Component<ChangePassProps, {
    view: number,
    isLoading: boolean,
    success: boolean,

    passwordType: string,
    currentPassword: string,
    password: string,
    confirmPassword: string,
    msgPassword: string | undefined,
    msgConfirmPassword: string | undefined,
    msgCurrentPassword: string | undefined,
    activeSave: boolean


}> {
    constructor(props: any) {
        super(props)

        this.state = {
            view: 1,
            success: false,
            isLoading: false,

            passwordType: 'password',
            msgPassword: undefined,
            msgConfirmPassword: undefined,
            msgCurrentPassword: undefined,
            currentPassword: '',
            password: '',
            confirmPassword: '',
            activeSave: false,

        };
    };

    showPassword = () => {
        //console.log(this.passwordRef.current.value);
        if (this.state.passwordType === 'password')
            this.setState({ passwordType: 'text' });
        else
            this.setState({ passwordType: 'password' });
    }

    handlePassword = (event: any) => {
        this.setState({ password: event.target.value });
        if (event.target.value !== '')
            this.setState({ msgPassword: undefined });
        if (event.target.value !== '' && this.state.password !== '' && this.state.confirmPassword !== '')
            this.setState({ activeSave: true })
        else
            this.setState({ activeSave: false })

    }


    handleCurrentPassword = (event: any) => {
        this.setState({ currentPassword: event.target.value });
        if (event.target.value !== '')
            this.setState({ msgCurrentPassword: undefined });
        if (event.target.value !== '' && this.state.currentPassword !== '' && this.state.confirmPassword !== '')
            this.setState({ activeSave: true })
        else
            this.setState({ activeSave: false })

    }


    handleConfirmPassword = (event: any) => {
        this.setState({ confirmPassword: event.target.value })
        if (event.target.value !== '' && this.state.currentPassword !== '' && this.state.password !== '')
            this.setState({ activeSave: true })
        else
            this.setState({ activeSave: false })
    }



    gotoUserPanel = () => {
        const { history } = this.props;

        history.push({
            pathname: '/user/panel',
        })

    }


    saveInfo = () => {
        this.setState({
            msgPassword: undefined,
            msgConfirmPassword: undefined,
            msgCurrentPassword: undefined,
        });

        const currentPassword = this.state.currentPassword;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (currentPassword === '') {
            this.setState({ msgCurrentPassword: 'لطفا کلمه عبور فعلی را وارد کنید' });
            return;
        }

        if (password === '') {
            this.setState({ msgPassword: 'لطفا کلمه عبور جدید را وارد کنید' });
            return;
        }

        if (password.trim().length < 6) {
            this.setState({ msgPassword: 'طول کلمه عبور نباید کمتر از شش کاراکتر باشد' });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({ msgConfirmPassword: 'کلمه عبور و تایید کلمه عبور یکی نیستند' });
            return;
        }

        console.log('token=' + this.props.token);


        const data = {
            lang: this.props.lang.abr,
            currentPassword: currentPassword,
            newpassword: password,

        };
        this.setState({ isLoading: true })
        fetch(APIUrl + '/User/LoggedChangePassword', {
            method: 'POST',
            headers: {
                'ut':'1',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
            },
            body: JSON.stringify(data),
        })
            .then(response => { this.props.checkStatus(response);  return response})
            .then(response => response.json() as Promise<responseModel>)
            .then(responseModel => {
                this.setState({ isLoading: false })
                if (responseModel.messageCode !== 0) {
                    this.props.addMessage([]);
                    this.props.addMessage([{ msg: responseModel.message, msgType: MessageTypes.Error }]);
                    return;
                }
                else {
                    //this.props.addMessage([]);
                    //this.props.addMessage([{ msg: responseModel.message, msgType: MessageTypes.Success }]);
                    this.setState({ view: 2 });
                }

            }).catch(
                error => {
                    console.log(error);
                    this.setState({ isLoading: false })
                    //this.props.addMessage([{ msg: error + '', msgType: MessageTypes.Error }]);
                }
            );

    }


    render() {
        const View1 =
            <div className="profile-change-pass card-body"><div className="">
                <div className="form-group">
                    <div className="plfield password-conatiner">
                        <input type={this.state.passwordType} placeholder=" " title="لطفا فیلد کلمه عبور فعلی را وارد کنید" required onChange={(e) => this.handleCurrentPassword(e)} className="pl-input form-control ltr-control txt-password" id="staticPassword" />
                        <span className="grow">کلمه عبور فعلی</span>
                        <i className="icon-lock fa fa-lock"></i>
                        <button onClick={this.showPassword} className="icon-eye fa fa-eye"></button>
                    </div>
                    <ShowMessage msg={this.state.msgCurrentPassword} />
                </div>


                <div className="form-group">
                    <div className="plfield password-conatiner">
                        <input type={this.state.passwordType} placeholder=" " title="لطفا فیلد کلمه عبور جدید را وارد کنید" required onChange={(e) => this.handlePassword(e)} className="pl-input form-control ltr-control txt-password" id="staticPassword" />
                        <span className="grow">کلمه عبور جدید</span>
                        <i className="icon-lock fa fa-lock"></i>
                        <button onClick={this.showPassword} className="icon-eye fa fa-eye"></button>
                    </div>
                    <ShowMessage msg={this.state.msgPassword} />
                </div>
                <div className="form-group">

                    <div className="plfield ">
                        <input type="Password" placeholder=" " title="لطفا فیلد تکرار کلمه عبور جدید را وارد کنید" required onChange={(e) => this.handleConfirmPassword(e)} className="pl-input form-control ltr-control txt-mobile" id="staticPassword" />
                        <span className="grow">تایید تکرار کلمه عبور</span>
                        <i className="icon-lock fa fa-lock"></i>

                    </div>
                    <ShowMessage msg={this.state.msgConfirmPassword} />
                </div>

                <div className="row mt-35">
                    <div className="col">{this.state.isLoading ?
                        <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                        : <button className={this.state.activeSave ? "btn-active-changepass btn w-25 w-100" : "btn-gray btn w-25 w-100"} onClick={this.saveInfo} >ذخیره</button>
                    }</div>
                    <div className="col"><button className="btn-white btn w-25 w-100" onClick={this.gotoUserPanel} >انصراف</button></div>

                </div>
            </div>
            </div>

        const View2 =
            <Fragment>
                <div className="profile-change-pass m5 text-center msg-step3 outer-center">
                    <div className="check-container inner-center">
                        <img src={require('../../img/lock.png')} alt="" />
                    </div>
                    <div>
                        <span>کاربر گرامی :
                    تغییر کلمه عبور با موفقیت انجام شد.</span>
                    </div>
                    <div>

                    </div>

                </div>
                <button className="btn-green btn w-25 w-100 mt-3" onClick={this.gotoUserPanel} >متوجه شدم</button>
            </Fragment>
        return (
            <div className="ChangePass outer-center">
                <div className="inner-center">
                    <div className="shadow rtl card m-5">

                        <div className="text-center caption-header">
                        {<li onClick={() => this.props.history.push({pathname: '/user/panel',})} className="fa fa-arrow-right back-arrow"></li>}
                            تغییر کلمه عبور</div>
                        <div>
                            {this.state.view === 1 ? View1 : null}
                            {this.state.view === 2 ? View2 : null}

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
)(ChangePass as any);




class ShowMessage extends Component<{ msg: string | undefined }> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
    }

    render() {
        if (this.props.msg === undefined)
            return null;
        return (
            <div className="error">
                <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                {this.props.msg}
            </div>
        )
    }
}


