import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCUnit } from '../model/viewModel/VwHCUnit';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCUnit/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCUnit>(entityBase.HCUNIT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCUNIT, pageSize),
    newData: (id: string) => newData<VwHCUnit>(entityBase.HCUNIT, id, "hcunit"),
    editData: (id?: string) => editData<VwHCUnit>(entityBase.HCUNIT, id, "hcunit"),
    saveData: (data: any) => saveData<VwHCUnit>(entityBase.HCUNIT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCUnit>(entityBase.HCUNIT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCUnit>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCUnit> | undefined, incomingAction: KnownAction<VwHCUnit>) => reduc<VwHCUnit>(state, incomingAction, entityBase.HCUNIT)


