import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCChatTitle } from '../model/viewModel/VwHCChatTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCChatTitle/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCChatTitle>(entityBase.HCCHATTITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCHATTITLE, pageSize),
    newData: (id: string) => newData<VwHCChatTitle>(entityBase.HCCHATTITLE, id, "hcchattitle"),
    editData: (id?: string) => editData<VwHCChatTitle>(entityBase.HCCHATTITLE, id, "hcchattitle"),
    saveData: (data: any) => saveData<VwHCChatTitle>(entityBase.HCCHATTITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCChatTitle>(entityBase.HCCHATTITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCChatTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCChatTitle> | undefined, incomingAction: KnownAction<VwHCChatTitle>) => reduc<VwHCChatTitle>(state, incomingAction, entityBase.HCCHATTITLE)


