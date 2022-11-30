import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwProductColor } from '../model/viewModel/VwProductColor';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/ProductColor/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwProductColor>(entityBase.PRODUCTCOLOR,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.PRODUCTCOLOR, pageSize),
    newData: (id: string) => newData<VwProductColor>(entityBase.PRODUCTCOLOR, id, "productcolor"),
    editData: (id?: string) => editData<VwProductColor>(entityBase.PRODUCTCOLOR, id, "productcolor"),
    saveData: (data: any) => saveData<VwProductColor>(entityBase.PRODUCTCOLOR, url, data),
    deleteRecord: (id: string) => deleteRecord<VwProductColor>(entityBase.PRODUCTCOLOR, url, id),
    checkSecurity: (history: any) => checkSecurity<VwProductColor>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwProductColor> | undefined, incomingAction: KnownAction<VwProductColor>) => reduc<VwProductColor>(state, incomingAction, entityBase.PRODUCTCOLOR)


