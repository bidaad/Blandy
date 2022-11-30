import React, { useEffect, useRef, useState } from 'react'
import IncDec from '../../components/IncDec';
import { connect } from 'react-redux';
import formatAndEncCurrency from '../../helper/formatCurrency';
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { APIImage } from '../../helper/config';
import { useHistory, Link } from 'react-router-dom'
import { NavLink } from 'reactstrap';

type SmallBasketProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators;

function useOutsideAlerter(ref: any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            try {
                if (event.target.className !== undefined && event.target.className !== null) {
                    console.log(event.target);

                    if (event.target.className.indexOf('fa-shopping-cart') !== -1) {
                        console.log('set tiny');

                        ref.current.className = 'tiny-basket';
                        return;
                    }
                }
                if (ref.current && !ref.current.contains(event.target)) {
                    //;
                    console.log('classname1=' + event.target);

                    ref.current.className = 'd-none'
                }
                else
                    ref.current.className = 'tiny-basket'
            }
            catch{

            }

        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const SmallBasket = (props: SmallBasketProps) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [totalAmount, setTotalamount] = useState(0)
    //const [totalPrice, settotalPrice] = useState(0)
    const [updateMyBasket, setupdateMyBasket] = useState(false)
    let history = useHistory();

    useEffect(() => {
        var totalDelivery: number = 0;
        console.log('effect');
        var totalPrice = 0
        for (let i = 0; i < props.basket.length; i++) {
            totalPrice = totalPrice + ( (props.basket[i].price/10) * props.basket[i].count);
        }
        //settotalPrice(totalPrice);
        setTotalamount(totalPrice + totalDelivery);

    }, [updateMyBasket, props.basket]);


    function gotoShipping() {
        history.push('/shopping/basket');
    }

    // function RemoveNode(id: string) {
    //     return props.basket.filter(function (element) {
    //         if (element.id === id) {
    //             return true;
    //         }
    //         return false;
    //     });
    // }

    function removeItem(id: string) {
        props.removeFromBasket(id);
        setupdateMyBasket(!updateMyBasket);
        //RemoveNode(id)
    }

    function updateCount(Id: string, newCount: number) {
        props.updateBasket(Id, newCount);
        setupdateMyBasket(!updateMyBasket);

    }

    return (
        <div ref={wrapperRef} className="tiny-basket">
            <div className="flex-50 text-center w-100">

                <div className="basket-view2">
                    {props.basket.length > 0 ?
                        <div>
                            <div className="text-left w-100">
                                <div className="basket-items-container">
                                    {props.basket.map(item =>
                                        <div key={item.id} className="basket-single-item position-relative flex-container">
                                            <div className="remove-from-basket" onClick={() => removeItem(item.id)}><i className="fa fa-times-circle"></i></div>
                                            <div >
                                                <img src={APIImage + '/' + item.picture}
                                                    alt="basket" className="product-basket-small" />
                                            </div>
                                            <div className="w-100">
                                                <div className="mb-3 pro-title">
                                                    <NavLink tag={Link} to={"/product/" + item.id+ '/' + item.title.replace(/\s+/g, '-')}>
                                                        {item.title}
                                                    </NavLink>
                                                </div>
                                                <div className="mb-3 price">
                                                    {formatAndEncCurrency((item.price/10).toString())} تومان
                                            </div>
                                                <div className="mb-3 text-left">
                                                    <IncDec initVal={item.count} UpdateCount={(newCount) => updateCount(item.id, newCount)} />
                                                </div>


                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-left w-100">
                                <div className="">
                                    <table className="tbl-basket-summary">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    مبلغ قابل پرداخت :
                                                </td>
                                                <td>
                                                    {formatAndEncCurrency(totalAmount.toString())} تومان
                                                 </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center">
                                    <button onClick={() => gotoShipping()} className="btn btn-orange " >ثبت سفارش</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            سبد خرید خالی است
                        </div>
                    }
                </div>

            </div>
        </div >
    )
}


export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(SmallBasket as any);
