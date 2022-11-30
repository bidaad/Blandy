import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssignment } from '../model/viewModel/VwAssignment';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/Assignment/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssignment>(entityBase.ASSIGNMENT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.ASSIGNMENT,pageSize),
    editData:(id?: string)=> editData<VwAssignment>(entityBase.ASSIGNMENT,id, "assignment"),
    saveData: (data: any)=>saveData<VwAssignment>(entityBase.ASSIGNMENT,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwAssignment>(entityBase.ASSIGNMENT,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwAssignment>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwAssignment> | undefined, incomingAction: KnownAction<VwAssignment>)=>reduc<VwAssignment>(state,incomingAction, entityBase.ASSIGNMENT)


