import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWOStatusLang } from '../model/viewModel/VwHCWOStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCWOStatusLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCWOStatusLang>(entityBase.HCWOSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWOSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCWOStatusLang>(entityBase.HCWOSTATUSLANG, id, "hcwostatuslang"),
    editData: (id?: string) => editData<VwHCWOStatusLang>(entityBase.HCWOSTATUSLANG, id, "hcwostatuslang"),
    saveData: (data: any) => saveData<VwHCWOStatusLang>(entityBase.HCWOSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWOStatusLang>(entityBase.HCWOSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWOStatusLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCWOStatusLang> | undefined, incomingAction: KnownAction<VwHCWOStatusLang>) => reduc<VwHCWOStatusLang>(state, incomingAction, entityBase.HCWOSTATUSLANG)


