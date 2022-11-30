import {   editData, reduc, deleteRecord, checkSecurity, newData, requestActionWithDifferentAction, saveDataDifferentAction, setPageSize } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwChat } from '../model/viewModel/VwChat';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/Chat/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestActionWithDifferentAction<VwChat>(entityBase.MessageBox, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId,'',"ReadDataMessageBox"),
    setPageSize: (pageSize: number) => setPageSize(entityBase.MessageBox, pageSize),
    newData: (id: string) => newData<VwChat>(entityBase.MessageBox, id, "messagebox"),
    editData: (id: string) => editData<VwChat>(entityBase.MessageBox, id, "messagebox"),
    saveDataMesasage: (data: any) => saveDataDifferentAction<VwChat>(entityBase.MessageBox, url, data,'',"SaveMessageBox"),
    deleteRecord: (id: string) => deleteRecord<VwChat>(entityBase.MessageBox, url, id),
    checkSecurity: (history: any) => checkSecurity<VwChat>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwChat> | undefined, incomingAction: KnownAction<VwChat>) => reduc<VwChat>(state, incomingAction, entityBase.MessageBox)


