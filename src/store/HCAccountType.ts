import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAccountType } from '../model/viewModel/VwHCAccountType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAccountType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAccountType>(entityBase.HCACCOUNTTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCACCOUNTTYPE, pageSize),
    newData: (id: string) => newData<VwHCAccountType>(entityBase.HCACCOUNTTYPE, id, "hcaccounttype"),
    editData: (id?: string) => editData<VwHCAccountType>(entityBase.HCACCOUNTTYPE, id, "hcaccounttype"),
    saveData: (data: any) => saveData<VwHCAccountType>(entityBase.HCACCOUNTTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAccountType>(entityBase.HCACCOUNTTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAccountType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAccountType> | undefined, incomingAction: KnownAction<VwHCAccountType>) => reduc<VwHCAccountType>(state, incomingAction, entityBase.HCACCOUNTTYPE)


