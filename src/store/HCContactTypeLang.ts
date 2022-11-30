import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCContactTypeLang } from '../model/viewModel/VwHCContactTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCContactTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCContactTypeLang>(entityBase.HCCONTACTTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCONTACTTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCContactTypeLang>(entityBase.HCCONTACTTYPELANG, id, "hccontacttypelang"),
    editData: (id?: string) => editData<VwHCContactTypeLang>(entityBase.HCCONTACTTYPELANG, id, "hccontacttypelang"),
    saveData: (data: any) => saveData<VwHCContactTypeLang>(entityBase.HCCONTACTTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCContactTypeLang>(entityBase.HCCONTACTTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCContactTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCContactTypeLang> | undefined, incomingAction: KnownAction<VwHCContactTypeLang>) => reduc<VwHCContactTypeLang>(state, incomingAction, entityBase.HCCONTACTTYPELANG)


