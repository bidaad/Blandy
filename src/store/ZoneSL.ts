import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwZone } from '../model/viewModel/VwZone';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from './UserInfo';

const url = APIUrl + "/Zone/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwZone>(entityBase.ZONESL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ZONESL, pageSize),
    newData: (id: string) => newData<VwZone>(entityBase.ZONESL, id, "zonessl"),
    editData: (id?: string) => editData<VwZone>(entityBase.ZONESL, id, "zonessl"),
    saveData: (data: any) => saveData<VwZone>(entityBase.ZONESL, url, data),
    deleteRecord: (id: string) => deleteRecord<VwZone>(entityBase.ZONESL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwZone>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwZone> | undefined, incomingAction: KnownAction<VwZone>) => reduc<VwZone>(state, incomingAction, entityBase.ZONESL)


