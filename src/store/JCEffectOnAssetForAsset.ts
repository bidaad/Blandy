import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCEffectOnAsset } from '../model/viewModel/VwJCEffectOnAsset';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/JCEffectOnAsset/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORASSET, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCEFFECTONASSETFORASSET, pageSize),
    newData: (id: string) => newData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORASSET, id, "jceffectonassetforasset"),
    editData: (id?: string) => editData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORASSET, id, "jceffectonassetforasset"),
    saveData: (data: any) => saveData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCEffectOnAsset>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwJCEffectOnAsset> | undefined, incomingAction: KnownAction<VwJCEffectOnAsset>) => reduc<VwJCEffectOnAsset>(state, incomingAction, entityBase.JCEFFECTONASSETFORASSET)


