import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { VwPerson } from '../model/viewModel/VwPerson';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url=  APIUrl + "/Person/";
export const actionCreators = {
        requestList: (AM:AdminModelRequest)=>requestAction<VwPerson>(entityBase.PERSON,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.PERSON,pageSize),
    editData:(id?: string)=> editData<VwPerson>(entityBase.PERSON,id, "persons"),
    saveData: (data: any)=>saveData<VwPerson>(entityBase.PERSON,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwPerson>(entityBase.PERSON,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwPerson>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer=(state: stateBase<VwPerson> | undefined, incomingAction: KnownAction<VwPerson>)=>reduc<VwPerson>(state,incomingAction, entityBase.PERSON)


