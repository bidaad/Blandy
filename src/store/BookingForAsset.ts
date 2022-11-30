import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBooking } from '../model/viewModel/VwBooking';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from './UserInfo';


const url = APIUrl + "/Booking/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBooking>(entityBase.BOOKINGFORASSET,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BOOKINGFORASSET, pageSize),
    newData: (id: string) => newData<VwBooking>(entityBase.BOOKINGFORASSET, id, "bookingforasset"),
    editData: (id?: string) => editData<VwBooking>(entityBase.BOOKINGFORASSET, id, "bookingforasset"),
    saveData: (data: any) => saveData<VwBooking>(entityBase.BOOKINGFORASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBooking>(entityBase.BOOKINGFORASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBooking>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwBooking> | undefined, incomingAction: KnownAction<VwBooking>) => reduc<VwBooking>(state, incomingAction, entityBase.BOOKINGFORASSET)


