import { requestAction ,reduc} from './storeBase';
import { stateBase } from '../model/general/stateBase';
import { KnownAction } from './actionType';
import { entityBase } from '../model/general/entityBase';
import { APIUrl } from '../helper/config';
import { AdminModelRequest } from '../model/viewModel/AdminModelRequest';
import { VwResource } from '../model/viewModel/VwResource';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
const url=APIUrl + "/Resource/";
export const actionCreators = {
    requestList: (AM:AdminModelRequest)=>requestAction<VwResource>(entityBase.RESOURCESL,url,AM.pageNo,AM.pageSize,AM.filter,AM.parentId,AM.resourceName,AM.isSelected,AM.sort,AM.sortKey,AM.filtersl,AM.noselectId),
};



export const reducer=(state: stateBase<VwResource> | undefined, incomingAction: KnownAction<VwResource>)=>reduc<VwResource>(state,incomingAction, entityBase.RESOURCESL)


