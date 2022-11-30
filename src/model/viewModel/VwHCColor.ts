import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCColor {
    id: string;

                        code : string;
                        sign : string;
                        icon : string;
                        orderBy : number;
                        colorHaxCode : string;
                        colorRGBCode : string;
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
{ key: "colorHaxCode", caption: "ColorHaxCode", type:typeColumn.text, showWhenSelected:true },
{ key: "colorRGBCode", caption: "ColorRGBCode", type:typeColumn.text, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },

] as gridColumns[];