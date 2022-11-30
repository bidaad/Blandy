import { MessageTypes, Message, Directions, Language } from "../model/general";
import { responseModel } from "../model/general/responseModel";
import { listModel } from "../model/general/listModel";
import { BasketItem } from "../model/general/basketItems";
import { VwSeacrh } from "../model/viewModel/VwSeacrh";

export type KnownAction<Model> = RequestAction | ReceiveAction | ChangePagesizeAction | DeleteAction | SetMessageAction<Model> | FillListAction |
    ChangeDataAction<Model> | EditAction<Model> | SaveAction<Model> | AddMessage | 
    SetUserInfo | LogoutUser | SetUsername | AddMessage | SetPassword | EmptyMessages | CheckSecurity | AutoCompleteAction | ChangeResource | ChangeMenuResource | LoadPageAction | CHANGEFOLDER | COPYRECORD | EditLoadAction<Model> | ADD_TAB | Change_TAB | DELETE_TAB |REFRESH_TAB | SHOWCONTACT |USERSEARCH | SHOWCARDLIST;

export interface CheckSecurity {
    type: 'CHECK_SECURITY';
    toggle: boolean,
}
export interface Action {
    type: string;
    pageNo: number;
    PageSize: number,
    Filter: string,
}

export interface RequestAction {
    type: string;
    pageNo: number;
    PageSize: number,
    Filter: string,
}

export interface SetLoading {
    type: 'SET_LOADING';
    isLoading: boolean;
}

export interface ReceiveAction {
    type: string;
    ReceiveModel: responseModel;
    PageNo: number,
    PageSize: number,
    Count: number,
    Filter: string,
    parentId?: string,
    resources?: any,
    sortKey: string,
    sort: string
}
export interface FillListAction {
    type: string;
    ReceiveModel: [];
}
export interface ChangePagesizeAction {
    type: string;
    PageSize: number,
}
export interface LoadPageAction {
    type: string;
    Loading: boolean,
}
export interface DeleteAction {
    type: string;
    id: string,
}

export interface SetMessageAction<MT> {
    type: string;
    message: string,
    messageType: MessageTypes;
}

export interface ChangeDataAction<v> {
    type: string;
    messages: v[],
}
export interface EditAction<v> {
    type: string;
    edit: v;
    dir: Directions;
    parentId?: string,
}
export interface EditLoadAction<v> {
    type: string;
    load: boolean;
}
export interface SaveAction<v> {
    type: string;
    edit: v;
    Count: number;
}
export interface SaveChildsAction<v> {
    type: string;
    edit: v;
    Count: number;
}
export interface LoadAction<v> {
    type: string;
    load: boolean;
}
export interface AutoCompleteAction {
    type: 'AUTO_COMPLETE_ACTION';
    list: any;
}
export interface SelectAutoCompleteAction {
    type: 'SELECT_AUTO_COMPLETE_ACTION';
    select: any;
}

export interface SetUserInfo { type: 'Set_User_Info', userID: string, firstName: string, lastName: string, username: string, mobile: number | null, picture: string, userToken: string, menu: any, isRtl: number, menuResources: any, personId: any }
export interface SetUserFullName { type: 'Set_User_FullName', firstName: string, lastName: string }
export interface SetShoppingInfo { type: 'Set_Shopping_Info', paymentType: number, receiverFullName: string, receivercontact: string, bookingId: string, wishDeliveryDate: string, wishDeliveryTimeframe: string, shipmentType: string, contactId: string }
export interface SetUsername { type: 'Set_Username', username: string }
export interface RemoveFromBasket { type: 'Remove_From_Basket', id: string }
export interface SetPassword { type: 'Set_Password', password: string }
export interface AddMessage { type: 'ADD_MESSAGE', message: Message[] }
export interface LogoutUser { type: 'Logout_User' }
export interface SetDirection { type: 'SET_DIRECTION', dir: number, lang: Language }
export interface CHANGE_MENU { type: 'CHANGE_MENU', idE: string, idAct: string }
export interface EmptyMessages { type: 'Empty_Messages' }
export interface EmptyBasket { type: 'Empty_Basket' }
export interface CheckSecurity { type: 'CHECK_SECURITY'; toggle: boolean, }
export interface ChangeResource { type: 'CHANGE_RESOURCE'; resources: any, resourceLang: string, curentResouce: string }
export interface ChangeMenuResource { type: 'CHANGE_MENU_RESOURCE'; resources: any }
export interface UpdateBasket { type: 'Update_Basket'; basket: BasketItem[] }
export interface EmptyBasket { type: 'Empty_Basket'; }
export interface CHANGEFOLDER { type: 'CHANGE_FOLDER', name: string }
export interface SetMenuBar { type: 'Set_MenuBar', show: boolean }
export interface COPYRECORD { type: 'COPY_RECORD', id: string }
export interface ADD_TAB { type: 'ADD_TAB', name: string, component: string }
export interface DELETE_TAB { type: 'DELETE_TAB', component: string }
export interface Change_TAB { type: 'Change_TAB', name: string, component: string,component2: string }
export interface REFRESH_TAB { type: 'REFRESH_TAB', start: boolean}
export interface SHOWCONTACT { type: 'SHOW_CONTACT', show: boolean}
export interface SHOWCARDLIST { type: 'SHOW_CARDLIST', card: boolean}
export interface USERSEARCH { type: 'USER_SEARCH', data: VwSeacrh}
export interface ShowChat { type: 'SHOW_CHAT', show: boolean }
export interface ShowLogin { type: 'SHOW_LOGIN', show: boolean }
export interface UserLoad { type: 'USER_LOAD', load: boolean }
export interface SellerLoad { type: 'SELLER_LOAD', load: boolean }
export interface SetHamburgerMenu { type: 'Set_Hamburger_Menu', val: boolean }

// export interface SetUserInfo { type: 'Set_User_Info', userID: string, firstName: string, lastName: string, username: string, picture: string, userToken: string, menu: any,isRtl:number }
// export interface SetUsername { type: 'Set_Username', username: string }
// export interface SetPassword { type: 'Set_Password', password: string }
// export interface AddMessage { type: 'ADD_MESSAGE', message: Message }
// export interface LogoutUser { type: 'Logout_User' }
// export interface SetDirection { type: 'SET_DIRECTION', dir: number }
// export interface EmptyMessages { type: 'Empty_Messages' }
// export interface CheckSecurity { type: 'CHECK_SECURITY'; toggle: boolean, }

