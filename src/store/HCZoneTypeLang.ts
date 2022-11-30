import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCZoneTypeLang } from '../model/viewModel/VwHCZoneTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCZoneTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCZoneTypeLang>(entityBase.HCZONETYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCZONETYPELANG, pageSize),
    newData: (id: string) => newData<VwHCZoneTypeLang>(entityBase.HCZONETYPELANG, id, "hczonetypelang"),
    editData: (id?: string) => editData<VwHCZoneTypeLang>(entityBase.HCZONETYPELANG, id, "hczonetypelang"),
    saveData: (data: any) => saveData<VwHCZoneTypeLang>(entityBase.HCZONETYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCZoneTypeLang>(entityBase.HCZONETYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCZoneTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCZoneTypeLang> | undefined, incomingAction: KnownAction<VwHCZoneTypeLang>) => reduc<VwHCZoneTypeLang>(state, incomingAction, entityBase.HCZONETYPELANG)


