import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepPolicy } from '../model/viewModel/VwDepPolicy';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';


const url = APIUrl + "/DepPolicy/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepPolicy>(entityBase.DEPPOLICY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPPOLICY, pageSize),
    newData: (id: string) => newData<VwDepPolicy>(entityBase.DEPPOLICY, id, "deppolicy"),
    editData: (id?: string) => editData<VwDepPolicy>(entityBase.DEPPOLICY, id, "deppolicy"),
    saveData: (data: any) => saveData<VwDepPolicy>(entityBase.DEPPOLICY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepPolicy>(entityBase.DEPPOLICY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepPolicy>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwDepPolicy> | undefined, incomingAction: KnownAction<VwDepPolicy>) => reduc<VwDepPolicy>(state, incomingAction, entityBase.DEPPOLICY)


