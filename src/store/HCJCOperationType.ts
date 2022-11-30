import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCJCOperationType } from '../model/viewModel/VwHCJCOperationType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCJCOperationType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCJCOperationType>(entityBase.HCJCOPERATIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCJCOPERATIONTYPE, pageSize),
    newData: (id: string) => newData<VwHCJCOperationType>(entityBase.HCJCOPERATIONTYPE, id, "hcjcoperationtype"),
    editData: (id?: string) => editData<VwHCJCOperationType>(entityBase.HCJCOPERATIONTYPE, id, "hcjcoperationtype"),
    saveData: (data: any) => saveData<VwHCJCOperationType>(entityBase.HCJCOPERATIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCJCOperationType>(entityBase.HCJCOPERATIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCJCOperationType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCJCOperationType> | undefined, incomingAction: KnownAction<VwHCJCOperationType>) => reduc<VwHCJCOperationType>(state, incomingAction, entityBase.HCJCOPERATIONTYPE)


