import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCJCOperationTypeLang } from '../model/viewModel/VwHCJCOperationTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCJCOperationTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCJCOperationTypeLang>(entityBase.HCJCOPERATIONTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCJCOPERATIONTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCJCOperationTypeLang>(entityBase.HCJCOPERATIONTYPELANG, id, "hcjcoperationtypelang"),
    editData: (id?: string) => editData<VwHCJCOperationTypeLang>(entityBase.HCJCOPERATIONTYPELANG, id, "hcjcoperationtypelang"),
    saveData: (data: any) => saveData<VwHCJCOperationTypeLang>(entityBase.HCJCOPERATIONTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCJCOperationTypeLang>(entityBase.HCJCOPERATIONTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCJCOperationTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCJCOperationTypeLang> | undefined, incomingAction: KnownAction<VwHCJCOperationTypeLang>) => reduc<VwHCJCOperationTypeLang>(state, incomingAction, entityBase.HCJCOPERATIONTYPELANG)


