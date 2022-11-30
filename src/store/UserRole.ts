import { requestAction, editData, saveData, reduc, deleteRecord, checkSecurity, newData, saveChildData, DeleteChildData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwUserRole } from '../model/viewModel/VwUserRole';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/UserRole/";
export const actionCreators = {
        requestList: (AM:AdminModelRequest)=>requestAction<VwUserRole>(entityBase.UserRole,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwUserRole>(entityBase.UserRole, id, "userroles"),
    editData: (id?: string) => editData<VwUserRole>(entityBase.UserRole, id, "userroles"),
    saveData: (data: any) => saveData<VwUserRole>(entityBase.UserRole, url, data),
    deleteRecord: (id: string) => deleteRecord<VwUserRole>(entityBase.UserRole, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserRole>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
    saveChilds: (data: any) => saveChildData<VwUserRole>(entityBase.UserRole, url, data),
    DeleteChilds: (data: any) => DeleteChildData<VwUserRole>(entityBase.UserRole, url, data)
};



export const reducer = (state: stateBase<VwUserRole> | undefined, incomingAction: KnownAction<VwUserRole>) => reduc<VwUserRole>(state, incomingAction, entityBase.UserRole)
