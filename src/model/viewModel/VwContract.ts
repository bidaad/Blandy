import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwContract {
    id: string;

    code: string;
    subject: string;
    issueDate: Date;
    startDate: Date;
    finishDate: Date;
    detail: string;
    fristSidePersonId: string;
    fristSideDepId: string;
    secondSidePersonId: string;
    secondSideDepId: string;
    parentId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;

    firstSidePerson: string;
    secondSidePerson: string;
    firstSideDepSign: string;
    secondSideDepSign: string;

}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "subject", caption: "Subject", type: typeColumn.text, showWhenSelected: true },
    { key: "issueDate", caption: "IssueDate", type: typeColumn.text, showWhenSelected: true },
    { key: "firstSidePerson", caption: "firstSidePerson", type: typeColumn.text, showWhenSelected: true },
    { key: "secondSidePerson", caption: "secondSidePerson", type: typeColumn.text, showWhenSelected: true },
    { key: "firstSideDepSign", caption: "firstSideDepSign", type: typeColumn.text, showWhenSelected: true },
    { key: "secondSideDepSign", caption: "secondSideDepSign", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];