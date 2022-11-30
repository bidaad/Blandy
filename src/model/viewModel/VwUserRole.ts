import { gridColumns } from "../general/stateBase";
import { typeColumn } from "../general/typeComponent";

export interface VwUserRole {
    id:string;
    userId:string;
    roleId:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:string;
    updateUserID:string;
    updateDate:string;
    roleName:string;
    personId:string;
    userName:string;
    }

export const columnStructure = [
    { key: "userName", caption: "محصول", showWhenSelected: true },
    { key: "roleName", caption: "محصول", showWhenSelected: true },
    { key: "isActive", showWhenSelected: true,type:typeColumn.check },
] as gridColumns[];