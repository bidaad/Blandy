import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";
export interface VwChatDetail {
    id: string;
    chatId: string;
    userId: string;
    chatText: string;
    isActive: boolean;
    description: string;
    createUserId: string;
    createDate: Date;
    updateUserId: string;
    updateDate: Date;
    creator: string;
    updater: string;
    userNikName: string;
    userSeen: boolean;
    expertSeen: boolean;
    expertNikName:string;
    chatCode:string;
    chatTitleSign:string;
    sendDate:string;
    expertInfo:string;
    isUser:boolean;
    files:[];
    fileText:string,
}

export const columnStructure = [
    { key: "userNikName", caption: "userNikName", type: typeColumn.text, showWhenSelected: true },
    { key: "expertNikName", caption: "expertNikName", type: typeColumn.text, showWhenSelected: true },
    { key: "chatText", caption: "chatText", type: typeColumn.text, showWhenSelected: true },
    { key: "userSeen", caption: "userSeen", type: typeColumn.check, showWhenSelected: true },
    { key: "expertSeen", caption: "expertSeen", type: typeColumn.check, showWhenSelected: true },
    { key: "isActive", caption: "isActive", type: typeColumn.check, showWhenSelected: true },

] as gridColumns[];