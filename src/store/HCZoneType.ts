import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCZoneType } from '../model/viewModel/VwHCZoneType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCZoneType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCZoneType>(entityBase.HCZONETYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCZONETYPE, pageSize),
    newData: (id: string) => newData<VwHCZoneType>(entityBase.HCZONETYPE, id, "hczonetype"),
    editData: (id?: string) => editData<VwHCZoneType>(entityBase.HCZONETYPE, id, "hczonetype"),
    saveData: (data: any) => saveData<VwHCZoneType>(entityBase.HCZONETYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCZoneType>(entityBase.HCZONETYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCZoneType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCZoneType> | undefined, incomingAction: KnownAction<VwHCZoneType>) => reduc<VwHCZoneType>(state, incomingAction, entityBase.HCZONETYPE)


