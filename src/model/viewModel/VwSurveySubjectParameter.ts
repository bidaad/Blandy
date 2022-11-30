import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwSurveySubjectParameter {
    id: string;
    surveySubjectId: string;
    hCSurveyParameterId: string;
    orderBy: number;
    isActive: boolean;
    description: string;
    sign: string;
    creator: string;
    updater: string;
}

export const columnStructure = [
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "orderBy", caption: "OrderBy", type: typeColumn.number, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];