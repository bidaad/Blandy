import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCSurveyDomain } from '../model/viewModel/VwHCSurveyDomain';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCSurveyDomain/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCSurveyDomain>(entityBase.HCSurveyDomain,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSurveyDomain, pageSize),
    newData: (id: string) => newData<VwHCSurveyDomain>(entityBase.HCSurveyDomain, id, "HCSurveyDomain"),
    editData: (id?: string) => editData<VwHCSurveyDomain>(entityBase.HCSurveyDomain, id, "HCSurveyDomain"),
    saveData: (data: any) => saveData<VwHCSurveyDomain>(entityBase.HCSurveyDomain, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCSurveyDomain>(entityBase.HCSurveyDomain, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCSurveyDomain>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCSurveyDomain> | undefined, incomingAction: KnownAction<VwHCSurveyDomain>) => reduc<VwHCSurveyDomain>(state, incomingAction, entityBase.HCSurveyDomain)


