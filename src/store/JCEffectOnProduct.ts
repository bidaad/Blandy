import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCEffectOnProduct } from '../model/viewModel/VwJCEffectOnProduct';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCEffectOnProduct/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJCEffectOnProduct>(entityBase.JCEFFECTONPRODUCT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCEFFECTONPRODUCT, pageSize),
    newData: (id: string) => newData<VwJCEffectOnProduct>(entityBase.JCEFFECTONPRODUCT, id, "jceffectonproduct"),
    editData: (id?: string) => editData<VwJCEffectOnProduct>(entityBase.JCEFFECTONPRODUCT, id, "jceffectonproduct"),
    saveData: (data: any) => saveData<VwJCEffectOnProduct>(entityBase.JCEFFECTONPRODUCT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCEffectOnProduct>(entityBase.JCEFFECTONPRODUCT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCEffectOnProduct>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwJCEffectOnProduct> | undefined, incomingAction: KnownAction<VwJCEffectOnProduct>) => reduc<VwJCEffectOnProduct>(state, incomingAction, entityBase.JCEFFECTONPRODUCT)


