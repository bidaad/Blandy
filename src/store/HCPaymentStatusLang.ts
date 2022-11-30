import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPaymentStatusLang } from '../model/viewModel/VwHCPaymentStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPaymentStatusLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPaymentStatusLang>(entityBase.HCPAYMENTSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPAYMENTSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCPaymentStatusLang>(entityBase.HCPAYMENTSTATUSLANG, id, "hcpaymentstatuslang"),
    editData: (id?: string) => editData<VwHCPaymentStatusLang>(entityBase.HCPAYMENTSTATUSLANG, id, "hcpaymentstatuslang"),
    saveData: (data: any) => saveData<VwHCPaymentStatusLang>(entityBase.HCPAYMENTSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPaymentStatusLang>(entityBase.HCPAYMENTSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPaymentStatusLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCPaymentStatusLang> | undefined, incomingAction: KnownAction<VwHCPaymentStatusLang>) => reduc<VwHCPaymentStatusLang>(state, incomingAction, entityBase.HCPAYMENTSTATUSLANG)


