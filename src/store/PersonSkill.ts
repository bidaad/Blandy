import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPersonSkill } from '../model/viewModel/VwPersonSkill';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/PersonSkill/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwPersonSkill>(entityBase.PERSONSKILL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PERSONSKILL, pageSize),
    newData: (id: string) => newData<VwPersonSkill>(entityBase.PERSONSKILL, id, "personskill"),
    editData: (id?: string) => editData<VwPersonSkill>(entityBase.PERSONSKILL, id, "personskill"),
    saveData: (data: any) => saveData<VwPersonSkill>(entityBase.PERSONSKILL, url, data),
    deleteRecord: (id: string) => deleteRecord<VwPersonSkill>(entityBase.PERSONSKILL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwPersonSkill>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwPersonSkill> | undefined, incomingAction: KnownAction<VwPersonSkill>) => reduc<VwPersonSkill>(state, incomingAction, entityBase.PERSONSKILL)


