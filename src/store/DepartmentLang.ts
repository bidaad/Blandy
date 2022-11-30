import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepartmentLang } from '../model/viewModel/VwDepartmentLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/DepartmentLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwDepartmentLang>(entityBase.DEPARTMENTLANG, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPARTMENTLANG, pageSize),
    editData: (id?: string) => editData<VwDepartmentLang>(entityBase.DEPARTMENTLANG, id, "departmentlang"),
    newData: (id: string) => newData<VwDepartmentLang>(entityBase.DEPARTMENTLANG, id, "departmentlang"),
    saveData: (data: any) => saveData<VwDepartmentLang>(entityBase.DEPARTMENTLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepartmentLang>(entityBase.DEPARTMENTLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepartmentLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};



export const reducer = (state: stateBase<VwDepartmentLang> | undefined, incomingAction: KnownAction<VwDepartmentLang>) => reduc<VwDepartmentLang>(state, incomingAction, entityBase.DEPARTMENTLANG)


