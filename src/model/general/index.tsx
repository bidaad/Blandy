export enum MessageTypes {
    Warning = 1,
    Success = 2,
    Error = 3,
}


export interface Message{
    msg: string;
    msgType: MessageTypes;
}


export enum Directions {
    RTL=1,
    LTR=2
}

export enum ProductSearchMode {
    Search=1,
    FormControl=2
}

export interface Language{
    title:string;
    abr:string;
    direction:Directions;
}


export enum LayoutTypes {
    Main=0,
    User=1,
    Product=2,
    Order=3,
    UserFull = 4,
    Seller = 5,
}


export const langs = [
    {
        title:'فارسی',
        abr:'Fa',
        direction:Directions.RTL
    } as Language,
    {
        title:'English',
        abr:'En',
        direction:Directions.LTR
    } as Language,
    {
        title:'French',
        abr:'Fr',
        direction:Directions.LTR
    } as Language,
] 

