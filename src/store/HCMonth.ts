import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCMonth } from '../model/viewModel/VwHCMonth';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCMonth/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCMonth>(entityBase.HCMONTH,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCMONTH, pageSize),
    newData: (id: string) => newData<VwHCMonth>(entityBase.HCMONTH, id, "hcmonth"),
    editData: (id?: string) => editData<VwHCMonth>(entityBase.HCMONTH, id, "hcmonth"),
    saveData: (data: any) => saveData<VwHCMonth>(entityBase.HCMONTH, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCMonth>(entityBase.HCMONTH, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCMonth>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCMonth> | undefined, incomingAction: KnownAction<VwHCMonth>) => reduc<VwHCMonth>(state, incomingAction, entityBase.HCMONTH)


