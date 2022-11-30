import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwZoneHardCondition {
    id: string;
    zoneId: string;
    zoneSign: string;
    hcHardConditionSign: string;
    hCHardConditionId: string;
    fromDate: Date;
    toDate: Date;
    temprature: string;
    dust: string;
    isActive: boolean;
    description: string;
}

export const columnStructure = [
    { key: "zoneSign", caption: "zoneSign", type: typeColumn.text, showWhenSelected: true },
    { key: "hcHardConditionSign", caption: "hcHardConditionSign", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "toDate", caption: "ToDate", type: typeColumn.text, showWhenSelected: true },
    { key: "temprature", caption: "Temprature", type: typeColumn.text, showWhenSelected: true },
    { key: "dust", caption: "Dust", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },

] as gridColumns[];