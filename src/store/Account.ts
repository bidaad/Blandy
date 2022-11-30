import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAccount } from '../model/viewModel/VwAccount';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/Account/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAccount>(entityBase.ACCOUNT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.ACCOUNT,pageSize),
    editData:(id?: string)=> editData<VwAccount>(entityBase.ACCOUNT,id, "account"),
    saveData: (data: any)=>saveData<VwAccount>(entityBase.ACCOUNT,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwAccount>(entityBase.ACCOUNT,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwAccount>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwAccount> | undefined, incomingAction: KnownAction<VwAccount>)=>reduc<VwAccount>(state,incomingAction, entityBase.ACCOUNT)


