import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBillOfLadingPayment } from '../model/viewModel/VwBillOfLadingPayment';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/BillOfLadingPayment/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBillOfLadingPayment>(entityBase.BILLOFLADINGPAYMENT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.BILLOFLADINGPAYMENT,pageSize),
    editData:(id?: string)=> editData<VwBillOfLadingPayment>(entityBase.BILLOFLADINGPAYMENT,id, "billofladingpayment"),
    saveData: (data: any)=>saveData<VwBillOfLadingPayment>(entityBase.BILLOFLADINGPAYMENT,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwBillOfLadingPayment>(entityBase.BILLOFLADINGPAYMENT,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwBillOfLadingPayment>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};


export const reducer=(state: stateBase<VwBillOfLadingPayment> | undefined, incomingAction: KnownAction<VwBillOfLadingPayment>)=>reduc<VwBillOfLadingPayment>(state,incomingAction, entityBase.BILLOFLADINGPAYMENT)


