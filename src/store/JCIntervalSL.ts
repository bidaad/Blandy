import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCInterval } from '../model/viewModel/VwJCInterval';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/JCInterval/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJCInterval>(entityBase.JCINTERVALSL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCINTERVALSL, pageSize),
    newData: (id: string) => newData<VwJCInterval>(entityBase.JCINTERVALSL, id, "jcintervalsl"),
    editData: (id?: string) => editData<VwJCInterval>(entityBase.JCINTERVALSL, id, "jcintervalsl"),
    saveData: (data: any) => saveData<VwJCInterval>(entityBase.JCINTERVALSL, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCInterval>(entityBase.JCINTERVALSL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCInterval>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwJCInterval> | undefined, incomingAction: KnownAction<VwJCInterval>) => reduc<VwJCInterval>(state, incomingAction, entityBase.JCINTERVALSL)


