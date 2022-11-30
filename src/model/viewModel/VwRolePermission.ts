import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwRolePermission {
    id: string;

    roleId : string;
    permissionId : string;
    isActive : boolean;
    description : string;
    createUserId : string;
    createDate : string;
    updateUserId : string;
    updateDate : string;
    roleName : string;
    sign : string;
    actionTypeName : string;
    resourceId : string;
    actionTypeId : string;
    updater:string;
    creator:string;
    parentId:string;

}

export const columnStructure = [
// { key: "roleId", caption: "RoleId", type:typeColumn.text, showWhenSelected:true },
// { key: "permissionId", caption: "PermissionId", type:typeColumn.text, showWhenSelected:true },
// { key: "isActive", caption: "IsActive", type:typeColumn.check, showWhenSelected:true },
// { key: "description", caption: "Description", type:typeColumn.text, showWhenSelected:true },
// { key: "creator", caption: "Creator", type:typeColumn.text, showWhenSelected:true },
// { key: "updater", caption: "Updater", type:typeColumn.text, showWhenSelected:true },
// { key: "resourceId", caption: "ResourceId", type:typeColumn.text, showWhenSelected:true },

{ key: "roleName", caption: "roleName", type:typeColumn.text, showWhenSelected:true },
{ key: "actionTypeName", caption: "ActionTypeName", type:typeColumn.text, showWhenSelected:true },
{ key: "sign", caption: "sign", type:typeColumn.text, showWhenSelected:true },
{ key: "isActive", caption: "isActive", type:typeColumn.check, showWhenSelected:true },
// { key: "actionTypeId", caption: "ActionTypeId", type:typeColumn.text, showWhenSelected:true },
// { key: "roleName", caption: "RoleName", type:typeColumn.text, showWhenSelected:true },
// { key: "actionTypeName", caption: "ActionTypeName", type:typeColumn.text, showWhenSelected:true },

] as gridColumns[];