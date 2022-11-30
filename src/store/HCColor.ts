import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCColor } from '../model/viewModel/VwHCColor';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCColor/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCColor>(entityBase.HCCOLOR,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCCOLOR, pageSize),
    newData: (id: string) => newData<VwHCColor>(entityBase.HCCOLOR, id, "hccolor"),
    editData: (id?: string) => editData<VwHCColor>(entityBase.HCCOLOR, id, "hccolor"),
    saveData: (data: any) => saveData<VwHCColor>(entityBase.HCCOLOR, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCColor>(entityBase.HCCOLOR, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCColor>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCColor> | undefined, incomingAction: KnownAction<VwHCColor>) => reduc<VwHCColor>(state, incomingAction, entityBase.HCCOLOR)


