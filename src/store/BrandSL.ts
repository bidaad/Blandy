import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { VwBrand } from '../model/viewModel/VwBrand';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from './UserInfo';

const url= APIUrl + "/Brand/";
export const actionCreators = {
        requestList: (AM:AdminModelRequest)=>requestAction<VwBrand>(entityBase.BRANDSL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.BRANDSL,pageSize),
    editData:(id?: string)=> editData<VwBrand>(entityBase.BRANDSL,id, "brandssl"),
    newData: (id: string) => newData<VwBrand>(entityBase.BRANDSL, id, "brandssl"),
    saveData: (data: any)=>saveData<VwBrand>(entityBase.BRANDSL,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwBrand>(entityBase.BRANDSL,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwBrand>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwBrand> | undefined, incomingAction: KnownAction<VwBrand>)=>reduc<VwBrand>(state,incomingAction, entityBase.BRANDSL)


