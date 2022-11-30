import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetUsage } from '../model/viewModel/VwAssetUsage';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/AssetUsage/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwAssetUsage>(entityBase.ASSETUSAGE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETUSAGE, pageSize),
    newData: (id: string) => newData<VwAssetUsage>(entityBase.ASSETUSAGE, id, "assetusage"),
    editData: (id?: string) => editData<VwAssetUsage>(entityBase.ASSETUSAGE, id, "assetusage"),
    saveData: (data: any) => saveData<VwAssetUsage>(entityBase.ASSETUSAGE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetUsage>(entityBase.ASSETUSAGE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetUsage>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwAssetUsage> | undefined, incomingAction: KnownAction<VwAssetUsage>) => reduc<VwAssetUsage>(state, incomingAction, entityBase.ASSETUSAGE)


