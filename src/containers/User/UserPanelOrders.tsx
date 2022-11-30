import React, { useEffect, useState } from 'react'
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';
import { VwBooking } from '../../model/viewModel/VwBooking';
import changeEnc from '../../helper/changeEnc';
import { useHistory } from 'react-router';

type UserPanelOrdersProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;

const UserPanelOrders = (props: UserPanelOrdersProps) => {
    let history = useHistory();

    //var counter: number = 1
    const [isLoading, setIsLoading] = useState(true)
    const [Orders, setOrders] = useState<VwBooking[]>([])



    function gotoProduct() {
        history.push("/");
    }

    useEffect(() => {
        const getUserOrders = () => {
            fetch(APIUrl + '/User/Orders', {
                method: 'POST',
                headers: {
                'ut':'1',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                    lang: props.lang.abr,
                },

            }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
                setIsLoading(false)
                setOrders(responseModel.data);
            }).catch(
                error => {
                    console.log(error);
                }
            );
        }
        getUserOrders();
    }, []);

    const gotoShowOrder = (Id: string) => {
        history.push('/user/orders/' + Id)
    }


    const View1 =
        <div>
            {
                Orders !== null ?
                    Orders.length === 0 ?
                        <div className="large-message-box mt-3 ">
                            <div className="text-right">
                                سفارش های من
                    </div>
                            <div className="large-message">
                                موردی برای نمایش وجود ندارد !
                    </div>
                            <div className="mt-3">
                                <button onClick={() => gotoProduct()} className="btn btn-orange">مشاهده محصولات</button>
                            </div>
                        </div>
                        :
                        <div className=" w-100 mt-3">
                            <div className="user-small-info">
                                <img src={require("../../img/user/basket.png")} alt="basket" className="" />&nbsp;
                    وضعیت سفارشات


                        <table className="tblOrders-brief inner-center">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                            </th>
                                            <th>
                                                شماره سفارش
                            </th>
                                            <th>
                                                تعداد کالا
                            </th>
                                            <th>
                                                وضعیت سفارش
                            </th>
                                            <th>
                                                پیگیری
                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Orders.map((item: VwBooking, index) =>
                                                <tr key={item.code}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.code}</td>
                                                    <td>{changeEnc(item.assetCount.toString())}</td>
                                                    <td>{item.bookingStatusSign}</td>
                                                    <td className="hand" onClick={() => gotoShowOrder(item.id)}>
                                                        <i className="user-menu-header fa fa-angle-left"></i>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    : null}
        </div>



    return (
        <div>
            {
                isLoading ?
                    <div className="spinner-grow text-danger" role="status"><span className="sr-only">Loading...</span></div>
                    :
                    View1
            }


        </div>
    )
}


export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(UserPanelOrders as any);
