import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAssetHealthStatus } from '../model/viewModel/VwHCAssetHealthStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAssetHealthStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAssetHealthStatus>(entityBase.HCASSETHEALTHSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCASSETHEALTHSTATUS, pageSize),
    newData: (id: string) => newData<VwHCAssetHealthStatus>(entityBase.HCASSETHEALTHSTATUS, id, "hcassethealthstatus"),
    editData: (id?: string) => editData<VwHCAssetHealthStatus>(entityBase.HCASSETHEALTHSTATUS, id, "hcassethealthstatus"),
    saveData: (data: any) => saveData<VwHCAssetHealthStatus>(entityBase.HCASSETHEALTHSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAssetHealthStatus>(entityBase.HCASSETHEALTHSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAssetHealthStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAssetHealthStatus> | undefined, incomingAction: KnownAction<VwHCAssetHealthStatus>) => reduc<VwHCAssetHealthStatus>(state, incomingAction, entityBase.HCASSETHEALTHSTATUS)


