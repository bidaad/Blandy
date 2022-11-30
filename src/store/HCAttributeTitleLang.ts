import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAttributeTitleLang } from '../model/viewModel/VwHCAttributeTitleLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAttributeTitleLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAttributeTitleLang>(entityBase.HCATTRIBUTETITLELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCATTRIBUTETITLELANG, pageSize),
    newData: (id: string) => newData<VwHCAttributeTitleLang>(entityBase.HCATTRIBUTETITLELANG, id, "hcattributetitlelang"),
    editData: (id?: string) => editData<VwHCAttributeTitleLang>(entityBase.HCATTRIBUTETITLELANG, id, "hcattributetitlelang"),
    saveData: (data: any) => saveData<VwHCAttributeTitleLang>(entityBase.HCATTRIBUTETITLELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAttributeTitleLang>(entityBase.HCATTRIBUTETITLELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAttributeTitleLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAttributeTitleLang> | undefined, incomingAction: KnownAction<VwHCAttributeTitleLang>) => reduc<VwHCAttributeTitleLang>(state, incomingAction, entityBase.HCATTRIBUTETITLELANG)


