import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCUserTypeLang } from '../model/viewModel/VwHCUserTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCUserTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCUserTypeLang>(entityBase.HCUSERTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCUSERTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCUserTypeLang>(entityBase.HCUSERTYPELANG, id, "hcusertypelang"),
    editData: (id?: string) => editData<VwHCUserTypeLang>(entityBase.HCUSERTYPELANG, id, "hcusertypelang"),
    saveData: (data: any) => saveData<VwHCUserTypeLang>(entityBase.HCUSERTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCUserTypeLang>(entityBase.HCUSERTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCUserTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCUserTypeLang> | undefined, incomingAction: KnownAction<VwHCUserTypeLang>) => reduc<VwHCUserTypeLang>(state, incomingAction, entityBase.HCUSERTYPELANG)


