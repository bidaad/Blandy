import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWHOperationTypeLang } from '../model/viewModel/VwHCWHOperationTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWHOperationTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWHOperationTypeLang>(entityBase.HCWHOPERATIONTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWHOPERATIONTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCWHOperationTypeLang>(entityBase.HCWHOPERATIONTYPELANG, id, "hcwhoperationtypelang"),
    editData: (id?: string) => editData<VwHCWHOperationTypeLang>(entityBase.HCWHOPERATIONTYPELANG, id, "hcwhoperationtypelang"),
    saveData: (data: any) => saveData<VwHCWHOperationTypeLang>(entityBase.HCWHOPERATIONTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWHOperationTypeLang>(entityBase.HCWHOPERATIONTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWHOperationTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWHOperationTypeLang> | undefined, incomingAction: KnownAction<VwHCWHOperationTypeLang>) => reduc<VwHCWHOperationTypeLang>(state, incomingAction, entityBase.HCWHOPERATIONTYPELANG)


