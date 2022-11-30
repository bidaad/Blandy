import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwLoadDeliveryTimeTitle } from '../model/viewModel/VwLoadDeliveryTimeTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/LoadDeliveryTimeTitle/";
export const actionCreators = {
    requestList: (AM: AdminModelRequest) => requestAction<VwLoadDeliveryTimeTitle>(entityBase.LOADDELIVERYTIMETITLE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.LOADDELIVERYTIMETITLE, pageSize),
    editData: (id?: string) => editData<VwLoadDeliveryTimeTitle>(entityBase.LOADDELIVERYTIMETITLE, id, "loaddeliverytimetitle"),
    newData: (id: string) => newData<VwLoadDeliveryTimeTitle>(entityBase.LOADDELIVERYTIMETITLE, id, "loaddeliverytimetitle"),
    saveData: (data: any) => saveData<VwLoadDeliveryTimeTitle>(entityBase.LOADDELIVERYTIMETITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwLoadDeliveryTimeTitle>(entityBase.LOADDELIVERYTIMETITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwLoadDeliveryTimeTitle>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};


export const reducer = (state: stateBase<VwLoadDeliveryTimeTitle> | undefined, incomingAction: KnownAction<VwLoadDeliveryTimeTitle>) => reduc<VwLoadDeliveryTimeTitle>(state, incomingAction, entityBase.LOADDELIVERYTIMETITLE)


