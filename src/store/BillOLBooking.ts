import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBillOLBooking } from '../model/viewModel/VwBillOLBooking';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/BillOLBooking/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwBillOLBooking>(entityBase.BILLOLBOOKING, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BILLOLBOOKING, pageSize),
    newData: (id: string) => newData<VwBillOLBooking>(entityBase.BILLOLBOOKING, id, "billolbooking"),
    editData: (id?: string) => editData<VwBillOLBooking>(entityBase.BILLOLBOOKING, id, "billolbooking"),
    saveData: (data: any) => saveData<VwBillOLBooking>(entityBase.BILLOLBOOKING, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBillOLBooking>(entityBase.BILLOLBOOKING, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBillOLBooking>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwBillOLBooking> | undefined, incomingAction: KnownAction<VwBillOLBooking>) => reduc<VwBillOLBooking>(state, incomingAction, entityBase.BILLOLBOOKING)


