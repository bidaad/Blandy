import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPlanTitle } from '../model/viewModel/VwHCPlanTitle';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPlanTitle/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPlanTitle>(entityBase.HCPLANTITLE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPLANTITLE, pageSize),
    newData: (id: string) => newData<VwHCPlanTitle>(entityBase.HCPLANTITLE, id, "hcplantitle"),
    editData: (id?: string) => editData<VwHCPlanTitle>(entityBase.HCPLANTITLE, id, "hcplantitle"),
    saveData: (data: any) => saveData<VwHCPlanTitle>(entityBase.HCPLANTITLE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPlanTitle>(entityBase.HCPLANTITLE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPlanTitle>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPlanTitle> | undefined, incomingAction: KnownAction<VwHCPlanTitle>) => reduc<VwHCPlanTitle>(state, incomingAction, entityBase.HCPLANTITLE)


