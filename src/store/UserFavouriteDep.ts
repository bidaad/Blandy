import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwUserFavouriteDep } from '../model/viewModel/VwUserFavouriteDep';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';

const url = APIUrl + "/UserFavouriteDep/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwUserFavouriteDep>(entityBase.USERFAVOURITEDEP,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.USERFAVOURITEDEP, pageSize),
    newData: (id: string) => newData<VwUserFavouriteDep>(entityBase.USERFAVOURITEDEP, id, "userfavouritedep"),
    editData: (id?: string) => editData<VwUserFavouriteDep>(entityBase.USERFAVOURITEDEP, id, "userfavouritedep"),
    saveData: (data: any) => saveData<VwUserFavouriteDep>(entityBase.USERFAVOURITEDEP, url, data),
    deleteRecord: (id: string) => deleteRecord<VwUserFavouriteDep>(entityBase.USERFAVOURITEDEP, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserFavouriteDep>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwUserFavouriteDep> | undefined, incomingAction: KnownAction<VwUserFavouriteDep>) => reduc<VwUserFavouriteDep>(state, incomingAction, entityBase.USERFAVOURITEDEP)


