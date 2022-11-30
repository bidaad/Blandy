import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWHOperationStatus } from '../model/viewModel/VwHCWHOperationStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWHOperationStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWHOperationStatus>(entityBase.HCWHOPERATIONSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWHOPERATIONSTATUS, pageSize),
    newData: (id: string) => newData<VwHCWHOperationStatus>(entityBase.HCWHOPERATIONSTATUS, id, "hcwhoperationstatus"),
    editData: (id?: string) => editData<VwHCWHOperationStatus>(entityBase.HCWHOPERATIONSTATUS, id, "hcwhoperationstatus"),
    saveData: (data: any) => saveData<VwHCWHOperationStatus>(entityBase.HCWHOPERATIONSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWHOperationStatus>(entityBase.HCWHOPERATIONSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWHOperationStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWHOperationStatus> | undefined, incomingAction: KnownAction<VwHCWHOperationStatus>) => reduc<VwHCWHOperationStatus>(state, incomingAction, entityBase.HCWHOPERATIONSTATUS)


