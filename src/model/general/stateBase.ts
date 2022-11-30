import { MessageTypes, Directions } from ".";
import { Direction } from "readline";
import { typeColumn } from "./typeComponent";
export interface gridColumns {
    key: string;
    caption:string;
    type?:typeColumn;
    showWhenSelected: boolean;
}

export interface grdColumns {
    key: string;
    type:string;
    showWhenSelected: boolean;
}
export interface stateBase<v extends baseModel>  {
    id: string ;
    parentId?:string;
    isLoading: boolean;
    pageNo: number;
    pageSize: number;
    count: number;
    models: v[];
    editable: boolean,
    message: string,
    messageType: MessageTypes,
    filter: string,
    edit: any ;
    backWardName:string;
    list:[];
    dir?:Directions;
    isFormLoading?:boolean;
    sort:string;
    isEditLoad?:boolean;
    reducer?:any;
    saveLoading?:boolean;
    // resources?:any;
}

export interface baseModel {
    id: string ; 
    parentId?: string;
    isActive?:boolean;
}