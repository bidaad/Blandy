import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetSelectionType } from '../model/viewModel/VwAssetSelectionType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssetSelectionType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssetSelectionType>(entityBase.ASSETSELECTIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETSELECTIONTYPE, pageSize),
    newData: (id: string) => newData<VwAssetSelectionType>(entityBase.ASSETSELECTIONTYPE, id, "assetselectiontype"),
    editData: (id?: string) => editData<VwAssetSelectionType>(entityBase.ASSETSELECTIONTYPE, id, "assetselectiontype"),
    saveData: (data: any) => saveData<VwAssetSelectionType>(entityBase.ASSETSELECTIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetSelectionType>(entityBase.ASSETSELECTIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetSelectionType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwAssetSelectionType> | undefined, incomingAction: KnownAction<VwAssetSelectionType>) => reduc<VwAssetSelectionType>(state, incomingAction, entityBase.ASSETSELECTIONTYPE)


