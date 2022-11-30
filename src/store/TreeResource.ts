import { saveData,reduc, deleteRecord,checkSecurity, fillListAction, editDataFetch, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { VwGetTreeResource } from '../model/viewModel/VwGetTreeResource';
import { VwResource } from '../model/viewModel/VwResource';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
import * as UserActionCreator from '../store/UserInfo';
const url=APIUrl + "/Resource/";
export const actionCreators = {
    // requestList: (AM:AdminModelRequest)=>requestAction<VwResource>(entityBase.RESOURCE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    fillResourceList:(data: any,resource:string)=>fillListAction(entityBase.TREERESOURCE,data,resource),
    editDataFetch:(id?: string)=> editDataFetch<VwResource>(entityBase.TREERESOURCE,id,"treeresources","Resource","Edit_Tree_Resources"),
    newData: (id: string) => newData<VwResource>(entityBase.TREERESOURCE, id, "treeresources"),
    saveData: (data: any)=>saveData<VwGetTreeResource>(entityBase.TREERESOURCE,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwGetTreeResource>(entityBase.TREERESOURCE,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwGetTreeResource>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwGetTreeResource> | undefined, incomingAction: KnownAction<VwGetTreeResource>)=>reduc<VwGetTreeResource>(state,incomingAction, entityBase.TREERESOURCE)


