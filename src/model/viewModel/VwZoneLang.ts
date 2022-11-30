import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwZoneLang {
    id:string;
    zoneId:string;
    languageId:string;
    name:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:string;
    updateUserID:string;
    updateDate:string;
    creator:string;
    updater:string;
    hCZoneTypeId:string;
    parentId:string;
    sign:string;
    }

export const columnStructure = [
    { key: "name", caption: "نام", showWhenSelected: true },
    { key: "sign", caption: "علامت", showWhenSelected: true },
    { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: false },

] as gridColumns[];