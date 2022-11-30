import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwMessageLang } from '../model/viewModel/VwMessageLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/MESSAGELANG/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwMessageLang>(entityBase.MESSAGELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.MESSAGELANG,pageSize),
    newData:(id: string)=> newData<VwMessageLang>(entityBase.MESSAGELANG,id, "messagelangs"),
    editData:(id?: string)=> editData<VwMessageLang>(entityBase.MESSAGELANG,id, "messagelangs"),
    saveData: (data: any)=>saveData<VwMessageLang>(entityBase.MESSAGELANG,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwMessageLang>(entityBase.MESSAGELANG,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwMessageLang>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};


export const reducer=(state: stateBase<VwMessageLang> | undefined, incomingAction: KnownAction<VwMessageLang>)=>reduc<VwMessageLang>(state,incomingAction, entityBase.MESSAGELANG)


