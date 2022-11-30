import { requestAction ,setPageSize,editData,newData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPersonLang } from '../model/viewModel/VwPersonLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/PersonLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwPersonLang>(entityBase.PERSONLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.PERSONLANG,pageSize),
    newData:(id: string)=> newData<VwPersonLang>(entityBase.PERSONLANG,id, "personlangs"),
    editData:(id?: string)=> editData<VwPersonLang>(entityBase.PERSONLANG,id, "personlangs"),
    saveData: (data: any)=>saveData<VwPersonLang>(entityBase.PERSONLANG,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwPersonLang>(entityBase.PERSONLANG,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwPersonLang>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};


export const reducer=(state: stateBase<VwPersonLang> | undefined, incomingAction: KnownAction<VwPersonLang>)=>reduc<VwPersonLang>(state,incomingAction, entityBase.PERSONLANG)


