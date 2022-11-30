import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCJobCardType } from '../model/viewModel/VwHCJobCardType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCJobCardType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCJobCardType>(entityBase.HCJOBCARDTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCJOBCARDTYPE, pageSize),
    newData: (id: string) => newData<VwHCJobCardType>(entityBase.HCJOBCARDTYPE, id, "hcjobcardtype"),
    editData: (id?: string) => editData<VwHCJobCardType>(entityBase.HCJOBCARDTYPE, id, "hcjobcardtype"),
    saveData: (data: any) => saveData<VwHCJobCardType>(entityBase.HCJOBCARDTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCJobCardType>(entityBase.HCJOBCARDTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCJobCardType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCJobCardType> | undefined, incomingAction: KnownAction<VwHCJobCardType>) => reduc<VwHCJobCardType>(state, incomingAction, entityBase.HCJOBCARDTYPE)


