import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwBillOLBooking {
    id: string;

    code: string;
    sign: string;
    bookingId: string;
    billOfLadingId: string;
    shippingRuleId: string;
    destContactId: string;
    destRecipientName: string;
    destRecipientMobile: string;
    destLongitude: string;
    origContactId: string;
    destLatitude: string;
    origRecipientName: string;
    origLatitude: string;
    origRecipientMobile: string;
    isActive: boolean;
    origLongitude: string;
    description: string;
    creator: string;
    updater: string;
    loadDeliveryTTWeekDay: string;
    loadDeliveryRequestDate: Date;
    fullAddress: string;

}

export const columnStructure = [
    { key: "code", caption: "Code", type: typeColumn.text, showWhenSelected: true },
    { key: "sign", caption: "Sign", type: typeColumn.text, showWhenSelected: true },
    { key: "destRecipientName", caption: "DestRecipientName", type: typeColumn.text, showWhenSelected: true },
    { key: "destRecipientMobile", caption: "DestRecipientMobile", type: typeColumn.text, showWhenSelected: true },
    { key: "destLongitude", caption: "DestLongitude", type: typeColumn.text, showWhenSelected: true },
    { key: "destLatitude", caption: "DestLatitude", type: typeColumn.text, showWhenSelected: true },
    { key: "origRecipientName", caption: "OrigRecipientName", type: typeColumn.text, showWhenSelected: true },
    { key: "origLatitude", caption: "OrigLatitude", type: typeColumn.text, showWhenSelected: true },
    { key: "origRecipientMobile", caption: "OrigRecipientMobile", type: typeColumn.text, showWhenSelected: true },
    { key: "isActive", caption: "IsActive", type: typeColumn.check, showWhenSelected: true },
    { key: "origLongitude", caption: "OrigLongitude", type: typeColumn.text, showWhenSelected: true },
    { key: "description", caption: "Description", type: typeColumn.text, showWhenSelected: true },
    { key: "creator", caption: "Creator", type: typeColumn.text, showWhenSelected: true },
    { key: "updater", caption: "Updater", type: typeColumn.text, showWhenSelected: true },

] as gridColumns[];