import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssignmentDetail } from '../model/viewModel/VwAssignmentDetail';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssignmentDetail/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssignmentDetail>(entityBase.ASSIGNMENTDETAIL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSIGNMENTDETAIL, pageSize),
    newData: (id: string) => newData<VwAssignmentDetail>(entityBase.ASSIGNMENTDETAIL, id, "assignmentdetail"),
    editData: (id?: string) => editData<VwAssignmentDetail>(entityBase.ASSIGNMENTDETAIL, id, "assignmentdetail"),
    saveData: (data: any) => saveData<VwAssignmentDetail>(entityBase.ASSIGNMENTDETAIL, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssignmentDetail>(entityBase.ASSIGNMENTDETAIL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssignmentDetail>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwAssignmentDetail> | undefined, incomingAction: KnownAction<VwAssignmentDetail>) => reduc<VwAssignmentDetail>(state, incomingAction, entityBase.ASSIGNMENTDETAIL)


