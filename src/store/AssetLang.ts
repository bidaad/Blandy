import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetLang } from '../model/viewModel/VwAssetLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssetLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssetLang>(entityBase.ASSETLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETLANG, pageSize),
    newData: (id: string) => newData<VwAssetLang>(entityBase.ASSETLANG, id, "assetlang"),
    editData: (id?: string) => editData<VwAssetLang>(entityBase.ASSETLANG, id, "assetlang"),
    saveData: (data: any) => saveData<VwAssetLang>(entityBase.ASSETLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetLang>(entityBase.ASSETLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwAssetLang> | undefined, incomingAction: KnownAction<VwAssetLang>) => reduc<VwAssetLang>(state, incomingAction, entityBase.ASSETLANG)


