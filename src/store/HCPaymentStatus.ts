import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPaymentStatus } from '../model/viewModel/VwHCPaymentStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPaymentStatus/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPaymentStatus>(entityBase.HCPAYMENTSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPAYMENTSTATUS, pageSize),
    newData: (id: string) => newData<VwHCPaymentStatus>(entityBase.HCPAYMENTSTATUS, id, "hcpaymentstatus"),
    editData: (id?: string) => editData<VwHCPaymentStatus>(entityBase.HCPAYMENTSTATUS, id, "hcpaymentstatus"),
    saveData: (data: any) => saveData<VwHCPaymentStatus>(entityBase.HCPAYMENTSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPaymentStatus>(entityBase.HCPAYMENTSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPaymentStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPaymentStatus> | undefined, incomingAction: KnownAction<VwHCPaymentStatus>) => reduc<VwHCPaymentStatus>(state, incomingAction, entityBase.HCPAYMENTSTATUS)


