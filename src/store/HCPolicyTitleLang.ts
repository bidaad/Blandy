import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPolicyTitleLang } from '../model/viewModel/VwHCPolicyTitleLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPolicyTitleLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPolicyTitleLang>(entityBase.HCPOLICYTITLELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPOLICYTITLELANG, pageSize),
    newData: (id: string) => newData<VwHCPolicyTitleLang>(entityBase.HCPOLICYTITLELANG, id, "hcpolicytitlelang"),
    editData: (id?: string) => editData<VwHCPolicyTitleLang>(entityBase.HCPOLICYTITLELANG, id, "hcpolicytitlelang"),
    saveData: (data: any) => saveData<VwHCPolicyTitleLang>(entityBase.HCPOLICYTITLELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPolicyTitleLang>(entityBase.HCPOLICYTITLELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPolicyTitleLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPolicyTitleLang> | undefined, incomingAction: KnownAction<VwHCPolicyTitleLang>) => reduc<VwHCPolicyTitleLang>(state, incomingAction, entityBase.HCPOLICYTITLELANG)


