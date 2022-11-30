import { requestAction ,setPageSize,editData,saveData,reduc, deleteRecord,checkSecurity, newData} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJobCard } from '../model/viewModel/VwJobCard';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from './UserInfo';
const url= APIUrl + "/JobCard/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJobCard>(entityBase.JOBCARDSL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize:(pageSize: number)=> setPageSize(entityBase.JOBCARDSL,pageSize),
    newData: (id: string) => newData<VwJobCard>(entityBase.JOBCARDSL, id, "jobcardsl"),
    editData:(id?: string)=> editData<VwJobCard>(entityBase.JOBCARDSL,id, "jobcardsl"),
    saveData: (data: any)=>saveData<VwJobCard>(entityBase.JOBCARDSL,url,data),
    deleteRecord: (id: string)=>deleteRecord<VwJobCard>(entityBase.JOBCARDSL,url,id),
    checkSecurity: (history:any)=>checkSecurity<VwJobCard>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};




export const reducer=(state: stateBase<VwJobCard> | undefined, incomingAction: KnownAction<VwJobCard>)=>reduc<VwJobCard>(state,incomingAction, entityBase.JOBCARDSL)


