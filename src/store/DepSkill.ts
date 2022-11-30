import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepSkill } from '../model/viewModel/VwDepSkill';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/DepSkill/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwDepSkill>(entityBase.DEPSKILL, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPSKILL, pageSize),
    newData: (id: string) => newData<VwDepSkill>(entityBase.DEPSKILL, id, "depskill"),
    editData: (id?: string) => editData<VwDepSkill>(entityBase.DEPSKILL, id, "depskill"),
    saveData: (data: any) => saveData<VwDepSkill>(entityBase.DEPSKILL, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepSkill>(entityBase.DEPSKILL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepSkill>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwDepSkill> | undefined, incomingAction: KnownAction<VwDepSkill>) => reduc<VwDepSkill>(state, incomingAction, entityBase.DEPSKILL)


