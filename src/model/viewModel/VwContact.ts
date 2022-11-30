import { typeColumn } from "../general/typeComponent";
import { gridColumns } from "../general/stateBase";

export interface VwContact {
    id:string;
    personId?:string;
    depId:string;
    hccontactTypeId:string;
    zoneId:string;
    value:string;
    postCode:string;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:Date;
    updateUserID:string;
    updateDate:Date;
    latitude:string;
    longitude:string;
    buildingLicensePlate:string;
    apartmentLicensePlate:string;
    contactTypeCode:string;
    cityName:string;
    continentName:string;
    contactTypeSign:string;
    parentId:string; 
    creator:string,
    updater:string;
    personName:string;
    departmentSign:string;
    mainContact:boolean;
    adressTel:string;
    }
    

    export const columnStructure = [
        { key: "contactTypeSign", showWhenSelected: false },
        { key: "value", showWhenSelected: true },
        { key: "cityName", showWhenSelected: true },
        { key: "latitude", showWhenSelected: true },
        { key: "longitude", showWhenSelected: true },
        { key: "buildingLicensePlate", showWhenSelected: true },
        { key: "apartmentLicensePlate", showWhenSelected: true },
        { key: "isActive", type: typeColumn.check, caption: "", showWhenSelected: false },
    
    ] as gridColumns[];