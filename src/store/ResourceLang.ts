import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwResourceLang } from '../model/viewModel/VwResourceLang';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/ResourceLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwResourceLang>(entityBase.RESOURCELANG, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.RESOURCELANG, pageSize),
    newData: (id: string) => newData<VwResourceLang>(entityBase.RESOURCELANG, id, "resourcelangs"),
    editData: (id?: string) => editData<VwResourceLang>(entityBase.RESOURCELANG, id, "resourcelangs"),
    saveData: (data: any) => saveData<VwResourceLang>(entityBase.RESOURCELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwResourceLang>(entityBase.RESOURCELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwResourceLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwResourceLang> | undefined, incomingAction: KnownAction<VwResourceLang>) => reduc<VwResourceLang>(state, incomingAction, entityBase.RESOURCELANG)


