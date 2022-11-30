import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { faSortAlphaUp, faSortNumericUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseAccess, baseResource } from '../../model/general/baseAccess'
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import prImage from '../../img/product/Group207@3x.png';
export interface BestSellProps { controller: string, action: string, header: string }

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    BestSellProps;
class Modal extends Component<InputProps, { value: any }> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        // if (projectStrong.info.url && projectStrong.info.token && this.props.controller && this.props.action) {

        //     fetch(projectStrong.info.url +'/'+ this.props.controller + '/' + this.props.action + '?lang=', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer ' + projectStrong.info.token,
        //             // 'Content-Type': 'application/json;charset=UTF-8',
        //         }
        //     })
        //         .then(response => response.json() as responseModel | any)
        //         .then(mr => {
        //             if ((mr as responseModel).messageCode === 0) {
        //                 var data = (mr as responseModel).data;
        //             }
        //         });
        // }
    }
    public render() {
        return (
            <div className="Web_Footer">
                <div className="Web_Footer_Item" >
                    <ul>
                        <li className="li-Footer">درباره ما</li>
                        <hr className="hr-footer" />
                        <li className="li-Footer">قوانین و مقررات</li>
                        <hr className="hr-footer" />
                        <li className="li-Footer">سوالات متداول</li>
                    </ul>
                    <ul>
                        <li className="li-Footer">ارتباط با ما</li>
                        <hr className="hr-footer" />
                        <li className="li-Footer">+98 21 44444444</li>
                        <li className="li-Footer">+98 21 44444445</li>
                        <li className="li-Footer">info@TPHA.com </li>
                    </ul>

                </div>
                <div>
                    <div className="Web_Footer_Item-CopyRight">
                        <label className="CopyRight">کپی رایت کپی رایت کپی رایت کپی رایت کپی رایت کپی رایت کپی رایت کپی رایت  کپی رایت  کپی رایت</label>

                    </div>
                </div>
                <div>
                    <div className="Web_Footer_Item">
                        <div>
                            <label className="Lable_footer">: عضویت در خبرنامه</label>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="Web_Footer_Item">
                        <div>
                            <input type="text" className="Text_News" />
                        </div>
                        <div>
                            <button className="btn_News_footer">ارسال</button>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="Web_Footer_Item">
                        <div>
                            <label className="Lable_footer">: نصب اپلیکیشن نصب اپلیکیشن نصب اپلیکیشن</label>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="Web_Footer_Item">
                        <div>
                            <button className="btn_News_footer">کافه بازار</button>
                        </div>
                        <div>
                            <button className="btn_News_footer">گوگل پلی</button>
                        </div>
                        <div>
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
)(Modal as any);