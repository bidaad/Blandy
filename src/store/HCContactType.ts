import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCContactType } from '../model/viewModel/VwHCContactType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCContactType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCContactType>(entityBase.HCCONTACTTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCONTACTTYPE, pageSize),
    newData: (id: string) => newData<VwHCContactType>(entityBase.HCCONTACTTYPE, id, "hccontacttype"),
    editData: (id?: string) => editData<VwHCContactType>(entityBase.HCCONTACTTYPE, id, "hccontacttype"),
    saveData: (data: any) => saveData<VwHCContactType>(entityBase.HCCONTACTTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCContactType>(entityBase.HCCONTACTTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCContactType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCContactType> | undefined, incomingAction: KnownAction<VwHCContactType>) => reduc<VwHCContactType>(state, incomingAction, entityBase.HCCONTACTTYPE)


