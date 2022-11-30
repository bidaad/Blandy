import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwZoneLang } from '../model/viewModel/VwZoneLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/ZoneLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwZoneLang>(entityBase.ZONELANG, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ZONELANG, pageSize),
    newData: (id: string) => newData<VwZoneLang>(entityBase.ZONELANG, id, "zonelang"),
    editData: (id?: string) => editData<VwZoneLang>(entityBase.ZONELANG, id, "zonelang"),
    saveData: (data: any) => saveData<VwZoneLang>(entityBase.ZONELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwZoneLang>(entityBase.ZONELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwZoneLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwZoneLang> | undefined, incomingAction: KnownAction<VwZoneLang>) => reduc<VwZoneLang>(state, incomingAction, entityBase.ZONELANG)


