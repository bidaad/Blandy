import { requestAction, editData, saveData, reduc, deleteRecord, checkSecurity, newData, saveChildData, DeleteChildData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwRolePermission } from '../model/viewModel/VwRolePermission';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/RolePermission/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwRolePermission>(entityBase.RolePermission, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey ,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwRolePermission>(entityBase.RolePermission, id, "rolepermissions"),
    editData: (id?: string) => editData<VwRolePermission>(entityBase.RolePermission, id, "rolepermissions"),
    saveData: (data: any) => saveData<VwRolePermission>(entityBase.RolePermission, url, data),
    deleteRecord: (id: string) => deleteRecord<VwRolePermission>(entityBase.RolePermission, url, id),
    checkSecurity: (history: any) => checkSecurity<VwRolePermission>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
    saveChilds: (data: any) => saveChildData<VwRolePermission>(entityBase.RolePermission, url, data),
    DeleteChilds: (data: any) => DeleteChildData<VwRolePermission>(entityBase.RolePermission, url, data)
};


export const reducer = (state: stateBase<VwRolePermission> | undefined, incomingAction: KnownAction<VwRolePermission>) => reduc<VwRolePermission>(state, incomingAction, entityBase.RolePermission)
