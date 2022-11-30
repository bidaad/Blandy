import { gridColumns } from "../general/stateBase";

export interface VwMessage {
  id:string;
  hCMessageType:string;
  code:string;
  sign:string;
  icon:string;
  isActive:boolean;
  description:string;
  creator:string;
  updater:string;
  createUserID:string;
  updateUserID:string;
  mTCode:string;
  mTSign:string;
  }

export const columnStructure = [
  { key: "sign",showWhenSelected:true },
  { key: "code",showWhenSelected:true },
  // { key: "mTCode",showWhenSelected:true },
] as gridColumns[];
    