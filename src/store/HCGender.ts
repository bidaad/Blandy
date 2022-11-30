import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCGender } from '../model/viewModel/VwHCGender';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCGender/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCGender>(entityBase.HCGENDER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCGENDER, pageSize),
    newData: (id: string) => newData<VwHCGender>(entityBase.HCGENDER, id, "hcgender"),
    editData: (id?: string) => editData<VwHCGender>(entityBase.HCGENDER, id, "hcgender"),
    saveData: (data: any) => saveData<VwHCGender>(entityBase.HCGENDER, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCGender>(entityBase.HCGENDER, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCGender>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCGender> | undefined, incomingAction: KnownAction<VwHCGender>) => reduc<VwHCGender>(state, incomingAction, entityBase.HCGENDER)


