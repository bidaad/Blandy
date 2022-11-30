import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwSurveySubject {
    id: string;
    code: string;
    sign: string;
    HCSurveyDomainId: string;
    fromDate: Date;
    toDate: Date;
    isActive: boolean;
    description: string;
    survayDomain: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: true },
    { key: "toDate", caption: "ToDate", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "survayDomain", caption: "SurvayDomain", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];