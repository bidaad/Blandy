import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwLoadDeliveryTTWeekDay {
    id: string;

    loadDeliveryTimeTitleId: string;
    hCWeekDayId: string;
    isActive: boolean;
    description: string;
    weekDaySign: string;

}

export const columnStructure = [
    { key: "weekDaySign", caption: "weekDaySign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];