import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwShipRule } from '../model/viewModel/VwShipRule';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from './UserInfo';
const url = APIUrl + "/ShipRule/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest) => requestAction<VwShipRule>(entityBase.SHIPRULEDEP, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.SHIPRULEDEP, pageSize),
    newData: (id: string) => newData<VwShipRule>(entityBase.SHIPRULEDEP, id, "shipruledep"),
    editData: (id?: string) => editData<VwShipRule>(entityBase.SHIPRULEDEP, id, "shipruledep"),
    saveData: (data: any) => saveData<VwShipRule>(entityBase.SHIPRULEDEP, url, data),
    deleteRecord: (id: string) => deleteRecord<VwShipRule>(entityBase.SHIPRULEDEP, url, id),
    checkSecurity: (history: any) => checkSecurity<VwShipRule>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwShipRule> | undefined, incomingAction: KnownAction<VwShipRule>) => reduc<VwShipRule>(state, incomingAction, entityBase.SHIPRULEDEP)


