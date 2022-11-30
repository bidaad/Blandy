import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAttributeTitle } from '../model/viewModel/VwHCAttributeTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAttributeTitle/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAttributeTitle>(entityBase.HCATTRIBUTETITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCATTRIBUTETITLE, pageSize),
    newData: (id: string) => newData<VwHCAttributeTitle>(entityBase.HCATTRIBUTETITLE, id, "hcattributetitle"),
    editData: (id?: string) => editData<VwHCAttributeTitle>(entityBase.HCATTRIBUTETITLE, id, "hcattributetitle"),
    saveData: (data: any) => saveData<VwHCAttributeTitle>(entityBase.HCATTRIBUTETITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAttributeTitle>(entityBase.HCATTRIBUTETITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAttributeTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAttributeTitle> | undefined, incomingAction: KnownAction<VwHCAttributeTitle>) => reduc<VwHCAttributeTitle>(state, incomingAction, entityBase.HCATTRIBUTETITLE)


