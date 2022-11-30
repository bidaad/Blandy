import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBookingWork } from '../model/viewModel/VwBookingWork';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/BookingWork/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBookingWork>(entityBase.BOOKINGWORK,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BOOKINGWORK, pageSize),
    newData: (id: string) => newData<VwBookingWork>(entityBase.BOOKINGWORK, id, "bookingwork"),
    editData: (id?: string) => editData<VwBookingWork>(entityBase.BOOKINGWORK, id, "bookingwork"),
    saveData: (data: any) => saveData<VwBookingWork>(entityBase.BOOKINGWORK, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBookingWork>(entityBase.BOOKINGWORK, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBookingWork>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwBookingWork> | undefined, incomingAction: KnownAction<VwBookingWork>) => reduc<VwBookingWork>(state, incomingAction, entityBase.BOOKINGWORK)


