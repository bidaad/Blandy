import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepWorkDate } from '../model/viewModel/VwDepWorkDate';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/DepWorkDate/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepWorkDate>(entityBase.DEPWORKDATE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPWORKDATE, pageSize),
    newData: (id: string) => newData<VwDepWorkDate>(entityBase.DEPWORKDATE, id, "depworkdate"),
    editData: (id?: string) => editData<VwDepWorkDate>(entityBase.DEPWORKDATE, id, "depworkdate"),
    saveData: (data: any) => saveData<VwDepWorkDate>(entityBase.DEPWORKDATE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepWorkDate>(entityBase.DEPWORKDATE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepWorkDate>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwDepWorkDate> | undefined, incomingAction: KnownAction<VwDepWorkDate>) => reduc<VwDepWorkDate>(state, incomingAction, entityBase.DEPWORKDATE)


