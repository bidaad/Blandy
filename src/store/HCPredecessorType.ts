import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPredecessorType } from '../model/viewModel/VwHCPredecessorType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPredecessorType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPredecessorType>(entityBase.HCPREDECESSORTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPREDECESSORTYPE, pageSize),
    newData: (id: string) => newData<VwHCPredecessorType>(entityBase.HCPREDECESSORTYPE, id, "hcpredecessortype"),
    editData: (id?: string) => editData<VwHCPredecessorType>(entityBase.HCPREDECESSORTYPE, id, "hcpredecessortype"),
    saveData: (data: any) => saveData<VwHCPredecessorType>(entityBase.HCPREDECESSORTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPredecessorType>(entityBase.HCPREDECESSORTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPredecessorType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPredecessorType> | undefined, incomingAction: KnownAction<VwHCPredecessorType>) => reduc<VwHCPredecessorType>(state, incomingAction, entityBase.HCPREDECESSORTYPE)


