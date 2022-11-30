import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCShipStatus } from '../model/viewModel/VwHCShipStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCShipStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCShipStatus>(entityBase.HCSHIPSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSHIPSTATUS, pageSize),
    newData: (id: string) => newData<VwHCShipStatus>(entityBase.HCSHIPSTATUS, id, "hcshipstatus"),
    editData: (id?: string) => editData<VwHCShipStatus>(entityBase.HCSHIPSTATUS, id, "hcshipstatus"),
    saveData: (data: any) => saveData<VwHCShipStatus>(entityBase.HCSHIPSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCShipStatus>(entityBase.HCSHIPSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCShipStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCShipStatus> | undefined, incomingAction: KnownAction<VwHCShipStatus>) => reduc<VwHCShipStatus>(state, incomingAction, entityBase.HCSHIPSTATUS)


