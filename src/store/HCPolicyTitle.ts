import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPolicyTitle } from '../model/viewModel/VwHCPolicyTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPolicyTitle/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPolicyTitle>(entityBase.HCPOLICYTITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPOLICYTITLE, pageSize),
    newData: (id: string) => newData<VwHCPolicyTitle>(entityBase.HCPOLICYTITLE, id, "hcpolicytitle"),
    editData: (id?: string) => editData<VwHCPolicyTitle>(entityBase.HCPOLICYTITLE, id, "hcpolicytitle"),
    saveData: (data: any) => saveData<VwHCPolicyTitle>(entityBase.HCPOLICYTITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPolicyTitle>(entityBase.HCPOLICYTITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPolicyTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPolicyTitle> | undefined, incomingAction: KnownAction<VwHCPolicyTitle>) => reduc<VwHCPolicyTitle>(state, incomingAction, entityBase.HCPOLICYTITLE)


