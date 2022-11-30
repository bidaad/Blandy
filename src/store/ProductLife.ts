import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwProductLife } from '../model/viewModel/VwProductLife';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/ProductLife/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwProductLife>(entityBase.PRODUCTLIFE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PRODUCTLIFE, pageSize),
    newData: (id: string) => newData<VwProductLife>(entityBase.PRODUCTLIFE, id, "productlife"),
    editData: (id?: string) => editData<VwProductLife>(entityBase.PRODUCTLIFE, id, "productlife"),
    saveData: (data: any) => saveData<VwProductLife>(entityBase.PRODUCTLIFE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwProductLife>(entityBase.PRODUCTLIFE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwProductLife>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwProductLife> | undefined, incomingAction: KnownAction<VwProductLife>) => reduc<VwProductLife>(state, incomingAction, entityBase.PRODUCTLIFE)


