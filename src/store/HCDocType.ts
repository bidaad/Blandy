import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCDocType } from '../model/viewModel/VwHCDocType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCDocType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCDocType>(entityBase.HCDOCTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCDOCTYPE, pageSize),
    newData: (id: string) => newData<VwHCDocType>(entityBase.HCDOCTYPE, id, "hcdoctype"),
    editData: (id?: string) => editData<VwHCDocType>(entityBase.HCDOCTYPE, id, "hcdoctype"),
    saveData: (data: any) => saveData<VwHCDocType>(entityBase.HCDOCTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCDocType>(entityBase.HCDOCTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCDocType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCDocType> | undefined, incomingAction: KnownAction<VwHCDocType>) => reduc<VwHCDocType>(state, incomingAction, entityBase.HCDOCTYPE)


