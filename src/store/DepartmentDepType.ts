import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepartmentDepType } from '../model/viewModel/VwDepartmentDepType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/DepartmentDepType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepartmentDepType>(entityBase.DEPARTMENTDEPTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.DEPARTMENTDEPTYPE,pageSize),
    newData: (id: string) => newData<VwDepartmentDepType>(entityBase.DEPARTMENTDEPTYPE, id, "departmentdeptype"),
    editData:(id?: string)=> editData<VwDepartmentDepType>(entityBase.DEPARTMENTDEPTYPE,id, "departmentdeptype"),
    saveData: (data: any)=>saveData<VwDepartmentDepType>(entityBase.DEPARTMENTDEPTYPE,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwDepartmentDepType>(entityBase.DEPARTMENTDEPTYPE,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwDepartmentDepType>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer=(state: stateBase<VwDepartmentDepType> | undefined, incomingAction: KnownAction<VwDepartmentDepType>)=>reduc<VwDepartmentDepType>(state,incomingAction, entityBase.DEPARTMENTDEPTYPE)


