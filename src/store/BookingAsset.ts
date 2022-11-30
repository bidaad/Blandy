import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBookingAsset } from '../model/viewModel/VwBookingAsset';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/BookingAsset/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBookingAsset>(entityBase.BOOKINGASSET,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BOOKINGASSET, pageSize),
    newData: (id: string) => newData<VwBookingAsset>(entityBase.BOOKINGASSET, id, "bookingasset"),
    editData: (id?: string) => editData<VwBookingAsset>(entityBase.BOOKINGASSET, id, "bookingasset"),
    saveData: (data: any) => saveData<VwBookingAsset>(entityBase.BOOKINGASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBookingAsset>(entityBase.BOOKINGASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBookingAsset>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwBookingAsset> | undefined, incomingAction: KnownAction<VwBookingAsset>) => reduc<VwBookingAsset>(state, incomingAction, entityBase.BOOKINGASSET)


