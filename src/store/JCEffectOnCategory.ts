import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwJCEffectOnCategory } from '../model/viewModel/VwJCEffectOnCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/JCEffectOnCategory/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwJCEffectOnCategory>(entityBase.JCEFFECTONCATEGORY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.JCEFFECTONCATEGORY, pageSize),
    newData: (id: string) => newData<VwJCEffectOnCategory>(entityBase.JCEFFECTONCATEGORY, id, "jceffectoncategory"),
    editData: (id?: string) => editData<VwJCEffectOnCategory>(entityBase.JCEFFECTONCATEGORY, id, "jceffectoncategory"),
    saveData: (data: any) => saveData<VwJCEffectOnCategory>(entityBase.JCEFFECTONCATEGORY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwJCEffectOnCategory>(entityBase.JCEFFECTONCATEGORY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwJCEffectOnCategory>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwJCEffectOnCategory> | undefined, incomingAction: KnownAction<VwJCEffectOnCategory>) => reduc<VwJCEffectOnCategory>(state, incomingAction, entityBase.JCEFFECTONCATEGORY)


