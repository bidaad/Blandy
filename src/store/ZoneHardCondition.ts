import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwZoneHardCondition } from '../model/viewModel/VwZoneHardCondition';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/ZoneHardCondition/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwZoneHardCondition>(entityBase.ZONEHARDCONDITION,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ZONEHARDCONDITION, pageSize),
    newData: (id: string) => newData<VwZoneHardCondition>(entityBase.ZONEHARDCONDITION, id, "zonehardcondition"),
    editData: (id?: string) => editData<VwZoneHardCondition>(entityBase.ZONEHARDCONDITION, id, "zonehardcondition"),
    saveData: (data: any) => saveData<VwZoneHardCondition>(entityBase.ZONEHARDCONDITION, url, data),
    deleteRecord: (id: string) => deleteRecord<VwZoneHardCondition>(entityBase.ZONEHARDCONDITION, url, id),
    checkSecurity: (history: any) => checkSecurity<VwZoneHardCondition>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwZoneHardCondition> | undefined, incomingAction: KnownAction<VwZoneHardCondition>) => reduc<VwZoneHardCondition>(state, incomingAction, entityBase.ZONEHARDCONDITION)


