import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwUserOpinion } from '../model/viewModel/VwUserOpinion';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from './UserInfo';

const url = APIUrl + "/UserOpinion/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwUserOpinion>(entityBase.USEROPINIONSL, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.USEROPINIONSL, pageSize),
    newData: (id: string) => newData<VwUserOpinion>(entityBase.USEROPINIONSL, id, "useropinionsl"),
    editData: (id?: string) => editData<VwUserOpinion>(entityBase.USEROPINIONSL, id, "useropinionsl"),
    saveData: (data: any) => saveData<VwUserOpinion>(entityBase.USEROPINIONSL, url, data,'',"SaveAdmin"),
    deleteRecord: (id: string) => deleteRecord<VwUserOpinion>(entityBase.USEROPINIONSL, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserOpinion>(history),
    ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwUserOpinion> | undefined, incomingAction: KnownAction<VwUserOpinion>) => reduc<VwUserOpinion>(state, incomingAction, entityBase.USEROPINIONSL)


