import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwMachineRelated } from '../model/viewModel/VwMachineRelated';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/MachineRelated/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwMachineRelated>(entityBase.MACHINERELATED,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.MACHINERELATED, pageSize),
    newData: (id: string) => newData<VwMachineRelated>(entityBase.MACHINERELATED, id, "machinerelated"),
    editData: (id?: string) => editData<VwMachineRelated>(entityBase.MACHINERELATED, id, "machinerelated"),
    saveData: (data: any) => saveData<VwMachineRelated>(entityBase.MACHINERELATED, url, data),
    deleteRecord: (id: string) => deleteRecord<VwMachineRelated>(entityBase.MACHINERELATED, url, id),
    checkSecurity: (history: any) => checkSecurity<VwMachineRelated>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwMachineRelated> | undefined, incomingAction: KnownAction<VwMachineRelated>) => reduc<VwMachineRelated>(state, incomingAction, entityBase.MACHINERELATED)


