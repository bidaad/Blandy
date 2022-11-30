import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwPersonBrand } from '../model/viewModel/VwPersonBrand';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/PersonBrand/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwPersonBrand>(entityBase.PERSONBRAND,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PERSONBRAND, pageSize),
    newData: (id: string) => newData<VwPersonBrand>(entityBase.PERSONBRAND, id, "personbrands"),
    editData: (id?: string) => editData<VwPersonBrand>(entityBase.PERSONBRAND, id, "personbrands"),
    saveData: (data: any) => saveData<VwPersonBrand>(entityBase.PERSONBRAND, url, data),
    deleteRecord: (id: string) => deleteRecord<VwPersonBrand>(entityBase.PERSONBRAND, url, id),
    checkSecurity: (history: any) => checkSecurity<VwPersonBrand>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwPersonBrand> | undefined, incomingAction: KnownAction<VwPersonBrand>) => reduc<VwPersonBrand>(state, incomingAction, entityBase.PERSONBRAND)


