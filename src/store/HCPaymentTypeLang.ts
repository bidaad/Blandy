import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPaymentTypeLang } from '../model/viewModel/VwHCPaymentTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPaymentTypeLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPaymentTypeLang>(entityBase.HCPAYMENTTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPAYMENTTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCPaymentTypeLang>(entityBase.HCPAYMENTTYPELANG, id, "hcpaymenttypelang"),
    editData: (id?: string) => editData<VwHCPaymentTypeLang>(entityBase.HCPAYMENTTYPELANG, id, "hcpaymenttypelang"),
    saveData: (data: any) => saveData<VwHCPaymentTypeLang>(entityBase.HCPAYMENTTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPaymentTypeLang>(entityBase.HCPAYMENTTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPaymentTypeLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCPaymentTypeLang> | undefined, incomingAction: KnownAction<VwHCPaymentTypeLang>) => reduc<VwHCPaymentTypeLang>(state, incomingAction, entityBase.HCPAYMENTTYPELANG)


