import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCBookingStatusLang } from '../model/viewModel/VwHCBookingStatusLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCBookingStatusLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCBookingStatusLang>(entityBase.HCBOOKINGSTATUSLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCBOOKINGSTATUSLANG, pageSize),
    newData: (id: string) => newData<VwHCBookingStatusLang>(entityBase.HCBOOKINGSTATUSLANG, id, "hcbookingstatuslang"),
    editData: (id?: string) => editData<VwHCBookingStatusLang>(entityBase.HCBOOKINGSTATUSLANG, id, "hcbookingstatuslang"),
    saveData: (data: any) => saveData<VwHCBookingStatusLang>(entityBase.HCBOOKINGSTATUSLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCBookingStatusLang>(entityBase.HCBOOKINGSTATUSLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCBookingStatusLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCBookingStatusLang> | undefined, incomingAction: KnownAction<VwHCBookingStatusLang>) => reduc<VwHCBookingStatusLang>(state, incomingAction, entityBase.HCBOOKINGSTATUSLANG)


