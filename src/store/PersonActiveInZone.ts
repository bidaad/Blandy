import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPersonActiveInZone } from '../model/viewModel/VwPersonActiveInZone';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/PersonActiveInZone/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwPersonActiveInZone>(entityBase.PERSONACTIVEINZONE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PERSONACTIVEINZONE, pageSize),
    newData: (id: string) => newData<VwPersonActiveInZone>(entityBase.PERSONACTIVEINZONE, id, "personactiveinzone"),
    editData: (id?: string) => editData<VwPersonActiveInZone>(entityBase.PERSONACTIVEINZONE, id, "personactiveinzone"),
    saveData: (data: any) => saveData<VwPersonActiveInZone>(entityBase.PERSONACTIVEINZONE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwPersonActiveInZone>(entityBase.PERSONACTIVEINZONE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwPersonActiveInZone>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwPersonActiveInZone> | undefined, incomingAction: KnownAction<VwPersonActiveInZone>) => reduc<VwPersonActiveInZone>(state, incomingAction, entityBase.PERSONACTIVEINZONE)


