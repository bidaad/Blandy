import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPriority } from '../model/viewModel/VwHCPriority';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPriority/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPriority>(entityBase.HCPRIORITY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPRIORITY, pageSize),
    newData: (id: string) => newData<VwHCPriority>(entityBase.HCPRIORITY, id, "hcpriority"),
    editData: (id?: string) => editData<VwHCPriority>(entityBase.HCPRIORITY, id, "hcpriority"),
    saveData: (data: any) => saveData<VwHCPriority>(entityBase.HCPRIORITY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPriority>(entityBase.HCPRIORITY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPriority>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPriority> | undefined, incomingAction: KnownAction<VwHCPriority>) => reduc<VwHCPriority>(state, incomingAction, entityBase.HCPRIORITY)


