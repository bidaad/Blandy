import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwUserFriend {
    id: string;
    userId: string;
    friendNikName: string;
    friendId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "friendNikName", caption: "friendNikName", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];