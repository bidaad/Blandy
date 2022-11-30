import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCMessageType } from '../model/viewModel/VwHCMessageType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCMessageType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCMessageType>(entityBase.HCMESSAGETYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCMESSAGETYPE, pageSize),
    newData: (id: string) => newData<VwHCMessageType>(entityBase.HCMESSAGETYPE, id, "hcmessagetype"),
    editData: (id?: string) => editData<VwHCMessageType>(entityBase.HCMESSAGETYPE, id, "hcmessagetype"),
    saveData: (data: any) => saveData<VwHCMessageType>(entityBase.HCMESSAGETYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCMessageType>(entityBase.HCMESSAGETYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCMessageType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCMessageType> | undefined, incomingAction: KnownAction<VwHCMessageType>) => reduc<VwHCMessageType>(state, incomingAction, entityBase.HCMESSAGETYPE)


