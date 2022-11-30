import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwFAQ } from '../model/viewModel/VwFAQ';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import * as UserActionCreator from '../store/UserInfo';


const url = APIUrl + "/FAQ/";
export const actionCreators = {
        requestList: (AM:AdminModelRequest)=>requestAction<VwFAQ>(entityBase.FAQ,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.FAQ, pageSize),
    newData: (id: string) => newData<VwFAQ>(entityBase.FAQ, id, "faq"),
    editData: (id?: string) => editData<VwFAQ>(entityBase.FAQ, id, "faq"),
    saveData: (data: any) => saveData<VwFAQ>(entityBase.FAQ, url, data),
    deleteRecord: (id: string) => deleteRecord<VwFAQ>(entityBase.FAQ, url, id),
    checkSecurity: (history: any) => checkSecurity<VwFAQ>(history),
ChangeTab: (name: string, component: string, component2: string)=>UserActionCreator.actionCreators.ChangeTab(name,component,component2),


};

export const reducer = (state: stateBase<VwFAQ> | undefined, incomingAction: KnownAction<VwFAQ>) => reduc<VwFAQ>(state, incomingAction, entityBase.FAQ)
