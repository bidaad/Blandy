import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCResourceTypeLang } from '../model/viewModel/VwHCResourceTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCResourceTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCResourceTypeLang>(entityBase.HCRESOURCETYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCRESOURCETYPELANG, pageSize),
    newData: (id: string) => newData<VwHCResourceTypeLang>(entityBase.HCRESOURCETYPELANG, id, "hcresourcetypelang"),
    editData: (id?: string) => editData<VwHCResourceTypeLang>(entityBase.HCRESOURCETYPELANG, id, "hcresourcetypelang"),
    saveData: (data: any) => saveData<VwHCResourceTypeLang>(entityBase.HCRESOURCETYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCResourceTypeLang>(entityBase.HCRESOURCETYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCResourceTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCResourceTypeLang> | undefined, incomingAction: KnownAction<VwHCResourceTypeLang>) => reduc<VwHCResourceTypeLang>(state, incomingAction, entityBase.HCRESOURCETYPELANG)


