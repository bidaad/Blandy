import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCColorLang } from '../model/viewModel/VwHCColorLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCColorLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCColorLang>(entityBase.HCCOLORLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCOLORLANG, pageSize),
    newData: (id: string) => newData<VwHCColorLang>(entityBase.HCCOLORLANG, id, "hccolorlang"),
    editData: (id?: string) => editData<VwHCColorLang>(entityBase.HCCOLORLANG, id, "hccolorlang"),
    saveData: (data: any) => saveData<VwHCColorLang>(entityBase.HCCOLORLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCColorLang>(entityBase.HCCOLORLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCColorLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCColorLang> | undefined, incomingAction: KnownAction<VwHCColorLang>) => reduc<VwHCColorLang>(state, incomingAction, entityBase.HCCOLORLANG)


