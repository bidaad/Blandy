import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwContact } from '../model/viewModel/VwContact';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/Contact/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwContact>(entityBase.CONTACTDEP, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CONTACTDEP, pageSize),
    newData: (id: string) => newData<VwContact>(entityBase.CONTACTDEP, id, "contactdep"),
    editData: (id: string) => editData<VwContact>(entityBase.CONTACTDEP, id, "contactdep"),
    saveData: (data: any) => saveData<VwContact>(entityBase.CONTACTDEP, url, data),
    deleteRecord: (id: string) => deleteRecord<VwContact>(entityBase.CONTACTDEP, url, id),
    checkSecurity: (history: any) => checkSecurity<VwContact>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwContact> | undefined, incomingAction: KnownAction<VwContact>) => reduc<VwContact>(state, incomingAction, entityBase.CONTACTDEP)


