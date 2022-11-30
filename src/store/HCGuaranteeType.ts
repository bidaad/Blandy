import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCGuaranteeType } from '../model/viewModel/VwHCGuaranteeType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCGuaranteeType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCGuaranteeType>(entityBase.HCGUARANTEETYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCGUARANTEETYPE, pageSize),
    newData: (id: string) => newData<VwHCGuaranteeType>(entityBase.HCGUARANTEETYPE, id, "hcguaranteetype"),
    editData: (id?: string) => editData<VwHCGuaranteeType>(entityBase.HCGUARANTEETYPE, id, "hcguaranteetype"),
    saveData: (data: any) => saveData<VwHCGuaranteeType>(entityBase.HCGUARANTEETYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCGuaranteeType>(entityBase.HCGUARANTEETYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCGuaranteeType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCGuaranteeType> | undefined, incomingAction: KnownAction<VwHCGuaranteeType>) => reduc<VwHCGuaranteeType>(state, incomingAction, entityBase.HCGUARANTEETYPE)


