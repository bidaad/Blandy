import { requestAction, setPageSize, editData, saveData, reduc, deleteRecord, checkSecurity, newData } from '../store/storeBase';
import { stateBase } from '../model/general/stateBase';
import { VwAssetPhotographyReq } from '../model/viewModel/VwAssetPhotographyReq';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';

import * as UserActionCreator from '../store/UserInfo';

const url = APIUrl + "/AssetPhotographyReq/";
export const actionCreators = {
       requestList: (AM:AdminModelRequest)=>requestAction<VwAssetPhotographyReq>(entityBase.ASSETPHOTOGRAPHYREQ,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
    setPageSize: (pageSize: number) => setPageSize(entityBase.ASSETPHOTOGRAPHYREQ, pageSize),
    newData: (id: string) => newData<VwAssetPhotographyReq>(entityBase.ASSETPHOTOGRAPHYREQ, id, "assetphotographyreq"),
    editData: (id?: string) => editData<VwAssetPhotographyReq>(entityBase.ASSETPHOTOGRAPHYREQ, id, "assetphotographyreq"),
    saveData: (data: any) => saveData<VwAssetPhotographyReq>(entityBase.ASSETPHOTOGRAPHYREQ, url, data),
    deleteRecord: (id: string) => deleteRecord<VwAssetPhotographyReq>(entityBase.ASSETPHOTOGRAPHYREQ, url, id),
    checkSecurity: (history: any) => checkSecurity<VwAssetPhotographyReq>(history),
    ChangeTab: (name: string, component: string, component2: string) => UserActionCreator.actionCreators.ChangeTab(name, component, component2),
};

export const reducer = (state: stateBase<VwAssetPhotographyReq> | undefined, incomingAction: KnownAction<VwAssetPhotographyReq>) => reduc<VwAssetPhotographyReq>(state, incomingAction, entityBase.ASSETPHOTOGRAPHYREQ)


