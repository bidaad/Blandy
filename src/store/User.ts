import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { VwUser } from '../model/viewModel/VwUser';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url=  APIUrl + "/User/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwUser>(entityBase.USER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.USER,pageSize),
    editData:(id?: string)=> editData<VwUser>(entityBase.USER,id, "users"),
    saveData: (data: any)=>saveData<VwUser>(entityBase.USER,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwUser>(entityBase.USER,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwUser>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer=(state: stateBase<VwUser> | undefined, incomingAction: KnownAction<VwUser>)=>reduc<VwUser>(state,incomingAction, entityBase.USER)


