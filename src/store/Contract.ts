import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwContract } from '../model/viewModel/VwContract';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/Contract/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwContract>(entityBase.CONTRACT,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CONTRACT, pageSize),
    newData: (id: string) => newData<VwContract>(entityBase.CONTRACT, id, "contract"),
    editData: (id?: string) => editData<VwContract>(entityBase.CONTRACT, id, "contract"),
    saveData: (data: any) => saveData<VwContract>(entityBase.CONTRACT, url, data),
    deleteRecord: (id: string) => deleteRecord<VwContract>(entityBase.CONTRACT, url, id),
    checkSecurity: (history: any) => checkSecurity<VwContract>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwContract> | undefined, incomingAction: KnownAction<VwContract>) => reduc<VwContract>(state, incomingAction, entityBase.CONTRACT)


