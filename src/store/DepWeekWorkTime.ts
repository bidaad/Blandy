import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepWeekWorkTime } from '../model/viewModel/VwDepWeekWorkTime';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/DepWeekWorkTime/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepWeekWorkTime>(entityBase.DEPWEEKWORKTIME,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPWEEKWORKTIME, pageSize),
    newData: (id: string) => newData<VwDepWeekWorkTime>(entityBase.DEPWEEKWORKTIME, id, "depweekworktime"),
    editData: (id?: string) => editData<VwDepWeekWorkTime>(entityBase.DEPWEEKWORKTIME, id, "depweekworktime"),
    saveData: (data: any) => saveData<VwDepWeekWorkTime>(entityBase.DEPWEEKWORKTIME, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepWeekWorkTime>(entityBase.DEPWEEKWORKTIME, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepWeekWorkTime>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


    
};

export const reducer = (state: stateBase<VwDepWeekWorkTime> | undefined, incomingAction: KnownAction<VwDepWeekWorkTime>) => reduc<VwDepWeekWorkTime>(state, incomingAction, entityBase.DEPWEEKWORKTIME)


