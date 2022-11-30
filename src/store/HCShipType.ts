import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCShipType } from '../model/viewModel/VwHCShipType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCShipType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCShipType>(entityBase.HCSHIPTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSHIPTYPE, pageSize),
    newData: (id: string) => newData<VwHCShipType>(entityBase.HCSHIPTYPE, id, "hcshiptype"),
    editData: (id?: string) => editData<VwHCShipType>(entityBase.HCSHIPTYPE, id, "hcshiptype"),
    saveData: (data: any) => saveData<VwHCShipType>(entityBase.HCSHIPTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCShipType>(entityBase.HCSHIPTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCShipType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCShipType> | undefined, incomingAction: KnownAction<VwHCShipType>) => reduc<VwHCShipType>(state, incomingAction, entityBase.HCSHIPTYPE)


