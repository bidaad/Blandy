import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwShippingDetail } from '../model/viewModel/VwShippingDetail';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url= APIUrl + "/ShippingDetail/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwShippingDetail>(entityBase.SHIPPINGDETAIL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.SHIPPINGDETAIL,pageSize),
    editData:(id?: string)=> editData<VwShippingDetail>(entityBase.SHIPPINGDETAIL,id, "shippingdetail"),
    saveData: (data: any)=>saveData<VwShippingDetail>(entityBase.SHIPPINGDETAIL,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwShippingDetail>(entityBase.SHIPPINGDETAIL,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwShippingDetail>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};


export const reducer=(state: stateBase<VwShippingDetail> | undefined, incomingAction: KnownAction<VwShippingDetail>)=>reduc<VwShippingDetail>(state,incomingAction, entityBase.SHIPPINGDETAIL)


