import { gridColumns } from "../general/stateBase";

export interface VwUser {
    id:string;
    username:string;
    passwordSalt:string;
    password:string;
    firstName:string;
    midName:string;
    lastName:string;
    personId:string;
    email:string;
    role:string;
    isActive:boolean;
    mobile:string;
    challengeCode:string;
    departmentId:string;
    depSign:string;
    hCUserTypeId:string;
    defLang:string;
    creator:string;
    updater:string;
    }
    
    export const columnStructure = [
        { key: "username", showWhenSelected:true },
        { key: "firstName" ,showWhenSelected:true},
        { key: "lastName", showWhenSelected:true },
        { key: "email" ,showWhenSelected:false},
    ] as gridColumns[];