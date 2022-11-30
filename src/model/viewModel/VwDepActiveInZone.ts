import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwDepActiveInZone {
    id: string;

    depId: string;
    zoneId: string;
    isActive: boolean;
    description: string;
    zoneSign: string;

}

export const columnStructure = [
    { key: "zoneSign", caption: "zoneSign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];