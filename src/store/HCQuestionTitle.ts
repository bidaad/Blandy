import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCQuestionTitle } from '../model/viewModel/VwHCQuestionTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCQuestionTitle/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCQuestionTitle>(entityBase.HCQUESTIONTITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCQUESTIONTITLE, pageSize),
    newData: (id: string) => newData<VwHCQuestionTitle>(entityBase.HCQUESTIONTITLE, id, "hcquestiontitle"),
    editData: (id?: string) => editData<VwHCQuestionTitle>(entityBase.HCQUESTIONTITLE, id, "hcquestiontitle"),
    saveData: (data: any) => saveData<VwHCQuestionTitle>(entityBase.HCQUESTIONTITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCQuestionTitle>(entityBase.HCQUESTIONTITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCQuestionTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCQuestionTitle> | undefined, incomingAction: KnownAction<VwHCQuestionTitle>) => reduc<VwHCQuestionTitle>(state, incomingAction, entityBase.HCQUESTIONTITLE)


