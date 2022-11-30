import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCSkillTitle } from '../model/viewModel/VwHCSkillTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCSkillTitle/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCSkillTitle>(entityBase.HCSKILLTITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSKILLTITLE, pageSize),
    newData: (id: string) => newData<VwHCSkillTitle>(entityBase.HCSKILLTITLE, id, "hcskilltitle"),
    editData: (id?: string) => editData<VwHCSkillTitle>(entityBase.HCSKILLTITLE, id, "hcskilltitle"),
    saveData: (data: any) => saveData<VwHCSkillTitle>(entityBase.HCSKILLTITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCSkillTitle>(entityBase.HCSKILLTITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCSkillTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCSkillTitle> | undefined, incomingAction: KnownAction<VwHCSkillTitle>) => reduc<VwHCSkillTitle>(state, incomingAction, entityBase.HCSKILLTITLE)


