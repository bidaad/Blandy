import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwChat {
    id: string;

    userId: string;
    code: string;
    sign: string;
    hcchatTypeId: string;
    hcchatStatusId: string;
    hcchatTitle: string;
    expertId: string;
    expertComment: string;
    userIp: string;
    userDevice: string;
    userBrowser: string;
    isActive: boolean;
    description: string;
    chatStatus: string;
    chatType: string;
    chatTitle: string;
    userNikName: string;
    expertNikName: string;
    creator: string;
    updater: string;
    cDate: string;
    chatTypeCode:string;
    sendDate:string;
    rowNumber:number;
    endChat:boolean;
    endChatDate:string;
    chatStatusCode: string;
}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
        { key: "chatStatus", caption: "ChatStatus", type: typeColumn.text, showWhenSelected: true },
    { key: "chatType", caption: "ChatType", type: typeColumn.text, showWhenSelected: true },
    { key: "hCChatTitle", caption: "HCChatTitle", type: typeColumn.text, showWhenSelected: true },
    { key: "expertNikName", caption: "expertNikName", type: typeColumn.text, showWhenSelected: true },
    { key: "expertComment", caption: "ExpertComment", type: typeColumn.text, showWhenSelected: true },
    { key: "userNikName", caption: "userNikName", type: typeColumn.text, showWhenSelected: true },
    { key: "userIP", caption: "UserIP", type: typeColumn.text, showWhenSelected: true },
    { key: "userDevice", caption: "UserDevice", type: typeColumn.text, showWhenSelected: true },
    { key: "userBrowser", caption: "UserBrowser", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

    // { key: "chatTitle", caption: "ChatTitle", type: typeColumn.text, showWhenSelected: true },
    // { key: "userNikName", caption: "UserNikName", type: typeColumn.text, showWhenSelected: true },
    // { key: "expertNikName", caption: "ExpertNikName", type: typeColumn.text, showWhenSelected: true },
    // { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    // { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];