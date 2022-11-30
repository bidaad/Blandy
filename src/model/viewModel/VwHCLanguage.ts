import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCLanguage {
    id: string;

                        iSOCode1 : string;
                        iSOCode2 : string;
                        sign : string;
                        icon : string;
                        orderBy : number;
                        isActive : boolean;
                        description : string;
                        nameFa : string;
                        nameEn : string;
                        localName : string;
                        rightToLeft : boolean;
                        updator: string;
                        creator: string;

}

export const columnStructure = [
{ key: "iSOCode1", caption: "ISOCode1", type:typeColumn.text, showWhenSelected:true },
{ key: "iSOCode2", caption: "ISOCode2", type:typeColumn.text, showWhenSelected:true },
{ key: "sign", caption: "Sign", type:typeColumn.text, showWhenSelected:true },
{ key: "icon", caption: "Icon", type:typeColumn.image, showWhenSelected:true },
{ key: "orderBy", caption: "OrderBy", type:typeColumn.number, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },
{ key: "nameFa", caption: "NameFa", type:typeColumn.text, showWhenSelected:true },
{ key: "nameEn", caption: "NameEn", type:typeColumn.text, showWhenSelected:true },
{ key: "localName", caption: "LocalName", type:typeColumn.text, showWhenSelected:true },
{ key: "rightToLeft", caption: "RightToLeft", type:typeColumn.check, showWhenSelected:true },

] as gridColumns[];