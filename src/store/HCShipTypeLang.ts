import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCShipTypeLang } from '../model/viewModel/VwHCShipTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCShipTypeLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCShipTypeLang>(entityBase.HCSHIPTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSHIPTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCShipTypeLang>(entityBase.HCSHIPTYPELANG, id, "hcshiptypelang"),
    editData: (id?: string) => editData<VwHCShipTypeLang>(entityBase.HCSHIPTYPELANG, id, "hcshiptypelang"),
    saveData: (data: any) => saveData<VwHCShipTypeLang>(entityBase.HCSHIPTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCShipTypeLang>(entityBase.HCSHIPTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCShipTypeLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCShipTypeLang> | undefined, incomingAction: KnownAction<VwHCShipTypeLang>) => reduc<VwHCShipTypeLang>(state, incomingAction, entityBase.HCSHIPTYPELANG)


