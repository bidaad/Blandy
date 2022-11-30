import { requestAction ,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwProductCategory } from '../model/viewModel/VwProductCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/ProductCategory/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwProductCategory>(entityBase.ProductCategory,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwProductCategory>(entityBase.ProductCategory, id, "productcategories"),
    editData:(id?: string)=> editData<VwProductCategory>(entityBase.ProductCategory,id, "productcategories"),
    saveData: (data: any)=>saveData<VwProductCategory>(entityBase.ProductCategory,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwProductCategory>(entityBase.ProductCategory,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwProductCategory>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer=(state: stateBase<VwProductCategory> | undefined, incomingAction: KnownAction<VwProductCategory>)=>reduc<VwProductCategory>(state,incomingAction, entityBase.ProductCategory)


