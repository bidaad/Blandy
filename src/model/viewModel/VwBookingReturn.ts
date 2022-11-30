import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBookingReturn {
    id: string;

    bookingId: string;
    hcBookingReturnStatusSign:string;
    assetSign:string;
    expertUserSign:string;
    returnUserSign:string;
    bookingAssetId: string;
    returnDate: Date;
    returnerUserId: string;
    returnerUserReason: string;
    expertUserId: string;
    expertComment: string;
    isActive: boolean;
    description: string;

}

export const columnStructure = [
    { key: "assetSign", caption: "assetSign", type: typeColumn.text, showWhenSelected: true },
    { key: "expertUserSign", caption: "expertUserSign", type: typeColumn.text, showWhenSelected: true },
    { key: "returnUserSign", caption: "returnUserSign", type: typeColumn.text, showWhenSelected: true },
    { key: "hcBookingReturnStatusSign", caption: "hcBookingReturnStatusSign", type: typeColumn.text, showWhenSelected: true },
    { key: "returnDate", caption: "ReturnDate", type: typeColumn.text, showWhenSelected: true },
    { key: "returnerUserId", caption: "ReturnerUserId", type: typeColumn.text, showWhenSelected: true },
    { key: "returnerUserReason", caption: "ReturnerUserReason", type: typeColumn.text, showWhenSelected: true },
    { key: "expertUserId", caption: "ExpertUserId", type: typeColumn.text, showWhenSelected: true },
    { key: "expertComment", caption: "ExpertComment", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];