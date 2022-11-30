import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCGuaranteeTypelang } from '../model/viewModel/VwHCGuaranteeTypelang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCGuaranteeTypelang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCGuaranteeTypelang>(entityBase.HCGUARANTEETYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCGUARANTEETYPELANG, pageSize),
    newData: (id: string) => newData<VwHCGuaranteeTypelang>(entityBase.HCGUARANTEETYPELANG, id, "hcguaranteetypelang"),
    editData: (id?: string) => editData<VwHCGuaranteeTypelang>(entityBase.HCGUARANTEETYPELANG, id, "hcguaranteetypelang"),
    saveData: (data: any) => saveData<VwHCGuaranteeTypelang>(entityBase.HCGUARANTEETYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCGuaranteeTypelang>(entityBase.HCGUARANTEETYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCGuaranteeTypelang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCGuaranteeTypelang> | undefined, incomingAction: KnownAction<VwHCGuaranteeTypelang>) => reduc<VwHCGuaranteeTypelang>(state, incomingAction, entityBase.HCGUARANTEETYPELANG)


