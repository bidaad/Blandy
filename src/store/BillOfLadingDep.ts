import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwBillOfLading } from '../model/viewModel/VwBillOfLading';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/BillOfLading/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwBillOfLading>(entityBase.BILLOFLADINGDEP,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.BILLOFLADINGDEP, pageSize),
    newData: (id: string) => newData<VwBillOfLading>(entityBase.BILLOFLADINGDEP, id, "billofladingdep"),
    editData: (id?: string) => editData<VwBillOfLading>(entityBase.BILLOFLADINGDEP, id, "billofladingdep"),
    saveData: (data: any) => saveData<VwBillOfLading>(entityBase.BILLOFLADINGDEP, url, data),
    deleteRecord: (id: string) => deleteRecord<VwBillOfLading>(entityBase.BILLOFLADINGDEP, url, id),
    checkSecurity: (history: any) => checkSecurity<VwBillOfLading>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwBillOfLading> | undefined, incomingAction: KnownAction<VwBillOfLading>) => reduc<VwBillOfLading>(state, incomingAction, entityBase.BILLOFLADINGDEP)


