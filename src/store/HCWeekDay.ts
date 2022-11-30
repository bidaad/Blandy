import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWeekDay } from '../model/viewModel/VwHCWeekDay';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/HCWeekDay/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCWeekDay>(entityBase.HCWEEKDAY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWEEKDAY, pageSize),
    newData: (id: string) => newData<VwHCWeekDay>(entityBase.HCWEEKDAY, id, "hcweekday"),
    editData: (id?: string) => editData<VwHCWeekDay>(entityBase.HCWEEKDAY, id, "hcweekday"),
    saveData: (data: any) => saveData<VwHCWeekDay>(entityBase.HCWEEKDAY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWeekDay>(entityBase.HCWEEKDAY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWeekDay>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCWeekDay> | undefined, incomingAction: KnownAction<VwHCWeekDay>) => reduc<VwHCWeekDay>(state, incomingAction, entityBase.HCWEEKDAY)


