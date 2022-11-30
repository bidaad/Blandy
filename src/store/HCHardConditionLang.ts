import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCHardConditionLang } from '../model/viewModel/VwHCHardConditionLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCHardConditionLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCHardConditionLang>(entityBase.HCHARDCONDITIONLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCHARDCONDITIONLANG, pageSize),
    newData: (id: string) => newData<VwHCHardConditionLang>(entityBase.HCHARDCONDITIONLANG, id, "hchardconditionlang"),
    editData: (id?: string) => editData<VwHCHardConditionLang>(entityBase.HCHARDCONDITIONLANG, id, "hchardconditionlang"),
    saveData: (data: any) => saveData<VwHCHardConditionLang>(entityBase.HCHARDCONDITIONLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCHardConditionLang>(entityBase.HCHARDCONDITIONLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCHardConditionLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCHardConditionLang> | undefined, incomingAction: KnownAction<VwHCHardConditionLang>) => reduc<VwHCHardConditionLang>(state, incomingAction, entityBase.HCHARDCONDITIONLANG)


