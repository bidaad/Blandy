import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetAttribute } from '../model/viewModel/VwAssetAttribute';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssetAttribute/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwAssetAttribute>(entityBase.ASSETATTRIBUTE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETATTRIBUTE, pageSize),
    newData: (id: string) => newData<VwAssetAttribute>(entityBase.ASSETATTRIBUTE, id, "assetattribute"),
    editData: (id?: string) => editData<VwAssetAttribute>(entityBase.ASSETATTRIBUTE, id, "assetattribute"),
    saveData: (data: any) => saveData<VwAssetAttribute>(entityBase.ASSETATTRIBUTE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetAttribute>(entityBase.ASSETATTRIBUTE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetAttribute>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwAssetAttribute> | undefined, incomingAction: KnownAction<VwAssetAttribute>) => reduc<VwAssetAttribute>(state, incomingAction, entityBase.ASSETATTRIBUTE)


