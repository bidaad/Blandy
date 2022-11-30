import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCGenderLang } from '../model/viewModel/VwHCGenderLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCGenderLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCGenderLang>(entityBase.HCGENDERLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCGENDERLANG, pageSize),
    newData: (id: string) => newData<VwHCGenderLang>(entityBase.HCGENDERLANG, id, "hcgenderlang"),
    editData: (id?: string) => editData<VwHCGenderLang>(entityBase.HCGENDERLANG, id, "hcgenderlang"),
    saveData: (data: any) => saveData<VwHCGenderLang>(entityBase.HCGENDERLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCGenderLang>(entityBase.HCGENDERLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCGenderLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCGenderLang> | undefined, incomingAction: KnownAction<VwHCGenderLang>) => reduc<VwHCGenderLang>(state, incomingAction, entityBase.HCGENDERLANG)


