import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUserFavouriteDep {
    id: string;
    userId: string;
    depSign: string;
    depId: string;
    userComment: string;
    isActive: boolean;
    description: string;

}

export const columnStructure = [
    { key: "depSign", caption: "depSign", type: typeColumn.text, showWhenSelected: true },
    { key: "userComment", caption: "UserComment", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },

] as gridColumns[];