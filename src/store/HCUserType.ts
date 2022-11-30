import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCUserType } from '../model/viewModel/VwHCUserType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCUserType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCUserType>(entityBase.HCUSERTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCUSERTYPE, pageSize),
    newData: (id: string) => newData<VwHCUserType>(entityBase.HCUSERTYPE, id, "hcusertype"),
    editData: (id?: string) => editData<VwHCUserType>(entityBase.HCUSERTYPE, id, "hcusertype"),
    saveData: (data: any) => saveData<VwHCUserType>(entityBase.HCUSERTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCUserType>(entityBase.HCUSERTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCUserType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCUserType> | undefined, incomingAction: KnownAction<VwHCUserType>) => reduc<VwHCUserType>(state, incomingAction, entityBase.HCUSERTYPE)


