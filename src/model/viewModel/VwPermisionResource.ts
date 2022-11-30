import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPermisionResource {
    id?:string;
    resourceLanguageName?:string;
    resourceCode?:string;
    resourceTypeCode?:string;
    actionTypes?:string;
    resourceNullable?:boolean;
    parentId?:string;
    lang:string;
    orderBy?:number;
    isExpand?:boolean;
    isActive?:boolean;
    }
    