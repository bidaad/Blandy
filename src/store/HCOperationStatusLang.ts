import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCOperationStatusLang } from '../model/viewModel/VwHCOperationStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCOperationStatusLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCOperationStatusLang>(entityBase.HCOPERATIONSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCOPERATIONSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCOperationStatusLang>(entityBase.HCOPERATIONSTATUSLANG, id, "hcoperationstatuslang"),
    editData: (id?: string) => editData<VwHCOperationStatusLang>(entityBase.HCOPERATIONSTATUSLANG, id, "hcoperationstatuslang"),
    saveData: (data: any) => saveData<VwHCOperationStatusLang>(entityBase.HCOPERATIONSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCOperationStatusLang>(entityBase.HCOPERATIONSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCOperationStatusLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCOperationStatusLang> | undefined, incomingAction: KnownAction<VwHCOperationStatusLang>) => reduc<VwHCOperationStatusLang>(state, incomingAction, entityBase.HCOPERATIONSTATUSLANG)


