import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwSurveySubjectParameter } from '../model/viewModel/VwSurveySubjectParameter';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/SurveySubjectParameter/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwSurveySubjectParameter>(entityBase.SURVEYSUBJECTPARAMETER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.SURVEYSUBJECTPARAMETER, pageSize),
    newData: (id: string) => newData<VwSurveySubjectParameter>(entityBase.SURVEYSUBJECTPARAMETER, id, "surveysubjectparameter"),
    editData: (id?: string) => editData<VwSurveySubjectParameter>(entityBase.SURVEYSUBJECTPARAMETER, id, "surveysubjectparameter"),
    saveData: (data: any) => saveData<VwSurveySubjectParameter>(entityBase.SURVEYSUBJECTPARAMETER, url, data),
    deleteRecord: (id: string) => deleteRecord<VwSurveySubjectParameter>(entityBase.SURVEYSUBJECTPARAMETER, url, id),
    checkSecurity: (history: any) => checkSecurity<VwSurveySubjectParameter>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwSurveySubjectParameter> | undefined, incomingAction: KnownAction<VwSurveySubjectParameter>) => reduc<VwSurveySubjectParameter>(state, incomingAction, entityBase.SURVEYSUBJECTPARAMETER)


