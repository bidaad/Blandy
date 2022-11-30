import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwLoginHistory } from '../model/viewModel/VwLoginHistory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/LoginHistory/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwLoginHistory>(entityBase.LOGINHISTORY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.LOGINHISTORY,pageSize),
    editData:(id?: string)=> editData<VwLoginHistory>(entityBase.LOGINHISTORY,id, "loginhistory"),
    saveData: (data: any)=>saveData<VwLoginHistory>(entityBase.LOGINHISTORY,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwLoginHistory>(entityBase.LOGINHISTORY,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwLoginHistory>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwLoginHistory> | undefined, incomingAction: KnownAction<VwLoginHistory>)=>reduc<VwLoginHistory>(state,incomingAction, entityBase.LOGINHISTORY)


