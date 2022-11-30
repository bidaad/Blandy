import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAssetHealthStatusLang } from '../model/viewModel/VwHCAssetHealthStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAssetHealthStatusLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAssetHealthStatusLang>(entityBase.HCASSETHEALTHSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCASSETHEALTHSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCAssetHealthStatusLang>(entityBase.HCASSETHEALTHSTATUSLANG, id, "hcassethealthstatuslang"),
    editData: (id?: string) => editData<VwHCAssetHealthStatusLang>(entityBase.HCASSETHEALTHSTATUSLANG, id, "hcassethealthstatuslang"),
    saveData: (data: any) => saveData<VwHCAssetHealthStatusLang>(entityBase.HCASSETHEALTHSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAssetHealthStatusLang>(entityBase.HCASSETHEALTHSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAssetHealthStatusLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAssetHealthStatusLang> | undefined, incomingAction: KnownAction<VwHCAssetHealthStatusLang>) => reduc<VwHCAssetHealthStatusLang>(state, incomingAction, entityBase.HCASSETHEALTHSTATUSLANG)


