import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepActiveInZone } from '../model/viewModel/VwDepActiveInZone';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/DepActiveInZone/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepActiveInZone>(entityBase.DEPACTIVEINZONE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPACTIVEINZONE, pageSize),
    newData: (id: string) => newData<VwDepActiveInZone>(entityBase.DEPACTIVEINZONE, id, "depactiveinzone"),
    editData: (id?: string) => editData<VwDepActiveInZone>(entityBase.DEPACTIVEINZONE, id, "depactiveinzone"),
    saveData: (data: any) => saveData<VwDepActiveInZone>(entityBase.DEPACTIVEINZONE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepActiveInZone>(entityBase.DEPACTIVEINZONE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepActiveInZone>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwDepActiveInZone> | undefined, incomingAction: KnownAction<VwDepActiveInZone>) => reduc<VwDepActiveInZone>(state, incomingAction, entityBase.DEPACTIVEINZONE)


