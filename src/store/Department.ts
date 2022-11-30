import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepartment } from '../model/viewModel/VwDepartment';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/Department/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwDepartment>(entityBase.DEPARTMENT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.DEPARTMENT,pageSize),
    editData:(id?: string)=> editData<VwDepartment>(entityBase.DEPARTMENT,id, "departments"),
    newData: (id: string) => newData<VwDepartment>(entityBase.DEPARTMENT, id, "departments"),
//    newData:()=> newData<VwDepartment>("Departments"),
    saveData: (data: any)=>saveData<VwDepartment>(entityBase.DEPARTMENT,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwDepartment>(entityBase.DEPARTMENT,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwDepartment>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
    // changeResource:(resourceName:string,lang:string)=>UserI.actionCreators.changeResource(resourceName,lang)
};



export const reducer=(state: stateBase<VwDepartment> | undefined, incomingAction: KnownAction<VwDepartment>)=>reduc<VwDepartment>(state,incomingAction, entityBase.DEPARTMENT)


