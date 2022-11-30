import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWHOperationType } from '../model/viewModel/VwHCWHOperationType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWHOperationType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWHOperationType>(entityBase.HCWHOPERATIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWHOPERATIONTYPE, pageSize),
    newData: (id: string) => newData<VwHCWHOperationType>(entityBase.HCWHOPERATIONTYPE, id, "hcwhoperationtype"),
    editData: (id?: string) => editData<VwHCWHOperationType>(entityBase.HCWHOPERATIONTYPE, id, "hcwhoperationtype"),
    saveData: (data: any) => saveData<VwHCWHOperationType>(entityBase.HCWHOPERATIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWHOperationType>(entityBase.HCWHOPERATIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWHOperationType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWHOperationType> | undefined, incomingAction: KnownAction<VwHCWHOperationType>) => reduc<VwHCWHOperationType>(state, incomingAction, entityBase.HCWHOPERATIONTYPE)


