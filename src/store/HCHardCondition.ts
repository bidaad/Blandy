import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCHardCondition } from '../model/viewModel/VwHCHardCondition';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCHardCondition/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCHardCondition>(entityBase.HCHARDCONDITION,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCHARDCONDITION, pageSize),
    newData: (id: string) => newData<VwHCHardCondition>(entityBase.HCHARDCONDITION, id, "hchardcondition"),
    editData: (id?: string) => editData<VwHCHardCondition>(entityBase.HCHARDCONDITION, id, "hchardcondition"),
    saveData: (data: any) => saveData<VwHCHardCondition>(entityBase.HCHARDCONDITION, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCHardCondition>(entityBase.HCHARDCONDITION, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCHardCondition>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCHardCondition> | undefined, incomingAction: KnownAction<VwHCHardCondition>) => reduc<VwHCHardCondition>(state, incomingAction, entityBase.HCHARDCONDITION)


