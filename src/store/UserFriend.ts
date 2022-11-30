import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwUserFriend } from '../model/viewModel/VwUserFriend';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/UserFriend/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwUserFriend>(entityBase.USERFRIEND,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.USERFRIEND, pageSize),
    newData: (id: string) => newData<VwUserFriend>(entityBase.USERFRIEND, id, "userfriend"),
    editData: (id?: string) => editData<VwUserFriend>(entityBase.USERFRIEND, id, "userfriend"),
    saveData: (data: any) => saveData<VwUserFriend>(entityBase.USERFRIEND, url, data),
    deleteRecord: (id: string) => deleteRecord<VwUserFriend>(entityBase.USERFRIEND, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserFriend>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwUserFriend> | undefined, incomingAction: KnownAction<VwUserFriend>) => reduc<VwUserFriend>(state, incomingAction, entityBase.USERFRIEND)


