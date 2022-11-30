import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPersonCategory } from '../model/viewModel/VwPersonCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/PersonCategory/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwPersonCategory>(entityBase.PERSONCATEGORY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PERSONCATEGORY, pageSize),
    newData: (id: string) => newData<VwPersonCategory>(entityBase.PERSONCATEGORY, id, "personcategory"),
    editData: (id?: string) => editData<VwPersonCategory>(entityBase.PERSONCATEGORY, id, "personcategory"),
    saveData: (data: any) => saveData<VwPersonCategory>(entityBase.PERSONCATEGORY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwPersonCategory>(entityBase.PERSONCATEGORY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwPersonCategory>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwPersonCategory> | undefined, incomingAction: KnownAction<VwPersonCategory>) => reduc<VwPersonCategory>(state, incomingAction, entityBase.PERSONCATEGORY)


