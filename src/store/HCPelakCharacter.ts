import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwHCPelakCharacter } from '../model/viewModel/VwHCPelakCharacter';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/HCPelakCharacter/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwHCPelakCharacter>(entityBase.HCPELAKCHARACTER,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.HCPELAKCHARACTER, pageSize),
    newData: (id: string) => newData<VwHCPelakCharacter>(entityBase.HCPELAKCHARACTER, id, "hcpelakcharacter"),
    editData: (id?: string) => editData<VwHCPelakCharacter>(entityBase.HCPELAKCHARACTER, id, "hcpelakcharacter"),
    saveData: (data: any) => saveData<VwHCPelakCharacter>(entityBase.HCPELAKCHARACTER, url, data),
    deleteRecord: (id: string) => deleteRecord<VwHCPelakCharacter>(entityBase.HCPELAKCHARACTER, url, id),
    checkSecurity: (history: any) => checkSecurity<VwHCPelakCharacter>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwHCPelakCharacter> | undefined, incomingAction: KnownAction<VwHCPelakCharacter>) => reduc<VwHCPelakCharacter>(state, incomingAction, entityBase.HCPELAKCHARACTER)


