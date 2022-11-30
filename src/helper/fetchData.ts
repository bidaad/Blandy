import { responseModel } from "../model/general/responseModel";
import { MessageTypes } from "../model/general";
import history from '../history';

export type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export async function fetchData<T>(url: any, method: methods, props: any, isMessage: boolean, data?: any | any[], token?: any, contentType?: any, lang?: any) {
    if (!contentType) {
        contentType = 'application/json;charset=UTF-8';
    }
    if (data) {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': contentType,
                'lang': lang,
            },
            body: JSON.stringify(data)
        })
        .catch(
            error => {
                if (error.status === 401) {
                    history.push('/adminlogin');
                    return error;
                }
            }
        );
        const body = await response.json();
        if (isMessage) {
            if (body) {
                if (body.messageCode === 0) {
                    props.addMessage([]);
                    props.addMessage([{ msg: body.message, msgType: MessageTypes.Success }]);
                }
                else {
                    props.addMessage([]);
                    props.addMessage([{ msg: body.message, msgType: MessageTypes.Error }]);
                }
            }

        }
        return body;
    } else {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': contentType,
                'lang': lang,
            }
        }).catch(
            error => {
                if (error.status === 401) {
                    history.push('/adminlogin');
                    return error;
                }
            }
        );
        const body = await response.json();
        if (isMessage) {
            if (body) {
                if (body.messageCode === 0) {
                    props.addMessage([]);
                    props.addMessage([{ msg: body.message, msgType: MessageTypes.Success }]);
                }
                else {
                    props.addMessage([]);
                    props.addMessage([{ msg: body.message, msgType: MessageTypes.Error }]);
                }
            }
        }
        
        return body;
    }
}
