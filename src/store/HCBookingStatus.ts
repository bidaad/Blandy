import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCBookingStatus } from '../model/viewModel/VwHCBookingStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCBookingStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCBookingStatus>(entityBase.HCBOOKINGSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCBOOKINGSTATUS, pageSize),
    newData: (id: string) => newData<VwHCBookingStatus>(entityBase.HCBOOKINGSTATUS, id, "hcbookingstatus"),
    editData: (id?: string) => editData<VwHCBookingStatus>(entityBase.HCBOOKINGSTATUS, id, "hcbookingstatus"),
    saveData: (data: any) => saveData<VwHCBookingStatus>(entityBase.HCBOOKINGSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCBookingStatus>(entityBase.HCBOOKINGSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCBookingStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCBookingStatus> | undefined, incomingAction: KnownAction<VwHCBookingStatus>) => reduc<VwHCBookingStatus>(state, incomingAction, entityBase.HCBOOKINGSTATUS)


