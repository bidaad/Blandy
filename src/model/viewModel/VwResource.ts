import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwResource {
    id:string;
    parentId:string;
    hCResourceTypeId:string;
    code:string;
    sign:string;
    orderBy:number;
    area:string;
    controller:string;
    action:string;
    icon:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:string;
    updateUserID:string;
    updateDate:string;
    resourceTypeSign:string;
    creator:string;
    updater:string;
    parentName:string;
    }

    export const columnStructure = [
        { key: "sign", type: typeColumn.text, caption: "", showWhenSelected: true },
        { key: "code", type: typeColumn.text, caption: "", showWhenSelected: true },

        { key: "area", type: typeColumn.text, caption: "", showWhenSelected: false },
        { key: "controller", type: typeColumn.text, caption: "", showWhenSelected: false },
        { key: "action", type: typeColumn.text, caption: "", showWhenSelected: false },

    ] as gridColumns[];