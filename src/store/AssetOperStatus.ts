import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetOperStatus } from '../model/viewModel/VwAssetOperStatus';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssetOperStatus/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssetOperStatus>(entityBase.ASSETOPERSTATUS,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETOPERSTATUS, pageSize),
    newData: (id: string) => newData<VwAssetOperStatus>(entityBase.ASSETOPERSTATUS, id, "assetoperstatus"),
    editData: (id?: string) => editData<VwAssetOperStatus>(entityBase.ASSETOPERSTATUS, id, "assetoperstatus"),
    saveData: (data: any) => saveData<VwAssetOperStatus>(entityBase.ASSETOPERSTATUS, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetOperStatus>(entityBase.ASSETOPERSTATUS, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetOperStatus>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwAssetOperStatus> | undefined, incomingAction: KnownAction<VwAssetOperStatus>) => reduc<VwAssetOperStatus>(state, incomingAction, entityBase.ASSETOPERSTATUS)


