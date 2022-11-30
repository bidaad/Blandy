import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwMachineRelated {
    id: string;

    productId: string;
    machineId: string;
    isActive: boolean;
    description: string;
    sign: string;
    creator: string;
    updater: string;
    machinSign:string;
    machinIcon:string;
    toManufactureDate:Date;
    fromManufactureDate:Date;
}

export const columnStructure = [
    { key: "machinSign", caption: "machinSign", type: typeColumn.text, showWhenSelected: true },
    // { key: "machinIcon", caption: "machinIcon", type: typeColumn.image, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];