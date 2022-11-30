import { VwMessage } from "../model/viewModel/VwMessage";
import { KnownAction } from './actionType';
import { requestAction, setPageSize, editData, saveData, reduc, checkSecurity, deleteRecord } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { entityBase } from "../model/general/entityBase";
import { APIUrl } from "../helper/config";

import * as UserActionCreator from '../store/UserInfo';
import { AdminModelRequest } from "../model/viewModel/AdminModelRequest";
const url = APIUrl + "/Message/";


export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwMessage>(entityBase.MESSAGE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.MESSAGE, pageSize),
    editData: (id?: string) => editData<VwMessage>(entityBase.MESSAGE, id,"messages"),
    saveData: (data: any) => saveData<VwMessage>(entityBase.MESSAGE, url, data),
    checkSecurity: (history: any) => checkSecurity<VwMessage>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
    deleteRecord: (id: string) => deleteRecord<VwMessage>(entityBase.MESSAGE, url, id)

};

export const reducer = (state: stateBase<VwMessage> | undefined, incomingAction: KnownAction<VwMessage>) => reduc<VwMessage>(state, incomingAction, entityBase.MESSAGE)






