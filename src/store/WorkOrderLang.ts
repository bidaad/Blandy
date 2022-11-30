import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwWorkOrderLang } from '../model/viewModel/VwWorkOrderLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

const url = APIUrl + "/WorkOrderLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwWorkOrderLang>(entityBase.WORKORDERLANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey),
    setPageSize: (pageSize: number) => setPageSize(entityBase.WORKORDERLANG, pageSize),
    newData: (id: string) => newData<VwWorkOrderLang>(entityBase.WORKORDERLANG, id, "workorderlang"),
    editData: (id?: string) => editData<VwWorkOrderLang>(entityBase.WORKORDERLANG, id, "workorderlang"),
    saveData: (data: any) => saveData<VwWorkOrderLang>(entityBase.WORKORDERLANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwWorkOrderLang>(entityBase.WORKORDERLANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwWorkOrderLang>(history),
};

export const reducer = (state: stateBase<VwWorkOrderLang> | undefined, incomingAction: KnownAction<VwWorkOrderLang>) => reduc<VwWorkOrderLang>(state, incomingAction, entityBase.WORKORDERLANG)


