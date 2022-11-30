import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwCurrencyExchange } from '../model/viewModel/VwCurrencyExchange';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/CurrencyExchange/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwCurrencyExchange>(entityBase.CURRENCYEXCHANGE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CURRENCYEXCHANGE, pageSize),
    newData: (id: string) => newData<VwCurrencyExchange>(entityBase.CURRENCYEXCHANGE, id, "currencyexchange"),
    editData: (id?: string) => editData<VwCurrencyExchange>(entityBase.CURRENCYEXCHANGE, id, "currencyexchange"),
    saveData: (data: any) => saveData<VwCurrencyExchange>(entityBase.CURRENCYEXCHANGE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwCurrencyExchange>(entityBase.CURRENCYEXCHANGE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwCurrencyExchange>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwCurrencyExchange> | undefined, incomingAction: KnownAction<VwCurrencyExchange>) => reduc<VwCurrencyExchange>(state, incomingAction, entityBase.CURRENCYEXCHANGE)


