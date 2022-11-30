import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCUserReject } from '../model/viewModel/VwJCUserReject';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCUserReject/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwJCUserReject>(entityBase.JCUSERREJECT, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCUSERREJECT, pageSize),
    newData: (id: string) => newData<VwJCUserReject>(entityBase.JCUSERREJECT, id, "jcuserreject"),
    editData: (id?: string) => editData<VwJCUserReject>(entityBase.JCUSERREJECT, id, "jcuserreject"),
    saveData: (data: any) => saveData<VwJCUserReject>(entityBase.JCUSERREJECT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCUserReject>(entityBase.JCUSERREJECT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCUserReject>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwJCUserReject> | undefined, incomingAction: KnownAction<VwJCUserReject>) => reduc<VwJCUserReject>(state, incomingAction, entityBase.JCUSERREJECT)


