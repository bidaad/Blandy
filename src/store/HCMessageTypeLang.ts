import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCMessageTypeLang } from '../model/viewModel/VwHCMessageTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCMessageTypeLang/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCMessageTypeLang>(entityBase.HCMESSAGETYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCMESSAGETYPELANG, pageSize),
    newData: (id: string) => newData<VwHCMessageTypeLang>(entityBase.HCMESSAGETYPELANG, id, "hcmessagetypelang"),
    editData: (id?: string) => editData<VwHCMessageTypeLang>(entityBase.HCMESSAGETYPELANG, id, "hcmessagetypelang"),
    saveData: (data: any) => saveData<VwHCMessageTypeLang>(entityBase.HCMESSAGETYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCMessageTypeLang>(entityBase.HCMESSAGETYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCMessageTypeLang>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCMessageTypeLang> | undefined, incomingAction: KnownAction<VwHCMessageTypeLang>) => reduc<VwHCMessageTypeLang>(state, incomingAction, entityBase.HCMESSAGETYPELANG)


