import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPayment } from '../model/viewModel/VwPayment';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/Payment/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwPayment>(entityBase.PAYMENT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.PAYMENT,pageSize),
    editData:(id?: string)=> editData<VwPayment>(entityBase.PAYMENT,id, "payment"),
    saveData: (data: any)=>saveData<VwPayment>(entityBase.PAYMENT,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwPayment>(entityBase.PAYMENT,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwPayment>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwPayment> | undefined, incomingAction: KnownAction<VwPayment>)=>reduc<VwPayment>(state,incomingAction, entityBase.PAYMENT)


