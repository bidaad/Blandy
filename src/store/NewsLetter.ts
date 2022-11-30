import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, sendEmail} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { VwNewsLetter } from '../model/viewModel/VwNewsLetter';
import * as UserActionCreator from '../store/UserInfo';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

const url= APIUrl + "/NewsLetter/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwNewsLetter>(entityBase.NEWSLETTER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.NEWSLETTER,pageSize),
    editData:(id?: string)=> editData<VwNewsLetter>(entityBase.NEWSLETTER,id, "newsletter"),
    saveData: (data: any)=>saveData<VwNewsLetter>(entityBase.NEWSLETTER,url,data),
    sendEmail: (data: any)=>sendEmail<VwNewsLetter>(entityBase.NEWSLETTER,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwNewsLetter>(entityBase.NEWSLETTER,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwNewsLetter>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),

};




export const reducer=(state: stateBase<VwNewsLetter> | undefined, incomingAction: KnownAction<VwNewsLetter>)=>reduc<VwNewsLetter>(state,incomingAction, entityBase.NEWSLETTER)


