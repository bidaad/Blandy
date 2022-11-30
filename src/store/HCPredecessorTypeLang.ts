import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPredecessorTypeLang } from '../model/viewModel/VwHCPredecessorTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPredecessorTypeLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPredecessorTypeLang>(entityBase.HCPREDECESSORTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPREDECESSORTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCPredecessorTypeLang>(entityBase.HCPREDECESSORTYPELANG, id, "hcpredecessortypelang"),
    editData: (id?: string) => editData<VwHCPredecessorTypeLang>(entityBase.HCPREDECESSORTYPELANG, id, "hcpredecessortypelang"),
    saveData: (data: any) => saveData<VwHCPredecessorTypeLang>(entityBase.HCPREDECESSORTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPredecessorTypeLang>(entityBase.HCPREDECESSORTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPredecessorTypeLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCPredecessorTypeLang> | undefined, incomingAction: KnownAction<VwHCPredecessorTypeLang>) => reduc<VwHCPredecessorTypeLang>(state, incomingAction, entityBase.HCPREDECESSORTYPELANG)


