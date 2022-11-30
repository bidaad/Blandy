import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwProductLife {
    id: string;

    sign: string;
    productId: string;
    useOnProductId: string;
    hCPlanTitleId: string;
    value: string;
    positiveTolerance: string;
    negativeTolerance: string;
    hCUnitId: string;
    isActive: boolean;
    description: string;
    creator: string;
    updater: string;

}

export const columnStructure = [
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "productId", caption: "ProductId", type: typeColumn.text, showWhenSelected: true },
    { key: "useOnProductId", caption: "UseOnProductId", type: typeColumn.text, showWhenSelected: true },
    { key: "hCPlanTitleId", caption: "HCPlanTitleId", type: typeColumn.text, showWhenSelected: true },
    { key: "value", caption: "Value", type: typeColumn.text, showWhenSelected: true },
    { key: "positiveTolerance", caption: "PositiveTolerance", type: typeColumn.text, showWhenSelected: true },
    { key: "negativeTolerance", caption: "NegativeTolerance", type: typeColumn.text, showWhenSelected: true },
    { key: "hCUnitId", caption: "HCUnitId", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];