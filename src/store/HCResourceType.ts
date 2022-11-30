import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCResourceType } from '../model/viewModel/VwHCResourceType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCResourceType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCResourceType>(entityBase.HCRESOURCETYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCRESOURCETYPE, pageSize),
    newData: (id: string) => newData<VwHCResourceType>(entityBase.HCRESOURCETYPE, id, "hcresourcetype"),
    editData: (id?: string) => editData<VwHCResourceType>(entityBase.HCRESOURCETYPE, id, "hcresourcetype"),
    saveData: (data: any) => saveData<VwHCResourceType>(entityBase.HCRESOURCETYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCResourceType>(entityBase.HCRESOURCETYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCResourceType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCResourceType> | undefined, incomingAction: KnownAction<VwHCResourceType>) => reduc<VwHCResourceType>(state, incomingAction, entityBase.HCRESOURCETYPE)


