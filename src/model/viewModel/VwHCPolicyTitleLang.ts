import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwHCPolicyTitleLang {
    id: string;

                        hCPolicyTitleId : string;
                        languageId : string;
                        title : string;
                        isActive : boolean;
                        description : string;
                        updator: string;
                        creator: string;

}

export const columnStructure = [
{ key: "sign", caption: "sign", type:typeColumn.text, showWhenSelected:true },
{ key: "title", caption: "Title", type:typeColumn.text, showWhenSelected:true },
{ key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
{ key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },

] as gridColumns[];