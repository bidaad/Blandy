import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepPolicyLang } from '../model/viewModel/VwDepPolicyLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';


const url = APIUrl + "/DepPolicyLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepPolicyLang>(entityBase.DEPPOLICYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPPOLICYLANG, pageSize),
    newData: (id: string) => newData<VwDepPolicyLang>(entityBase.DEPPOLICYLANG, id, "deppolicylang"),
    editData: (id?: string) => editData<VwDepPolicyLang>(entityBase.DEPPOLICYLANG, id, "deppolicylang"),
    saveData: (data: any) => saveData<VwDepPolicyLang>(entityBase.DEPPOLICYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepPolicyLang>(entityBase.DEPPOLICYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepPolicyLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwDepPolicyLang> | undefined, incomingAction: KnownAction<VwDepPolicyLang>) => reduc<VwDepPolicyLang>(state, incomingAction, entityBase.DEPPOLICYLANG)


