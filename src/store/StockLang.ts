import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwStockLang } from '../model/viewModel/VwStockLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/StockLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwStockLang>(entityBase.STOCKLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.STOCKLANG, pageSize),
    newData: (id: string) => newData<VwStockLang>(entityBase.STOCKLANG, id, "stocklang"),
    editData: (id?: string) => editData<VwStockLang>(entityBase.STOCKLANG, id, "stocklang"),
    saveData: (data: any) => saveData<VwStockLang>(entityBase.STOCKLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwStockLang>(entityBase.STOCKLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwStockLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwStockLang> | undefined, incomingAction: KnownAction<VwStockLang>) => reduc<VwStockLang>(state, incomingAction, entityBase.STOCKLANG)


