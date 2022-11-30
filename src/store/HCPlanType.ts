import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPlanType } from '../model/viewModel/VwHCPlanType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPlanType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPlanType>(entityBase.HCPLANTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPLANTYPE, pageSize),
    newData: (id: string) => newData<VwHCPlanType>(entityBase.HCPLANTYPE, id, "hcplantype"),
    editData: (id?: string) => editData<VwHCPlanType>(entityBase.HCPLANTYPE, id, "hcplantype"),
    saveData: (data: any) => saveData<VwHCPlanType>(entityBase.HCPLANTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPlanType>(entityBase.HCPLANTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPlanType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPlanType> | undefined, incomingAction: KnownAction<VwHCPlanType>) => reduc<VwHCPlanType>(state, incomingAction, entityBase.HCPLANTYPE)


