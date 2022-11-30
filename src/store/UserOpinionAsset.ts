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
    requestList: (AM:AdminModelRequest) => requestAction<VwUserOpinion>(entityBase.USEROPINIONASSET, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.USEROPINIONASSET, pageSize),
    newData: (id: string) => newData<VwUserOpinion>(entityBase.USEROPINIONASSET, id, "useropinionasset"),
    editData: (id?: string) => editData<VwUserOpinion>(entityBase.USEROPINIONASSET, id, "useropinionasset"),
    saveData: (data: any) => saveData<VwUserOpinion>(entityBase.USEROPINIONASSET, url, data,'',"SaveAdmin"),
    deleteRecord: (id: string) => deleteRecord<VwUserOpinion>(entityBase.USEROPINIONASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwUserOpinion>(history),
    ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwUserOpinion> | undefined, incomingAction: KnownAction<VwUserOpinion>) => reduc<VwUserOpinion>(state, incomingAction, entityBase.USEROPINIONASSET)


