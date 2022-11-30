import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCJobCardTypeLang } from '../model/viewModel/VwHCJobCardTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCJobCardTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCJobCardTypeLang>(entityBase.HCJOBCARDTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCJOBCARDTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCJobCardTypeLang>(entityBase.HCJOBCARDTYPELANG, id, "hcjobcardtypelang"),
    editData: (id?: string) => editData<VwHCJobCardTypeLang>(entityBase.HCJOBCARDTYPELANG, id, "hcjobcardtypelang"),
    saveData: (data: any) => saveData<VwHCJobCardTypeLang>(entityBase.HCJOBCARDTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCJobCardTypeLang>(entityBase.HCJOBCARDTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCJobCardTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCJobCardTypeLang> | undefined, incomingAction: KnownAction<VwHCJobCardTypeLang>) => reduc<VwHCJobCardTypeLang>(state, incomingAction, entityBase.HCJOBCARDTYPELANG)


