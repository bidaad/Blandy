import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwPersonActiveInZone {
    id: string;
    personId: string;
    zoneSign: string;
    zoneId: string;
    isActive: boolean;
    description: string;

}

export const columnStructure = [
    { key: "zoneSign", caption: "zoneSign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];