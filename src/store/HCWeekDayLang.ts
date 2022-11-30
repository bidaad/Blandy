import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCWeekDayLang } from '../model/viewModel/VwHCWeekDayLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCWeekDayLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCWeekDayLang>(entityBase.HCWEEKDAYLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCWEEKDAYLANG, pageSize),
    newData: (id: string) => newData<VwHCWeekDayLang>(entityBase.HCWEEKDAYLANG, id, "hcweekdaylang"),
    editData: (id?: string) => editData<VwHCWeekDayLang>(entityBase.HCWEEKDAYLANG, id, "hcweekdaylang"),
    saveData: (data: any) => saveData<VwHCWeekDayLang>(entityBase.HCWEEKDAYLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCWeekDayLang>(entityBase.HCWEEKDAYLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCWeekDayLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCWeekDayLang> | undefined, incomingAction: KnownAction<VwHCWeekDayLang>) => reduc<VwHCWeekDayLang>(state, incomingAction, entityBase.HCWEEKDAYLANG)


