import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwContact } from '../model/viewModel/VwContact';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/Contact/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwContact>(entityBase.CONTACT, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CONTACT, pageSize),
    newData: (id: string) => newData<VwContact>(entityBase.CONTACT, id, "contact"),
    editData: (id: string) => editData<VwContact>(entityBase.CONTACT, id, "contact"),
    saveData: (data: any) => saveData<VwContact>(entityBase.CONTACT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwContact>(entityBase.CONTACT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwContact>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwContact> | undefined, incomingAction: KnownAction<VwContact>) => reduc<VwContact>(state, incomingAction, entityBase.CONTACT)


