import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCUnitLang {
    id: string;

                        hCUnitId : string;
                        languageId : string;
                        name : string;
                        isActive : boolean;
                        description : string;
                        updator: string;
                        creator: string;

}

export const columnStructure = [
    { key: "sign", caption: "sign", type: typeColumn.text, showWhenSelected: true },
{ key: "name", caption: "Name", type:typeColumn.text, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },

] as gridColumns[];