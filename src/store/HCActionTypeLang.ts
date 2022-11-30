import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCActionTypeLang } from '../model/viewModel/VwHCActionTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCActionTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCActionTypeLang>(entityBase.HCACTIONTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCACTIONTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCActionTypeLang>(entityBase.HCACTIONTYPELANG, id, "hcactiontypelang"),
    editData: (id?: string) => editData<VwHCActionTypeLang>(entityBase.HCACTIONTYPELANG, id, "hcactiontypelang"),
    saveData: (data: any) => saveData<VwHCActionTypeLang>(entityBase.HCACTIONTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCActionTypeLang>(entityBase.HCACTIONTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCActionTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCActionTypeLang> | undefined, incomingAction: KnownAction<VwHCActionTypeLang>) => reduc<VwHCActionTypeLang>(state, incomingAction, entityBase.HCACTIONTYPELANG)


