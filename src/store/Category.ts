import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity} from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwCategory } from '../model/viewModel/VwCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/Category/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwCategory>(entityBase.Category,url,AM.pageNo,AM.pageSize,AM.filter,'',AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.Category,pageSize),
    editData:(id?: string)=> editData<VwCategory>(entityBase.Category,id, "categories"),
//    newData:()=> newData<VwCategory>("Categorys"),
    saveData: (data: any)=>saveData<VwCategory>(entityBase.Category,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwCategory>(entityBase.Category,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwCategory>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
    // changeResource:(resourceName:string,lang:string)=>UserI.actionCreators.changeResource(resourceName,lang)
};



export const reducer=(state: stateBase<VwCategory> | undefined, incomingAction: KnownAction<VwCategory>)=>reduc<VwCategory>(state,incomingAction, entityBase.Category)


