import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAsset } from '../model/viewModel/VwAsset';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
import * as UserActionCreator from './UserInfo';
const url=APIUrl + "/Asset/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwAsset>(entityBase.ASSETDEP, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.ASSETDEP,pageSize),
    newData: (id: string) => newData<VwAsset>(entityBase.ASSETDEP, id, "assetdep"),
    editData:(id?: string)=> editData<VwAsset>(entityBase.ASSETDEP,id, "assetdep"),
    saveData: (data: any)=>saveData<VwAsset>(entityBase.ASSETDEP,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwAsset>(entityBase.ASSETDEP,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwAsset>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};




export const reducer=(state: stateBase<VwAsset> | undefined, incomingAction: KnownAction<VwAsset>)=>reduc<VwAsset>(state,incomingAction, entityBase.ASSETDEP)


