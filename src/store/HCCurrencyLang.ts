import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCCurrencyLang } from '../model/viewModel/VwHCCurrencyLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCCurrencyLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCCurrencyLang>(entityBase.HCCURRENCYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCURRENCYLANG, pageSize),
    newData: (id: string) => newData<VwHCCurrencyLang>(entityBase.HCCURRENCYLANG, id, "hccurrencylang"),
    editData: (id?: string) => editData<VwHCCurrencyLang>(entityBase.HCCURRENCYLANG, id, "hccurrencylang"),
    saveData: (data: any) => saveData<VwHCCurrencyLang>(entityBase.HCCURRENCYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCCurrencyLang>(entityBase.HCCURRENCYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCCurrencyLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCCurrencyLang> | undefined, incomingAction: KnownAction<VwHCCurrencyLang>) => reduc<VwHCCurrencyLang>(state, incomingAction, entityBase.HCCURRENCYLANG)


