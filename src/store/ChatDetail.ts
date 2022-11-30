import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwChatDetail } from '../model/viewModel/VwChatDetail';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/chatdetail/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwChatDetail>(entityBase.ChatDetail, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ChatDetail, pageSize),
    newData: (id: string) => newData<VwChatDetail>(entityBase.ChatDetail, id, "chatdetail"),
    editData: (id?: string) => editData<VwChatDetail>(entityBase.ChatDetail, id, "chatdetail"),
    saveData: (data: any) => saveData<VwChatDetail>(entityBase.ChatDetail, url, data),
    deleteRecord: (id: string) => deleteRecord<VwChatDetail>(entityBase.ChatDetail, url, id),
    checkSecurity: (history: any) => checkSecurity<VwChatDetail>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwChatDetail> | undefined, incomingAction: KnownAction<VwChatDetail>) => reduc<VwChatDetail>(state, incomingAction, entityBase.ChatDetail)


