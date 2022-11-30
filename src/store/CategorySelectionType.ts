import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwCategorySelectionType } from '../model/viewModel/VwCategorySelectionType';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/CategorySelectionType/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwCategorySelectionType>(entityBase.CATEGORYSELECTIONTYPE,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey),
    setPageSize: (pageSize: number) => setPageSize(entityBase.CATEGORYSELECTIONTYPE, pageSize),
    newData: (id: string) => newData<VwCategorySelectionType>(entityBase.CATEGORYSELECTIONTYPE, id, "categoryselectiontype"),
    editData: (id?: string) => editData<VwCategorySelectionType>(entityBase.CATEGORYSELECTIONTYPE, id, "categoryselectiontype"),
    saveData: (data: any) => saveData<VwCategorySelectionType>(entityBase.CATEGORYSELECTIONTYPE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwCategorySelectionType>(entityBase.CATEGORYSELECTIONTYPE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwCategorySelectionType>(history),
	ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),
};

export const reducer = (state: stateBase<VwCategorySelectionType> | undefined, incomingAction: KnownAction<VwCategorySelectionType>) => reduc<VwCategorySelectionType>(state, incomingAction, entityBase.CATEGORYSELECTIONTYPE)


