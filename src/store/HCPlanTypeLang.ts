import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPlanTypeLang } from '../model/viewModel/VwHCPlanTypeLang';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPlanTypeLang/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCPlanTypeLang>(entityBase.HCPLANTYPELANG,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPLANTYPELANG, pageSize),
    newData: (id: string) => newData<VwHCPlanTypeLang>(entityBase.HCPLANTYPELANG, id, "hcplantypelang"),
    editData: (id?: string) => editData<VwHCPlanTypeLang>(entityBase.HCPLANTYPELANG, id, "hcplantypelang"),
    saveData: (data: any) => saveData<VwHCPlanTypeLang>(entityBase.HCPLANTYPELANG, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPlanTypeLang>(entityBase.HCPLANTYPELANG, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPlanTypeLang>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwHCPlanTypeLang> | undefined, incomingAction: KnownAction<VwHCPlanTypeLang>) => reduc<VwHCPlanTypeLang>(state, incomingAction, entityBase.HCPLANTYPELANG)


