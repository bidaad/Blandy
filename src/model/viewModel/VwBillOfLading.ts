import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBillOfLading {
    id: string;

    code: string;
    sign: string;
    issueDepId: string;
    issueTime: string;
    shipperDepId: string;
    shipperDepName: string;
    shipperPersonId: string;
    shipperPersonName: string;
    hCShipVehicleTypeId: string;
    vehicleId: string;
    isActive: boolean;
    description: string;
    shippingStatusDetail: string;
    issueDepSign:string;
    shipperDepSign:string;
    hcshipTypeId:string;
    hcshipStatusId:string;
    shipTypeSign: string;
    shipStatusSign: string;
    shipStatusCode:string;
    creator:string;
    updater:string;
}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "issTime", caption: "IssTime", type: typeColumn.text, showWhenSelected: true },
    { key: "shipperDepName", caption: "ShipperDepName", type: typeColumn.text, showWhenSelected: true },
    { key: "shipperPersonName", caption: "ShipperPersonName", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "shippingStatusDetail", caption: "ShippingStatusDetail", type: typeColumn.text, showWhenSelected: true },
    { key: "issueDepSign", caption: "issueDepSign", type: typeColumn.text, showWhenSelected: true },
    { key: "productSign", caption: "productSign", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];