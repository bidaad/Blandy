import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCDepTypeLang } from '../model/viewModel/VwHCDepTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCDepTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCDepTypeLang>(entityBase.HCDEPTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCDEPTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCDepTypeLang>(entityBase.HCDEPTYPELANG, id, "hcdeptypelang"),
    editData: (id?: string) => editData<VwHCDepTypeLang>(entityBase.HCDEPTYPELANG, id, "hcdeptypelang"),
    saveData: (data: any) => saveData<VwHCDepTypeLang>(entityBase.HCDEPTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCDepTypeLang>(entityBase.HCDEPTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCDepTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCDepTypeLang> | undefined, incomingAction: KnownAction<VwHCDepTypeLang>) => reduc<VwHCDepTypeLang>(state, incomingAction, entityBase.HCDEPTYPELANG)


