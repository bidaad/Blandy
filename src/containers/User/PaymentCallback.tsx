import React, { useEffect, useState } from 'react'
import { APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';

import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

type PaymentCallbackProps =
UserInfo.UserInfoState &
{ match: any, location: any, history: any } &
typeof UserInfo.actionCreators;
;

const PaymentCallback = (props: PaymentCallbackProps) => {
    console.log(props.location.pathname);
    var strLocation: string = props.location.pathname;
    var n: number = strLocation.search(/invoiceid/i);
    const invoiceId = strLocation.substr(n + 10)

    const [message, setMessage] = useState('')

    
    useEffect(() => {
        function verifyPayment(InvoiceId: string) {
            const data = {
                InvoiceId: InvoiceId,
            };
    
            fetch(APIUrl + '/Payment/CallBackPayment', {
                method: 'POST',
                headers: {
                    'ut':'1',
                    'Content-Type': 'application/json',
                    lang: props.lang.abr,
                },
                body: JSON.stringify(data),
    
            }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
                if(responseModel.messageCode === 0)
                {
                    props.emptyBasket();
                }
                setMessage(responseModel.message)
                return;
            }).catch(
                error => {
                    console.log(error);
                }
            );
        }
        
        verifyPayment(invoiceId);
    }, []);

    return (
        <div>
            Payment Callback
            <div>
                {message}
            </div>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(PaymentCallback as any);
