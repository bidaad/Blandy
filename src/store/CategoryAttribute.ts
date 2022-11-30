import { requestAction, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwCategoryAttribute } from '../model/viewModel/VwCategoryAttribute';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/CategoryAttribute/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwCategoryAttribute>(entityBase.CategoryAttribute,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwCategoryAttribute>(entityBase.CategoryAttribute, id, "categoryattributes"),
    editData: (id?: string) => editData<VwCategoryAttribute>(entityBase.CategoryAttribute, id, "categoryattributes"),
    saveData: (data: any) => saveData<VwCategoryAttribute>(entityBase.CategoryAttribute, url, data),
    deleteRecord: (id: string) => deleteRecord<VwCategoryAttribute>(entityBase.CategoryAttribute, url, id),
    checkSecurity: (history: any) => checkSecurity<VwCategoryAttribute>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwCategoryAttribute> | undefined, incomingAction: KnownAction<VwCategoryAttribute>) => reduc<VwCategoryAttribute>(state, incomingAction, entityBase.CategoryAttribute)


