import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCActionType } from '../model/viewModel/VwHCActionType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCActionType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCActionType>(entityBase.HCACTIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCACTIONTYPE, pageSize),
    newData: (id: string) => newData<VwHCActionType>(entityBase.HCACTIONTYPE, id, "hcactiontype"),
    editData: (id?: string) => editData<VwHCActionType>(entityBase.HCACTIONTYPE, id, "hcactiontype"),
    saveData: (data: any) => saveData<VwHCActionType>(entityBase.HCACTIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCActionType>(entityBase.HCACTIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCActionType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCActionType> | undefined, incomingAction: KnownAction<VwHCActionType>) => reduc<VwHCActionType>(state, incomingAction, entityBase.HCACTIONTYPE)


