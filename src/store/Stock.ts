import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwStock } from '../model/viewModel/VwStock';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/Stock/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwStock>(entityBase.STOCK,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.STOCK, pageSize),
    newData: (id: string) => newData<VwStock>(entityBase.STOCK, id, "stock"),
    editData: (id?: string) => editData<VwStock>(entityBase.STOCK, id, "stock"),
    saveData: (data: any) => saveData<VwStock>(entityBase.STOCK, url, data),
    deleteRecord: (id: string) => deleteRecord<VwStock>(entityBase.STOCK, url, id),
    checkSecurity: (history: any) => checkSecurity<VwStock>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwStock> | undefined, incomingAction: KnownAction<VwStock>) => reduc<VwStock>(state, incomingAction, entityBase.STOCK)


