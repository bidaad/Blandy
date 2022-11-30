import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCDepType } from '../model/viewModel/VwHCDepType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCDepType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCDepType>(entityBase.HCDEPTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCDEPTYPE, pageSize),
    newData: (id: string) => newData<VwHCDepType>(entityBase.HCDEPTYPE, id, "hcdeptype"),
    editData: (id?: string) => editData<VwHCDepType>(entityBase.HCDEPTYPE, id, "hcdeptype"),
    saveData: (data: any) => saveData<VwHCDepType>(entityBase.HCDEPTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCDepType>(entityBase.HCDEPTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCDepType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCDepType> | undefined, incomingAction: KnownAction<VwHCDepType>) => reduc<VwHCDepType>(state, incomingAction, entityBase.HCDEPTYPE)


