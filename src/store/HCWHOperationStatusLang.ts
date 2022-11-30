import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWHOperationStatusLang } from '../model/viewModel/VwHCWHOperationStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWHOperationStatusLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWHOperationStatusLang>(entityBase.HCWHOPERATIONSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWHOPERATIONSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCWHOperationStatusLang>(entityBase.HCWHOPERATIONSTATUSLANG, id, "hcwhoperationstatuslang"),
    editData: (id?: string) => editData<VwHCWHOperationStatusLang>(entityBase.HCWHOPERATIONSTATUSLANG, id, "hcwhoperationstatuslang"),
    saveData: (data: any) => saveData<VwHCWHOperationStatusLang>(entityBase.HCWHOPERATIONSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWHOperationStatusLang>(entityBase.HCWHOPERATIONSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWHOperationStatusLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWHOperationStatusLang> | undefined, incomingAction: KnownAction<VwHCWHOperationStatusLang>) => reduc<VwHCWHOperationStatusLang>(state, incomingAction, entityBase.HCWHOPERATIONSTATUSLANG)


