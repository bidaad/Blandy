import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwSurveySubject } from '../model/viewModel/VwSurveySubject';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/SurveySubject/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwSurveySubject>(entityBase.SURVEYSUBJECT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.SURVEYSUBJECT, pageSize),
    newData: (id: string) => newData<VwSurveySubject>(entityBase.SURVEYSUBJECT, id, "surveysubject"),
    editData: (id?: string) => editData<VwSurveySubject>(entityBase.SURVEYSUBJECT, id, "surveysubject"),
    saveData: (data: any) => saveData<VwSurveySubject>(entityBase.SURVEYSUBJECT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwSurveySubject>(entityBase.SURVEYSUBJECT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwSurveySubject>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwSurveySubject> | undefined, incomingAction: KnownAction<VwSurveySubject>) => reduc<VwSurveySubject>(state, incomingAction, entityBase.SURVEYSUBJECT)


