import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwGuarantee } from '../model/viewModel/VwGuarantee';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from './UserInfo';


const url = APIUrl + "/Guarantee/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwGuarantee>(entityBase.GUARANTEEASSET, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.GUARANTEEASSET, pageSize),
    newData: (id: string) => newData<VwGuarantee>(entityBase.GUARANTEEASSET, id, "guaranteeasset"),
    editData: (id?: string) => editData<VwGuarantee>(entityBase.GUARANTEEASSET, id, "guaranteeasset"),
    saveData: (data: any) => saveData<VwGuarantee>(entityBase.GUARANTEEASSET, url, data),
    deleteRecord: (id: string) => deleteRecord<VwGuarantee>(entityBase.GUARANTEEASSET, url, id),
    checkSecurity: (history: any) => checkSecurity<VwGuarantee>(history),
    ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwGuarantee> | undefined, incomingAction: KnownAction<VwGuarantee>) => reduc<VwGuarantee>(state, incomingAction, entityBase.GUARANTEEASSET)


