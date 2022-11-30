import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCShipVelicleType } from '../model/viewModel/VwHCShipVelicleType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCShipVelicleType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCShipVelicleType>(entityBase.HCSHIPVELICLETYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSHIPVELICLETYPE, pageSize),
    newData: (id: string) => newData<VwHCShipVelicleType>(entityBase.HCSHIPVELICLETYPE, id, "hcshipvelicletype"),
    editData: (id?: string) => editData<VwHCShipVelicleType>(entityBase.HCSHIPVELICLETYPE, id, "hcshipvelicletype"),
    saveData: (data: any) => saveData<VwHCShipVelicleType>(entityBase.HCSHIPVELICLETYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCShipVelicleType>(entityBase.HCSHIPVELICLETYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCShipVelicleType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCShipVelicleType> | undefined, incomingAction: KnownAction<VwHCShipVelicleType>) => reduc<VwHCShipVelicleType>(state, incomingAction, entityBase.HCSHIPVELICLETYPE)


