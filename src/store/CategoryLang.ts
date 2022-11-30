import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwCategoryLang } from '../model/viewModel/VwCategoryLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/CategoryLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwCategoryLang>(entityBase.CATEGORYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CATEGORYLANG, pageSize),
    newData: (id: string) => newData<VwCategoryLang>(entityBase.CATEGORYLANG, id, "categorylangs"),
    editData: (id?: string) => editData<VwCategoryLang>(entityBase.CATEGORYLANG, id, "categorylangs"),
    saveData: (data: any) => saveData<VwCategoryLang>(entityBase.CATEGORYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwCategoryLang>(entityBase.CATEGORYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwCategoryLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwCategoryLang> | undefined, incomingAction: KnownAction<VwCategoryLang>) => reduc<VwCategoryLang>(state, incomingAction, entityBase.CATEGORYLANG)


