import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWOStatus } from '../model/viewModel/VwHCWOStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWOStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWOStatus>(entityBase.HCWOSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWOSTATUS, pageSize),
    newData: (id: string) => newData<VwHCWOStatus>(entityBase.HCWOSTATUS, id, "hcwostatus"),
    editData: (id?: string) => editData<VwHCWOStatus>(entityBase.HCWOSTATUS, id, "hcwostatus"),
    saveData: (data: any) => saveData<VwHCWOStatus>(entityBase.HCWOSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWOStatus>(entityBase.HCWOSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWOStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWOStatus> | undefined, incomingAction: KnownAction<VwHCWOStatus>) => reduc<VwHCWOStatus>(state, incomingAction, entityBase.HCWOSTATUS)


