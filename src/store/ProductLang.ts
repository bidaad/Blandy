import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwProductLang } from '../model/viewModel/VwProductLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/ProductLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwProductLang>(entityBase.PRODUCTLANG, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PRODUCTLANG, pageSize),
    newData: (id: string) => newData<VwProductLang>(entityBase.PRODUCTLANG, id, "productlangs"),
    editData: (id?: string) => editData<VwProductLang>(entityBase.PRODUCTLANG, id, "productlangs"),
    saveData: (data: any) => saveData<VwProductLang>(entityBase.PRODUCTLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwProductLang>(entityBase.PRODUCTLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwProductLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwProductLang> | undefined, incomingAction: KnownAction<VwProductLang>) => reduc<VwProductLang>(state, incomingAction, entityBase.PRODUCTLANG)


