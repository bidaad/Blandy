import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCUnitLang } from '../model/viewModel/VwHCUnitLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCUnitLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCUnitLang>(entityBase.HCUNITLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCUNITLANG, pageSize),
    newData: (id: string) => newData<VwHCUnitLang>(entityBase.HCUNITLANG, id, "hcunitlang"),
    editData: (id?: string) => editData<VwHCUnitLang>(entityBase.HCUNITLANG, id, "hcunitlang"),
    saveData: (data: any) => saveData<VwHCUnitLang>(entityBase.HCUNITLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCUnitLang>(entityBase.HCUNITLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCUnitLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCUnitLang> | undefined, incomingAction: KnownAction<VwHCUnitLang>) => reduc<VwHCUnitLang>(state, incomingAction, entityBase.HCUNITLANG)


