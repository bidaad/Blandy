import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwUserFavouriteAsset } from '../model/viewModel/VwUserFavouriteAsset';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/UserFavouriteAsset/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwUserFavouriteAsset>(entityBase.USERFAVOURITEASSET,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.USERFAVOURITEASSET, pageSize),
    newData: (id: string) => newData<VwUserFavouriteAsset>(entityBase.USERFAVOURITEASSET, id, "userfavouriteasset"),
    editData: (id?: string) => editData<VwUserFavouriteAsset>(entityBase.USERFAVOURITEASSET, id, "userfavouriteasset"),
    saveData: (data: any) => saveData<VwUserFavouriteAsset>(entityBase.USERFAVOURITEASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwUserFavouriteAsset>(entityBase.USERFAVOURITEASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserFavouriteAsset>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwUserFavouriteAsset> | undefined, incomingAction: KnownAction<VwUserFavouriteAsset>) => reduc<VwUserFavouriteAsset>(state, incomingAction, entityBase.USERFAVOURITEASSET)


