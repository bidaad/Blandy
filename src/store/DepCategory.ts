import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwDepCategory } from '../model/viewModel/VwDepCategory';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';


const url = APIUrl + "/DepCategory/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwDepCategory>(entityBase.DEPCATEGORY,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.DEPCATEGORY, pageSize),
    newData: (id: string) => newData<VwDepCategory>(entityBase.DEPCATEGORY, id, "depcategory"),
    editData: (id?: string) => editData<VwDepCategory>(entityBase.DEPCATEGORY, id, "depcategory"),
    saveData: (data: any) => saveData<VwDepCategory>(entityBase.DEPCATEGORY, url, data),
    deleteRecord: (id: string) => deleteRecord<VwDepCategory>(entityBase.DEPCATEGORY, url, id),
    checkSecurity: (history: any) => checkSecurity<VwDepCategory>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwDepCategory> | undefined, incomingAction: KnownAction<VwDepCategory>) => reduc<VwDepCategory>(state, incomingAction, entityBase.DEPCATEGORY)


