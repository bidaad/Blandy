import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCNeedProduct } from '../model/viewModel/VwJCNeedProduct';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCNeedProduct/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJCNeedProduct>(entityBase.JCNEEDPRODUCT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCNEEDPRODUCT, pageSize),
    newData: (id: string) => newData<VwJCNeedProduct>(entityBase.JCNEEDPRODUCT, id, "jcneedproduct"),
    editData: (id?: string) => editData<VwJCNeedProduct>(entityBase.JCNEEDPRODUCT, id, "jcneedproduct"),
    saveData: (data: any) => saveData<VwJCNeedProduct>(entityBase.JCNEEDPRODUCT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCNeedProduct>(entityBase.JCNEEDPRODUCT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCNeedProduct>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwJCNeedProduct> | undefined, incomingAction: KnownAction<VwJCNeedProduct>) => reduc<VwJCNeedProduct>(state, incomingAction, entityBase.JCNEEDPRODUCT)


