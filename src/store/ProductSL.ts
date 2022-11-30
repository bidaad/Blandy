import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';

import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwProduct } from '../model/viewModel/VwProduct';
import { AppThunkAction } from '.';
import { responseModel } from '../model/general/responseModel';
import { MessageTypes } from '../model/general';

import * as UserActionCreator from './UserInfo';
const url= APIUrl + "/Product/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwProduct>(entityBase.PRODUCTSL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.PRODUCTSL,pageSize), 
    newData: (id: string) => newData<VwProduct>(entityBase.PRODUCTSL, id, "productssl"),
    editData:(id?: string)=> editData<VwProduct>(entityBase.PRODUCTSL,id, "productssl"),
    saveData: (data: any)=>saveData<VwProduct>(entityBase.PRODUCTSL,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwProduct>(entityBase.PRODUCTSL,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwProduct>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
    copyRecord: (id: string): AppThunkAction<KnownAction<string>> => {
        console.log('copyrecord');
        return (dispatch, getState) => {
            const appState = getState();
            if (appState ) {
                fetch(APIUrl + '/Product/CopyRecord?Id=' + id + '&lang=' + appState.userinfo.lang.abr, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + appState.userinfo.token,
                    }
                })
                    .then(response => response.json() as responseModel | any)
                    .then(res => {
                        
                        if ((res as responseModel).messageCode === 0) {
                            dispatch({ type: 'ADD_MESSAGE', message: [{ msg: res.message, msgType: MessageTypes.Success }] });
                        }
                    }).catch(
                        error => {
                            dispatch({ type: 'ADD_MESSAGE', message: [{ msg: 'بروز خطای غیر منتظره', msgType: MessageTypes.Error }] });
                            console.log(error);
                        }
                    );;

            }
        };
    },
};



export const reducer=(state: stateBase<VwProduct> | undefined, incomingAction: KnownAction<VwProduct>)=>reduc<VwProduct>(state,incomingAction, entityBase.PRODUCTSL)


