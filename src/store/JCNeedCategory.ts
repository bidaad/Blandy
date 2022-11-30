import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCNeedCategory } from '../model/viewModel/VwJCNeedCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCNeedCategory/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJCNeedCategory>(entityBase.JCNEEDCATEGORY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCNEEDCATEGORY, pageSize),
    newData: (id: string) => newData<VwJCNeedCategory>(entityBase.JCNEEDCATEGORY, id, "jcneedcategory"),
    editData: (id?: string) => editData<VwJCNeedCategory>(entityBase.JCNEEDCATEGORY, id, "jcneedcategory"),
    saveData: (data: any) => saveData<VwJCNeedCategory>(entityBase.JCNEEDCATEGORY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCNeedCategory>(entityBase.JCNEEDCATEGORY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCNeedCategory>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwJCNeedCategory> | undefined, incomingAction: KnownAction<VwJCNeedCategory>) => reduc<VwJCNeedCategory>(state, incomingAction, entityBase.JCNEEDCATEGORY)


