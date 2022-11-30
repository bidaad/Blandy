import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBillOLBKShipStatus } from '../model/viewModel/VwBillOLBKShipStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/BillOLBKShipStatus/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBillOLBKShipStatus>(entityBase.BILLOLBKSHIPSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.BILLOLBKSHIPSTATUS,pageSize),
    editData:(id?: string)=> editData<VwBillOLBKShipStatus>(entityBase.BILLOLBKSHIPSTATUS,id, "billolbkshipstatus"),
    newData: (id: string) => newData<VwBillOLBKShipStatus>(entityBase.BILLOLBKSHIPSTATUS, id, "billolbkshipstatus"),
    saveData: (data: any)=>saveData<VwBillOLBKShipStatus>(entityBase.BILLOLBKSHIPSTATUS,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwBillOLBKShipStatus>(entityBase.BILLOLBKSHIPSTATUS,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwBillOLBKShipStatus>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwBillOLBKShipStatus> | undefined, incomingAction: KnownAction<VwBillOLBKShipStatus>) => reduc<VwBillOLBKShipStatus>(state, incomingAction, entityBase.BILLOLBKSHIPSTATUS)


