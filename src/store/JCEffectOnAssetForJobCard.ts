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
    requestList: (AM:AdminModelRequest) => requestAction<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORJOBCARD, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCEFFECTONASSETFORJOBCARD, pageSize),
    newData: (id: string) => newData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORJOBCARD, id, "jceffectonassetforjobcard"),
    editData: (id?: string) => editData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORJOBCARD, id, "jceffectonassetforjobcard"),
    saveData: (data: any) => saveData<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORJOBCARD, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCEffectOnAsset>(entityBase.JCEFFECTONASSETFORJOBCARD, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCEffectOnAsset>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwJCEffectOnAsset> | undefined, incomingAction: KnownAction<VwJCEffectOnAsset>) => reduc<VwJCEffectOnAsset>(state, incomingAction, entityBase.JCEFFECTONASSETFORJOBCARD)


