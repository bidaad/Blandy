import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCCurrency } from '../model/viewModel/VwHCCurrency';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCCurrency/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCCurrency>(entityBase.HCCURRENCY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCURRENCY, pageSize),
    newData: (id: string) => newData<VwHCCurrency>(entityBase.HCCURRENCY, id, "hccurrency"),
    editData: (id?: string) => editData<VwHCCurrency>(entityBase.HCCURRENCY, id, "hccurrency"),
    saveData: (data: any) => saveData<VwHCCurrency>(entityBase.HCCURRENCY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCCurrency>(entityBase.HCCURRENCY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCCurrency>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCCurrency> | undefined, incomingAction: KnownAction<VwHCCurrency>) => reduc<VwHCCurrency>(state, incomingAction, entityBase.HCCURRENCY)


