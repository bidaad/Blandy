import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCCurrency {
    id: string;

                        iSOCode1 : string;
                        iSOCode2 : string;
                        sign : string;
                        decimalNo : number;
                        symbol : string;
                        isActive : boolean;
                        description : string;
                        orderBy : number;
                        icon : string;
                        updator: string;
                        creator: string;

}

export const columnStructure = [
{ key: "iSOCode1", caption: "ISOCode1", type:typeColumn.text, showWhenSelected:true },
{ key: "iSOCode2", caption: "ISOCode2", type:typeColumn.text, showWhenSelected:true },
{ key: "sign", caption: "Sign", type:typeColumn.text, showWhenSelected:true },
{ key: "decimalNo", caption: "DecimalNo", type:typeColumn.number, showWhenSelected:true },
{ key: "symbol", caption: "Symbol", type:typeColumn.text, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },
{ key: "orderBy", caption: "OrderBy", type:typeColumn.number, showWhenSelected:true },
{ key: "icon", caption: "Icon", type:typeColumn.image, showWhenSelected:true },

] as gridColumns[];