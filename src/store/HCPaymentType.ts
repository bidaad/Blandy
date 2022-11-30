import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPaymentType } from '../model/viewModel/VwHCPaymentType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPaymentType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPaymentType>(entityBase.HCPAYMENTTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPAYMENTTYPE, pageSize),
    newData: (id: string) => newData<VwHCPaymentType>(entityBase.HCPAYMENTTYPE, id, "hcpaymenttype"),
    editData: (id?: string) => editData<VwHCPaymentType>(entityBase.HCPAYMENTTYPE, id, "hcpaymenttype"),
    saveData: (data: any) => saveData<VwHCPaymentType>(entityBase.HCPAYMENTTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPaymentType>(entityBase.HCPAYMENTTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPaymentType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPaymentType> | undefined, incomingAction: KnownAction<VwHCPaymentType>) => reduc<VwHCPaymentType>(state, incomingAction, entityBase.HCPAYMENTTYPE)


