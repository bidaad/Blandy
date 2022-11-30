import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwJCInterval {
    id: string;

    jobCardId: string;
    hCPlanTitleId: string;
    code: string;
    sign: string;
    repeatable: boolean;
    guarantee: boolean;
    value: string;
    positiveTolerance: string;
    negativeTolerance: string;
    hCUnitUsage: string;
    fromDate: Date;
    fixDate: Date;
    toDate: Date;
    hCMonthId: string;
    exactDay: number;
    zoneSign: string;
    isActive: boolean;
    description: string;
    planTitleSign: string;
    monthSign: string;
    unitSign:string;


}

export const columnStructure = [
    { key: "planTitleSign", caption: "planTitleSign", type: typeColumn.text, showWhenSelected: true },
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "repeatable", caption: "Repeatable", type: typeColumn.check, showWhenSelected: false },
    { key: "guarantee", caption: "Guarantee", type: typeColumn.check, showWhenSelected: false },
    { key: "value", caption: "Value", type: typeColumn.text, showWhenSelected: false },
    { key: "positiveTolerance", caption: "PositiveTolerance", type: typeColumn.text, showWhenSelected: false },
    { key: "negativeTolerance", caption: "NegativeTolerance", type: typeColumn.text, showWhenSelected: false },
    { key: "fromDate", caption: "FromDate", type: typeColumn.text, showWhenSelected: false },
    { key: "fixDate", caption: "FixDate", type: typeColumn.text, showWhenSelected: false },
    { key: "toDate", caption: "ToDate", type: typeColumn.text, showWhenSelected: false },
    { key: "exactDay", caption: "ExactDay", type: typeColumn.number, showWhenSelected: false },
    { key: "zoneSign", caption: "ZoneSign", type: typeColumn.text, showWhenSelected: false },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: false },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: false },
    { key: "monthSign", caption: "MonthSign", type: typeColumn.text, showWhenSelected: false },

] as gridColumns[];