import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { VwDocument } from '../model/viewModel/VwDocument';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url= APIUrl + "/Document/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwDocument>(entityBase.Document,url,AM.pageNo,AM.pageSize,AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.Document,pageSize),
    newData: (id: string) => newData<VwDocument>(entityBase.Document, id, "documents"),
    editData:(id?: string)=> editData<VwDocument>(entityBase.Document,id, "documents"),
    saveData: (data: any,folder?:string)=>saveData<VwDocument>(entityBase.Document,url,data,folder),
    deleteRecord: (id: string)=>deleteRecord<VwDocument>(entityBase.Document,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwDocument>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};



export const reducer=(state: stateBase<VwDocument> | undefined, incomingAction: KnownAction<VwDocument>)=>reduc<VwDocument>(state,incomingAction, entityBase.Document)


