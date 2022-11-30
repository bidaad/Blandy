import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCWHOperationStatus {
    id: string;

                        code : string;
                        sign : string;
                        icon : string;
                        orderBy : number;
                        isActive : boolean;
                        description : string;
                        updator: string;
                        creator: string;

}

export const columnStructure = [
{ key: "code", caption: "Code", type:typeColumn.text, showWhenSelected:true },
{ key: "sign", caption: "Sign", type:typeColumn.text, showWhenSelected:true },
{ key: "icon", caption: "Icon", type:typeColumn.image, showWhenSelected:true },
{ key: "orderBy", caption: "OrderBy", type:typeColumn.number, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },

] as gridColumns[];