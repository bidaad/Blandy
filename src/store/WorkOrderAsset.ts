import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwWorkOrder } from '../model/viewModel/VwWorkOrder';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from './UserInfo';

const url = APIUrl + "/WorkOrder/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwWorkOrder>(entityBase.WORKORDERASSET,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.WORKORDERASSET, pageSize),
    newData: (id: string) => newData<VwWorkOrder>(entityBase.WORKORDERASSET, id, "workorderasset"),
    editData: (id?: string) => editData<VwWorkOrder>(entityBase.WORKORDERASSET, id, "workorderasset"),
    saveData: (data: any) => saveData<VwWorkOrder>(entityBase.WORKORDERASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwWorkOrder>(entityBase.WORKORDERASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwWorkOrder>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwWorkOrder> | undefined, incomingAction: KnownAction<VwWorkOrder>) => reduc<VwWorkOrder>(state, incomingAction, entityBase.WORKORDERASSET)


