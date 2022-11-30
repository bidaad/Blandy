import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepBrand } from '../model/viewModel/VwDepBrand';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/DepBrand/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepBrand>(entityBase.DEPBRAND,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.DEPBRAND,pageSize),
    newData: (id: string) => newData<VwDepBrand>(entityBase.DEPBRAND, id, "depbrand"),
    editData:(id?: string)=> editData<VwDepBrand>(entityBase.DEPBRAND,id, "depbrand"),
    saveData: (data: any)=>saveData<VwDepBrand>(entityBase.DEPBRAND,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwDepBrand>(entityBase.DEPBRAND,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwDepBrand>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};




export const reducer=(state: stateBase<VwDepBrand> | undefined, incomingAction: KnownAction<VwDepBrand>)=>reduc<VwDepBrand>(state,incomingAction, entityBase.DEPBRAND)


