import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCAssetQualityLang } from '../model/viewModel/VwHCAssetQualityLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCAssetQualityLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCAssetQualityLang>(entityBase.HCASSETQUALITYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCASSETQUALITYLANG, pageSize),
    newData: (id: string) => newData<VwHCAssetQualityLang>(entityBase.HCASSETQUALITYLANG, id, "hcassetqualitylang"),
    editData: (id?: string) => editData<VwHCAssetQualityLang>(entityBase.HCASSETQUALITYLANG, id, "hcassetqualitylang"),
    saveData: (data: any) => saveData<VwHCAssetQualityLang>(entityBase.HCASSETQUALITYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCAssetQualityLang>(entityBase.HCASSETQUALITYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCAssetQualityLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCAssetQualityLang> | undefined, incomingAction: KnownAction<VwHCAssetQualityLang>) => reduc<VwHCAssetQualityLang>(state, incomingAction, entityBase.HCASSETQUALITYLANG)


