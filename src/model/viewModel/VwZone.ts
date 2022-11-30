import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwZone {
    id: string;

    code: string;
    sign: string;
    parentId: string;
    telCode: string;
    hCZoneTypeId: string;
    latitude: string;
    longitude: string;
    iSOCode1: string;
    iSOCode2: string;
    iSOCode3: string;
    postCode: string;
    isActive: boolean;
    description: string;
    languageId: string;
    name: string;
    creator: string;
    updater: string;
    zoneTypeSign: string;
    zoneTypeLanguageId: string;
    zoneTypeName: string;
    lang: string;
    parentSign: string;
    zoneTypeCode:string;

}

export const columnStructure = [
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: false },
    { key: "name", caption: "Name", type: typeColumn.text, showWhenSelected: false },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: false },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: false },
    { key: "zoneTypeSign", caption: "ZoneTypeSign", type: typeColumn.text, showWhenSelected: false },
    { key: "zoneTypeName", caption: "ZoneTypeName", type: typeColumn.text, showWhenSelected: false },
    { key: "lang", caption: "Lang", type: typeColumn.text, showWhenSelected: false },
    { key: "parentSign", caption: "ParentSign", type: typeColumn.text, showWhenSelected: false },

] as gridColumns[];