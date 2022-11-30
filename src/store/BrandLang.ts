import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBrandLang } from '../model/viewModel/VwBrandLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/BrandLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwBrandLang>(entityBase.BRANDLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.BRANDLANG,pageSize),
    newData:(id: string)=> newData<VwBrandLang>(entityBase.BRANDLANG,id, "brandlangs"),
    editData:(id?: string)=> editData<VwBrandLang>(entityBase.BRANDLANG,id, "brandlangs"),
    saveData: (data: any)=>saveData<VwBrandLang>(entityBase.BRANDLANG,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwBrandLang>(entityBase.BRANDLANG,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwBrandLang>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer=(state: stateBase<VwBrandLang> | undefined, incomingAction: KnownAction<VwBrandLang>)=>reduc<VwBrandLang>(state,incomingAction, entityBase.BRANDLANG)


