import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwShipRule } from '../model/viewModel/VwShipRule';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/ShipRule/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwShipRule>(entityBase.SHIPRULE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.SHIPRULE, pageSize),
    newData: (id: string) => newData<VwShipRule>(entityBase.SHIPRULE, id, "shiprule"),
    editData: (id?: string) => editData<VwShipRule>(entityBase.SHIPRULE, id, "shiprule"),
    saveData: (data: any) => saveData<VwShipRule>(entityBase.SHIPRULE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwShipRule>(entityBase.SHIPRULE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwShipRule>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwShipRule> | undefined, incomingAction: KnownAction<VwShipRule>) => reduc<VwShipRule>(state, incomingAction, entityBase.SHIPRULE)


