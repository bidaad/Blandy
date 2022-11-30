import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBillOfLading } from '../model/viewModel/VwBillOfLading';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/BillOfLading/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwBillOfLading>(entityBase.BILLOFLADING, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BILLOFLADING, pageSize),
    newData: (id: string) => newData<VwBillOfLading>(entityBase.BILLOFLADING, id, "billoflading"),
    editData: (id?: string) => editData<VwBillOfLading>(entityBase.BILLOFLADING, id, "billoflading"),
    saveData: (data: any) => saveData<VwBillOfLading>(entityBase.BILLOFLADING, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBillOfLading>(entityBase.BILLOFLADING, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBillOfLading>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwBillOfLading> | undefined, incomingAction: KnownAction<VwBillOfLading>) => reduc<VwBillOfLading>(state, incomingAction, entityBase.BILLOFLADING)


