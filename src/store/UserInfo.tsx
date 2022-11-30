import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import { Language, Message, langs, MessageTypes } from "../model/general";
import {
  ChangeMenuResource,
  SetUserInfo,
  LogoutUser,
  SetUsername,
  AddMessage,
  EmptyMessages,
  SetPassword,
  SetDirection,
  AutoCompleteAction,
  SelectAutoCompleteAction,
  ChangeResource,
  RemoveFromBasket,
  UpdateBasket,
  EmptyBasket,
  CHANGE_MENU,
  CHANGEFOLDER,
  SetMenuBar,
  SetShoppingInfo,
  ADD_TAB,
  Change_TAB,
  DELETE_TAB,
  REFRESH_TAB,
  SHOWCONTACT,
  USERSEARCH,
  SetUserFullName,
  ShowChat,
  ShowLogin,
  UserLoad,
  SHOWCARDLIST,
  SellerLoad,
  SetHamburgerMenu,
} from "./actionType";
import { responseModel } from "../model/general/responseModel";
import { listModel } from "../model/general/listModel";
import { APIUrl } from "../helper/config";
import { BasketItem } from "../model/general/basketItems";
import { ShoppingInfo } from "../model/general/ShppoingInfo";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
import history from "../history";
import { VwSeacrh } from "../model/viewModel/VwSeacrh";

export interface TabList {
  name: string;
  component: string;
}
export interface TabModel {
  Tab: TabList[];
  Active: string;
}
export interface UserInfoState {
  firstName: string;
  lastName: string;
  username: string | null;
  password: string | null;
  mobile: number | null;
  token: string | null;
  picture: string | null;
  messages: Message[];
  isLoading: boolean;
  apiUrl: string | undefined;
  lang: Language;
  menu: any;
  update: boolean;
  dir: number;
  list: any;
  select: any;
  resources: any;
  resourceLang?: string;
  curentResource: string;
  menuResources?: any;
  basket: BasketItem[];
  personId?: string;
  userId?: string;
  folder?: string;
  showContactUs?: boolean;
  showAdminMenu: boolean;
  shoppingInfo: ShoppingInfo;
  tabModels: TabModel;
  RefreshTab: boolean;
  UserSearch?: VwSeacrh;
  showChatBox?: boolean;
  showLoginBox?: boolean;
  UserLoading?: boolean;
  SellerLoading?: boolean;
  showCard?: boolean;
  showHumburgerMenu: boolean;
  //systemMessages: Message[]
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export type KnownAction =
  | SetUserInfo
  | LogoutUser
  | SetUsername
  | AddMessage
  | SetPassword
  | EmptyMessages
  | SetDirection
  | AutoCompleteAction
  | SelectAutoCompleteAction
  | ChangeResource
  | ChangeMenuResource
  | RemoveFromBasket
  | UpdateBasket
  | EmptyBasket
  | CHANGE_MENU
  | CHANGEFOLDER
  | SetMenuBar
  | SetShoppingInfo
  | EmptyBasket
  | ADD_TAB
  | Change_TAB
  | DELETE_TAB
  | REFRESH_TAB
  | SHOWCONTACT
  | USERSEARCH
  | SetUserFullName
  | ShowChat
  | ShowLogin
  | UserLoad
  | SellerLoad
  | SHOWCARDLIST
  | SetHamburgerMenu;

export const actionCreators = {
  setUserInfo: (
    userID: string,
    firstName: string,
    lastName: string,
    username: string,
    mobile: number,
    picture: string,
    userToken: string,
    menu: any,
    isRtl: number,
    menuResources: any,
    personId: any
  ) =>
    ({
      type: "Set_User_Info",
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      username: username,
      mobile: mobile,
      picture: picture,
      userToken: userToken,
      menu,
      isRtl,
      menuResources,
      personId: personId,
    } as SetUserInfo),
  setShoppingInfo: (
    paymentType: number,
    receiverFullName: string,
    receivercontact: string,
    bookingId: string,
    wishDeliveryDate: string,
    wishDeliveryTimeframe: string,
    shipmentType: string,
    contactId: string
  ) =>
    ({
      type: "Set_Shopping_Info",
      paymentType,
      receiverFullName,
      receivercontact,
      bookingId,
      wishDeliveryDate,
      wishDeliveryTimeframe,
      shipmentType,
      contactId,
    } as SetShoppingInfo),
  setAdminMenuBar: (show: boolean) =>
    ({ type: "Set_MenuBar", show: show } as SetMenuBar),
  setUsername: (username: string) =>
    ({ type: "Set_Username", username: username } as SetUsername),
  setPassword: (password: string) =>
    ({ type: "Set_Password", password: password } as SetPassword),
  //logoutUser: () => ({ type: 'Logout_User' } as LogoutUser),
  logoutUser: (redirectPage: string): AppThunkAction<KnownAction> => (dispatch) => {
    //alert('logout dispatch')
    //let history = useHistory();
    dispatch({ type: "Logout_User" });
    // localStorage.removeItem("USER_INFO");
    history.push(redirectPage);
    //const middleware = routerMiddleware(browserHistory)
    // Dispatch from anywhere like normal.
    //store.dispatch(push('/foo'))
  },
  checkStatus: (response: Response): AppThunkAction<KnownAction> => (
    dispatch
  ) => {
     
    if (response.status === 401) {
      dispatch({ type: "Logout_User" });
      localStorage.removeItem("USER_INFO");

      dispatch({ type: "SHOW_LOGIN", show: true });
      // history.push('/userlogin');
      //     return response;
    } else return response;
  },
  showLogin: (): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "SHOW_LOGIN", show: true });
  },
  hideLogin: (): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "SHOW_LOGIN", show: false });
  },
  emptyMessages: () => ({ type: "Empty_Messages" } as EmptyMessages),
  emptyBasket: () => ({ type: "Empty_Basket" } as EmptyBasket),
  addMessage: (message: Message[]): AppThunkAction<KnownAction> => (
    dispatch  ) => {
    dispatch({ type: "ADD_MESSAGE", message: message });
    setTimeout(() => {
      dispatch({ type: "Empty_Messages" });
    }, 3000);
  },
  SetDirection: (dir: number, lang: Language): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState.userinfo.lang.abr.toUpperCase() !== lang.abr.toLowerCase()) {
      var rsmnu = appState.userinfo.resources.filter(
        (c: any) =>
          c.resourceTypeCode === "MNU" && c.lang === lang.abr.toUpperCase()
      );
      if (rsmnu.length === 0) {
        fetch(
          appState.userinfo.apiUrl +
            "/User/ChangeResource?resourceName=&lang=" +
            lang.abr,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + appState.userinfo.token,
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
          .then((response) => {
            if (response.status === 200) {
              return response.json() as Promise<responseModel>;
            } else {
              throw response;
            }
          })
          .then((mr) => {
            if (mr.messageCode === 0) {
              dispatch({
                type: "CHANGE_RESOURCE",
                resources: mr.resources,
                resourceLang: lang.abr,
                curentResouce: appState.userinfo.curentResource
                  ? appState.userinfo.curentResource
                  : "",
              });

              // if (mr.menuResources) {
              //     dispatch({ type: 'CHANGE_MENU_RESOURCE', resources: mr.resources });
              // }
            }
          })
          .catch((error) => {
            if (error.status === 401) {
              history.push("/adminlogin");
            }
          });
      }
      dispatch({ type: "SET_DIRECTION", dir: dir, lang: lang });
    }
  },
  AddTab: (name: string, component: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
     
    //if(appState.userinfo.tabModels.Tab.filter( c=> c.component === component).length === 0)
      dispatch({ type: "ADD_TAB", name: name, component: component });
    // setTimeout(() => {
    //     dispatch({ type: 'REFRESH_TAB', start: false });
    // }, 1000)
  },
  DeleteTab: (component: string): AppThunkAction<KnownAction> => (
    dispatch  ) => {
    dispatch({ type: "DELETE_TAB", component: component });
  },
  ChangeTab: (
    name: string,
    component: string,
    component2: string
  ): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({
      type: "Change_TAB",
      name: name,
      component: component,
      component2: component2,
    });
    // setTimeout(() => {
    //     dispatch({ type: 'REFRESH_TAB', start: false });
    // }, 2000)
  },
  ChangeMenu: (
    idExpand: string,
    idActive: string
  ): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "CHANGE_MENU", idE: idExpand, idAct: idActive });
  },
  UserLoad: (load: boolean): AppThunkAction<KnownAction> => (
    dispatch  ) => {
    dispatch({ type: "USER_LOAD", load: load });
  },
  SellerLoad: (load: boolean): AppThunkAction<KnownAction> => (
    dispatch  ) => {
    dispatch({ type: "SELLER_LOAD", load: load });
  },
  ChangeFolder: (name: string): AppThunkAction<KnownAction> => (
    dispatch  ) => {
    dispatch({ type: "CHANGE_FOLDER", name: name });
  },
  AutoCompleteAction: (
    controler: string,
    action: string
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.userinfo) {
      if (controler && action) {
        fetch(appState.userinfo.apiUrl + controler + "/" + action + "?lang=", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + appState.userinfo.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json() as responseModel | any;
            } else {
              throw response;
            }
          })
          .then((mr) => {
            if ((mr as responseModel).messageCode === 0) {
              var data = (mr as responseModel).data as listModel[];
              dispatch({ type: "AUTO_COMPLETE_ACTION", list: data });
            }
          })
          .catch((error) => {
            if (error.status === 401) {
              history.push("/adminlogin");
            }
          });
      }
    }
  },
  SelectAutoCompleteAction: (select: any) =>
    ({
      type: "SELECT_AUTO_COMPLETE_ACTION",
      select: select,
    } as SelectAutoCompleteAction),
  removeFromBasket: (productId: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const newBasket = appState.userinfo.basket.filter(
      (el) => el.id !== productId
    );
    dispatch({ type: "Update_Basket", basket: newBasket });
  },

  ToggleHumburgerMenu: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    const curHumburger = appState.userinfo.showHumburgerMenu;

    dispatch({ type: "Set_Hamburger_Menu", val: !curHumburger });
  },

  addToBasket: (
    assetId: string,
    picture: string,
    price: number,
    count: number,
    title: string
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState.userinfo.basket.filter((m) => m.id === assetId).length !== 0) {
      let EdBasket = appState.userinfo.basket.find((c) => c.id === assetId);
      let newBasket = appState.userinfo.basket
        .slice()
        .filter((c) => c.id !== assetId);

      if (EdBasket !== undefined) {
        EdBasket.count = EdBasket.count + 1;
        newBasket.push(EdBasket);
        dispatch({ type: "Update_Basket", basket: newBasket });
        dispatch({
          type: "ADD_MESSAGE",
          message: [
            {
              msg: title + "به سبد خرید اضافه شد ",
              msgType: MessageTypes.Success,
            },
          ],
        });
        setTimeout(() => {
          dispatch({ type: "Empty_Messages" });
        }, 3000);
      }
      return;
    }
    const newBasket = appState.userinfo.basket.slice();
    newBasket.push({
      id: assetId,
      price: price,
      count: count,
      picture: picture,
      title: title,
    } as BasketItem);
    dispatch({ type: "Update_Basket", basket: newBasket });
    dispatch({
      type: "ADD_MESSAGE",
      message: [
        { msg: title + "به سبد خرید اضافه شد", msgType: MessageTypes.Warning },
      ],
    });
    setTimeout(() => {
      dispatch({ type: "Empty_Messages" });
    }, 3000);
  },

  updateBasket: (
    productId: string,
    newCount: number
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    var curBasket = appState.userinfo.basket.slice();
    curBasket.some((obj) => {
      if (obj.id === productId) {
        obj.count = newCount;
        return true; //breaks out of he loop
      }
    });
    dispatch({ type: "Update_Basket", basket: curBasket });
  },
  showContact: (show: boolean): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.userinfo) {
      dispatch({ type: "SHOW_CONTACT", show: show });
    }
  },
  showCardList: (show: boolean): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.userinfo) {
      dispatch({ type: "SHOW_CARDLIST",card:show});
    }
  },
  showChat: (show: boolean): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.userinfo) {
      dispatch({ type: "SHOW_CHAT", show: show });
    }
  },
  Search: (searchdata: VwSeacrh): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.userinfo) {
       
      dispatch({ type: "USER_SEARCH", data: searchdata });
    }
  },
  SetUserFullName: (
    firstName: string,
    lastName: string
  ): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "Set_User_FullName", firstName, lastName });
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<UserInfoState> = (
  state: UserInfoState | undefined,
  incomingAction: Action
): UserInfoState => {
  if (state === undefined) {
    return {
      shoppingInfo: {
        paymentType: 0,
        receiverFullName: "",
        receivercontact: "",
        bookingId: "",
        wishDeliveryDate: "",
        wishDeliveryTimeframe: "",
        shipmentType: "",
        contactId: "",
      },
      showAdminMenu: true,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      mobile: null,
      token: null,
      picture: "",
      isLoading: false,
      apiUrl: APIUrl,
      lang: langs[0],
      menu: [],
      messages: [],
      update: false,
      dir: 1,
      list: [],
      select: null,
      basket: [],
      resources: [],
      curentResource: "",
      // basket: [{
      tabModels: { Active: "", Tab: [] },
      RefreshTab: false,
      showChatBox: false,
      showLoginBox: false,
      showHumburgerMenu: false,
      //     id: '1',
      //     title: 'شمع موتور بوش بسته 4 عددی',
      //     price: 79000,
      //     count: 5,
      //     picture: 'product1.png',
      // },
      // {
      //     id: '2',
      //     title: 'وانت دو کابین وینگل ۵',
      //     price: 45000,
      //     count: 10,
      //     picture: 'product1.png',
      // }]
      //systemMessages: [],
    };
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "Set_User_Info":
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        username: action.username,
        picture: action.picture,
        token: action.userToken,
        isLoading: false,
        apiUrl: APIUrl,
        menu: action.menu,
        messages: [],
        dir: action.isRtl,
        resources: [...action.menuResources],
        mobile: action.mobile,
        personId: action.personId,
        userId: action.userID,
        tabModels: { Active: "", Tab: [] },
        showLoginBox : false,
        showHumburgerMenu: false,
      };
    case "Set_Shopping_Info":
      return {
        ...state,
        shoppingInfo: {
          paymentType: action.paymentType,
          receiverFullName: action.receiverFullName,
          receivercontact: action.receivercontact,
          bookingId: action.bookingId,
          wishDeliveryDate: action.wishDeliveryDate,
          wishDeliveryTimeframe: action.wishDeliveryTimeframe,
          shipmentType: action.shipmentType,
          contactId: action.contactId,
        },
      };
    case "Set_Username":
      return { ...state, username: action.username };
    case "Set_MenuBar":
      return { ...state, showAdminMenu: action.show };
    case "Set_Password":
      return { ...state, password: action.password };
    case "Empty_Messages":
      return { ...state, messages: [] };
    case "ADD_MESSAGE":
      return { ...state, messages: action.message, update: !state.update };
    // case 'Set_System_Message':
    //     return { ...state, systemMessages: action.messages };
    case "Logout_User":
      return {
        ...state,
        firstName: "",
        lastName: "",
        username: "",
        picture: "",
        mobile: null,
        token: null,
        messages: [],
        isLoading: false,
        apiUrl: state.apiUrl,
        userId: undefined,
      };
    case "SET_DIRECTION":
      return {
        ...state,
        dir: action.dir,
        lang: action.lang,
        messages: [],
        isLoading: false,
        resources: state.resources,
      };
    case "AUTO_COMPLETE_ACTION":
      return { ...state, list: action.list };
    case "SELECT_AUTO_COMPLETE_ACTION":
      return { ...state, select: action.select };
    case "CHANGE_RESOURCE":
      return {
        ...state,
        resources: [...state.resources, ...action.resources],
        resourceLang: action.resourceLang,
        curentResource: action.curentResouce,
      };
    case "CHANGE_MENU_RESOURCE":
      return {
        ...state,
        resources: [...state.resources, ...action.resources],
        isLoading: false,
      };
    case "Update_Basket":
      return { ...state, basket: action.basket };
      case "Set_Hamburger_Menu":
        return { ...state, showHumburgerMenu: action.val };
      case "USER_SEARCH":
      return { ...state, UserSearch: action.data };
    case "Set_User_FullName":
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    case "ADD_TAB":
       
      let Tab: TabList = { component: action.component, name: action.name };

      if (
        state.tabModels === undefined ||
        state.tabModels === null ||
        state.tabModels.Tab === null ||
        state.tabModels.Tab === undefined ||
        state.tabModels.Tab.length < 1
      ) {
        let TM: TabModel = { Tab: [Tab], Active: action.component };
        return { ...state, tabModels: TM };
      } else {
        let Exist = state.tabModels.Tab.find(
          (c) => c.component.toLowerCase() === action.component.toLowerCase()
        );
        if (Exist) {
          let TM: TabModel = {
            Tab: state.tabModels.Tab,
            Active: Exist.component,
          };
          return { ...state, tabModels: TM };
        } else {
          let TMO = state.tabModels.Tab.slice();
          TMO.unshift(Tab);
          let TM: TabModel = { Tab: TMO, Active: action.component };
          return { ...state, tabModels: TM };
        }
      }
    case "DELETE_TAB":
      let Tabs = state.tabModels.Tab.filter(
        (c) => c.component.toLowerCase() !== action.component.toLowerCase()
      ).slice();
      if (Tabs.length > 0) {
        state.tabModels.Active = Tabs[0].component;

        return {
          ...state,
          tabModels: { Active: state.tabModels.Active, Tab: Tabs },
        };
      } else {
        return { ...state, tabModels: { Active: "", Tab: [] } };
      }

    case "Change_TAB":
      let Exist2 = state.tabModels.Tab.find(
        (c) => c.component.toLowerCase() === action.component.toLowerCase()
      );
      if (Exist2 !== undefined && Exist2.component !== undefined) {
        Exist2.component = action.component2.toLowerCase();
        let stm = state.tabModels.Tab.slice();
        stm = stm.filter(
          (c) =>
            c.component.toLowerCase() !== action.component.toLowerCase() &&
            c.component.toLowerCase() !== action.component2.toLowerCase()
        );
        stm.unshift(Exist2);
        let TM: TabModel = { Tab: stm, Active: Exist2.component };
        return { ...state, tabModels: TM };
      } else {
        return { ...state };
      }
    case "REFRESH_TAB":
      return { ...state, RefreshTab: action.start };
    case "Empty_Basket":
      return { ...state, basket: [] };

    case "CHANGE_FOLDER":
      return { ...state, folder: action.name };
    case "CHANGE_MENU":
      const exId = state.resources.find(
        (c: any) => c.id === action.idE
      ) as VwPermisionResource;
      exId.isExpand = true;
      exId.orderBy = 3;
      const acId = state.resources.find(
        (c: any) => c.id === action.idAct
      ) as VwPermisionResource;
      if (exId !== undefined || acId !== undefined) {
        const Rc = state.resources
          .filter(
            (c: VwPermisionResource) =>
              c.id !== action.idE && c.id !== action.idAct
          )
          .slice();
        Rc.unshift(exId);
        acId.isActive = true;
        Rc.unshift(acId);

        return { ...state, resources: Rc };
      }
      return { ...state };

    case "SHOW_CONTACT":
      return { ...state, showContactUs: action.show };
    case "SHOW_CARDLIST":
      return { ...state, showCard: action.card };
    case "SHOW_CHAT":
      return { ...state, showChatBox: action.show };
    case "SHOW_LOGIN":
      return { ...state, showLoginBox: action.show };
    case "USER_LOAD":
      return { ...state, UserLoading: action.load };
      case "SELLER_LOAD":
        return { ...state,  SellerLoading: action.load };
    default:
      return state;
  }
};
