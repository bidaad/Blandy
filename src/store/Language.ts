import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwLanguage } from '../model/viewModel/VwLanguage';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.
import * as UserActionCreator from '../store/UserInfo';
const url = APIUrl + "/Language/";
export const actionCreators = {

    requestList: (AM:AdminModelRequest) => requestAction<VwLanguage>(entityBase.LANGUAGE, url, AM.pageNo, AM.pageSize, AM.filter, AM.parentId, AM.resourceName, AM.isSelected, AM.sort, AM.sortKey, AM.filtersl, AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.LANGUAGE, pageSize),
    editData: (id?: string) => editData<VwLanguage>(entityBase.LANGUAGE, id, "languages"),
    //    newData:()=> newData<VwLanguage>("Languages"),
    saveData: (data: any) => saveData<VwLanguage>(entityBase.LANGUAGE, url, data),
    deleteRecord: (id: string) => deleteRecord<VwLanguage>(entityBase.LANGUAGE, url, id),
    checkSecurity: (history: any) => checkSecurity<VwLanguage>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};



export const reducer = (state: stateBase<VwLanguage> | undefined, incomingAction: KnownAction<VwLanguage>) => reduc<VwLanguage>(state, incomingAction, entityBase.LANGUAGE)


