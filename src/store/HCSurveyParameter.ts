import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCSurveyParameter } from '../model/viewModel/VwHCSurveyParameter';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCSurveyParameter/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCSurveyParameter>(entityBase.HCSURVEYPARAMETER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSURVEYPARAMETER, pageSize),
    newData: (id: string) => newData<VwHCSurveyParameter>(entityBase.HCSURVEYPARAMETER, id, "hcsurveyparameter"),
    editData: (id?: string) => editData<VwHCSurveyParameter>(entityBase.HCSURVEYPARAMETER, id, "hcsurveyparameter"),
    saveData: (data: any) => saveData<VwHCSurveyParameter>(entityBase.HCSURVEYPARAMETER, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCSurveyParameter>(entityBase.HCSURVEYPARAMETER, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCSurveyParameter>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCSurveyParameter> | undefined, incomingAction: KnownAction<VwHCSurveyParameter>) => reduc<VwHCSurveyParameter>(state, incomingAction, entityBase.HCSURVEYPARAMETER)


