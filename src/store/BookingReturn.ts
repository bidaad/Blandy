import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBookingReturn } from '../model/viewModel/VwBookingReturn';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/BookingReturn/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwBookingReturn>(entityBase.BOOKINGRETURN,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BOOKINGRETURN, pageSize),
    newData: (id: string) => newData<VwBookingReturn>(entityBase.BOOKINGRETURN, id, "bookingreturn"),
    editData: (id?: string) => editData<VwBookingReturn>(entityBase.BOOKINGRETURN, id, "bookingreturn"),
    saveData: (data: any) => saveData<VwBookingReturn>(entityBase.BOOKINGRETURN, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBookingReturn>(entityBase.BOOKINGRETURN, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBookingReturn>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwBookingReturn> | undefined, incomingAction: KnownAction<VwBookingReturn>) => reduc<VwBookingReturn>(state, incomingAction, entityBase.BOOKINGRETURN)


