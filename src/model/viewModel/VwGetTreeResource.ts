import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwGetTreeResource {
    id:string;
    parentId:string;
    code:string;
    child:number;
    level:number;
    sign:string;
    show:number;
    }
    