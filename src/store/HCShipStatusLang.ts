import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCShipStatusLang } from '../model/viewModel/VwHCShipStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCShipStatusLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCShipStatusLang>(entityBase.HCSHIPSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSHIPSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCShipStatusLang>(entityBase.HCSHIPSTATUSLANG, id, "hcshipstatuslang"),
    editData: (id?: string) => editData<VwHCShipStatusLang>(entityBase.HCSHIPSTATUSLANG, id, "hcshipstatuslang"),
    saveData: (data: any) => saveData<VwHCShipStatusLang>(entityBase.HCSHIPSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCShipStatusLang>(entityBase.HCSHIPSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCShipStatusLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCShipStatusLang> | undefined, incomingAction: KnownAction<VwHCShipStatusLang>) => reduc<VwHCShipStatusLang>(state, incomingAction, entityBase.HCSHIPSTATUSLANG)


