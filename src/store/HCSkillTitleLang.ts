import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCSkillTitleLang } from '../model/viewModel/VwHCSkillTitleLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCSkillTitleLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCSkillTitleLang>(entityBase.HCSKILLTITLELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSKILLTITLELANG, pageSize),
    newData: (id: string) => newData<VwHCSkillTitleLang>(entityBase.HCSKILLTITLELANG, id, "hcskilltitlelang"),
    editData: (id?: string) => editData<VwHCSkillTitleLang>(entityBase.HCSKILLTITLELANG, id, "hcskilltitlelang"),
    saveData: (data: any) => saveData<VwHCSkillTitleLang>(entityBase.HCSKILLTITLELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCSkillTitleLang>(entityBase.HCSKILLTITLELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCSkillTitleLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCSkillTitleLang> | undefined, incomingAction: KnownAction<VwHCSkillTitleLang>) => reduc<VwHCSkillTitleLang>(state, incomingAction, entityBase.HCSKILLTITLELANG)


