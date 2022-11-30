import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCSelectionType } from '../model/viewModel/VwHCSelectionType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCSelectionType/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwHCSelectionType>(entityBase.HCSELECTIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCSELECTIONTYPE, pageSize),
    newData: (id: string) => newData<VwHCSelectionType>(entityBase.HCSELECTIONTYPE, id, "hcselectiontype"),
    editData: (id?: string) => editData<VwHCSelectionType>(entityBase.HCSELECTIONTYPE, id, "hcselectiontype"),
    saveData: (data: any) => saveData<VwHCSelectionType>(entityBase.HCSELECTIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCSelectionType>(entityBase.HCSELECTIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCSelectionType>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCSelectionType> | undefined, incomingAction: KnownAction<VwHCSelectionType>) => reduc<VwHCSelectionType>(state, incomingAction, entityBase.HCSELECTIONTYPE)


