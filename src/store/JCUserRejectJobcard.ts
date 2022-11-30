import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCUserReject } from '../model/viewModel/VwJCUserReject';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/JCUserReject/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwJCUserReject>(entityBase.JCUSERREJECTJOBCARD, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCUSERREJECTJOBCARD, pageSize),
    newData: (id: string) => newData<VwJCUserReject>(entityBase.JCUSERREJECTJOBCARD, id, "jcuserrejectjobcard"),
    editData: (id?: string) => editData<VwJCUserReject>(entityBase.JCUSERREJECTJOBCARD, id, "jcuserrejectjobcard"),
    saveData: (data: any) => saveData<VwJCUserReject>(entityBase.JCUSERREJECTJOBCARD, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCUserReject>(entityBase.JCUSERREJECTJOBCARD, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCUserReject>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwJCUserReject> | undefined, incomingAction: KnownAction<VwJCUserReject>) => reduc<VwJCUserReject>(state, incomingAction, entityBase.JCUSERREJECTJOBCARD)


