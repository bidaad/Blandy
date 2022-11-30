import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPriorityLang } from '../model/viewModel/VwHCPriorityLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPriorityLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPriorityLang>(entityBase.HCPRIORITYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPRIORITYLANG, pageSize),
    newData: (id: string) => newData<VwHCPriorityLang>(entityBase.HCPRIORITYLANG, id, "hcprioritylang"),
    editData: (id?: string) => editData<VwHCPriorityLang>(entityBase.HCPRIORITYLANG, id, "hcprioritylang"),
    saveData: (data: any) => saveData<VwHCPriorityLang>(entityBase.HCPRIORITYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPriorityLang>(entityBase.HCPRIORITYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPriorityLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCPriorityLang> | undefined, incomingAction: KnownAction<VwHCPriorityLang>) => reduc<VwHCPriorityLang>(state, incomingAction, entityBase.HCPRIORITYLANG)


