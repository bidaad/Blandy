import { requestAction, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwProductAttribute } from '../model/viewModel/VwProductAttribute';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/ProductAttribute/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwProductAttribute>(entityBase.ProductAttribute,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    newData: (id: string) => newData<VwProductAttribute>(entityBase.ProductAttribute, id, "productattributes"),
    editData: (id?: string) => editData<VwProductAttribute>(entityBase.ProductAttribute, id, "productattributes"),
    saveData: (data: any) => saveData<VwProductAttribute>(entityBase.ProductAttribute, url, data),
    deleteRecord: (id: string) => deleteRecord<VwProductAttribute>(entityBase.ProductAttribute, url, id),
    checkSecurity: (history: any) => checkSecurity<VwProductAttribute>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwProductAttribute> | undefined, incomingAction: KnownAction<VwProductAttribute>) => reduc<VwProductAttribute>(state, incomingAction, entityBase.ProductAttribute)


