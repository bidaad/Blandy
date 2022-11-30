import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCLanguage } from '../model/viewModel/VwHCLanguage';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCLanguage/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCLanguage>(entityBase.HCLANGUAGE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCLANGUAGE, pageSize),
    newData: (id: string) => newData<VwHCLanguage>(entityBase.HCLANGUAGE, id, "hclanguage"),
    editData: (id?: string) => editData<VwHCLanguage>(entityBase.HCLANGUAGE, id, "hclanguage"),
    saveData: (data: any) => saveData<VwHCLanguage>(entityBase.HCLANGUAGE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCLanguage>(entityBase.HCLANGUAGE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCLanguage>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCLanguage> | undefined, incomingAction: KnownAction<VwHCLanguage>) => reduc<VwHCLanguage>(state, incomingAction, entityBase.HCLANGUAGE)


