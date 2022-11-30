import { requestAction, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwPricing } from '../model/viewModel/VwPricing';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/Pricing/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwPricing>(entityBase.ASSETPRICING,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwPricing>(entityBase.ASSETPRICING, id,"assetpricing"),
    editData: (id?: string) => editData<VwPricing>(entityBase.ASSETPRICING, id, "assetpricing"),
    saveData: (data: any) => saveData<VwPricing>(entityBase.ASSETPRICING, url, data),
    deleteRecord: (id: string) => deleteRecord<VwPricing>(entityBase.ASSETPRICING, url, id),
    checkSecurity: (history: any) => checkSecurity<VwPricing>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};


export const reducer = (state: stateBase<VwPricing> | undefined, incomingAction: KnownAction<VwPricing>) => reduc<VwPricing>(state, incomingAction, entityBase.ASSETPRICING)


