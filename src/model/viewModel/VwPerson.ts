import { gridColumns } from "../general/stateBase";

export interface VwPerson {
    id:string;
    hCGenderId:string;
    nationalCode:string;
    birthDate:Date;
    isActive:boolean;
    description:string;
    createUserID:string;
    createDate:Date;
    updateUserID:string;
    updateDate:Date;
    languageId:string;
    firstName:string;
    midName:string;
    lastName:string;
    creator:string;
    updater:string;
    genderSign:string;
    genderLanguageId:string;
    genderName:string;
    lang:string;
    expertConfirm:boolean;
    persianBirthDate:string;
    }

    export const columnStructure = [
        { key: "firstName",  showWhenSelected:true },
        { key: "lastName", showWhenSelected:true},
        { key: "nationalCode", showWhenSelected:false},
        { key: "persianBirthDate", showWhenSelected:false},
        { key: "genderName", showWhenSelected:false},
        
    ] as gridColumns[];
    