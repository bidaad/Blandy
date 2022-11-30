import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCEffectOnAsset } from '../model/viewModel/VwJCEffectOnAsset';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCEffectOnAsset/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSET, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCEFFECTONASSET, pageSize),
    newData: (id: string) => newData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSET, id, "jceffectonasset"),
    editData: (id?: string) => editData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSET, id, "jceffectonasset"),
    saveData: (data: any) => saveData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCEffectOnAsset>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwJCEffectOnAsset> | undefined, incomingAction: KnownAction<VwJCEffectOnAsset>) => reduc<VwJCEffectOnAsset>(state, incomingAction, entityBase.JCEFFECTONASSET)


