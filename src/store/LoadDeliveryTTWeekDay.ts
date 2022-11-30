import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwLoadDeliveryTTWeekDay } from '../model/viewModel/VwLoadDeliveryTTWeekDay';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/LoadDeliveryTTWeekDay/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwLoadDeliveryTTWeekDay>(entityBase.LOADDELIVERYTTWEEKDAY, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.LOADDELIVERYTTWEEKDAY, pageSize),
    newData: (id: string) => newData<VwLoadDeliveryTTWeekDay>(entityBase.LOADDELIVERYTTWEEKDAY, id, "loaddeliveryttweekday"),
    editData: (id?: string) => editData<VwLoadDeliveryTTWeekDay>(entityBase.LOADDELIVERYTTWEEKDAY, id, "loaddeliveryttweekday"),
    saveData: (data: any) => saveData<VwLoadDeliveryTTWeekDay>(entityBase.LOADDELIVERYTTWEEKDAY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwLoadDeliveryTTWeekDay>(entityBase.LOADDELIVERYTTWEEKDAY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwLoadDeliveryTTWeekDay>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwLoadDeliveryTTWeekDay> | undefined, incomingAction: KnownAction<VwLoadDeliveryTTWeekDay>) => reduc<VwLoadDeliveryTTWeekDay>(state, incomingAction, entityBase.LOADDELIVERYTTWEEKDAY)


