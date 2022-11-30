import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAssetQuality } from '../model/viewModel/VwHCAssetQuality';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAssetQuality/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAssetQuality>(entityBase.HCASSETQUALITY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCASSETQUALITY, pageSize),
    newData: (id: string) => newData<VwHCAssetQuality>(entityBase.HCASSETQUALITY, id, "hcassetquality"),
    editData: (id?: string) => editData<VwHCAssetQuality>(entityBase.HCASSETQUALITY, id, "hcassetquality"),
    saveData: (data: any) => saveData<VwHCAssetQuality>(entityBase.HCASSETQUALITY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAssetQuality>(entityBase.HCASSETQUALITY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAssetQuality>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAssetQuality> | undefined, incomingAction: KnownAction<VwHCAssetQuality>) => reduc<VwHCAssetQuality>(state, incomingAction, entityBase.HCASSETQUALITY)


