//export const APIUrl = 'https://api.autochar.ir/api'
//export const APIUrl='http://localhost:50794/api'
//export const APIImage='http://localhost:50794'
//export const APIImage='http://192.168.100.30:70'
//export const APIUrl='http://192.168.100.30:70/api'

//import { setTimeout } from "timers";

export const APIUrl = process.env.REACT_APP_APIUrl
export const APIImage = process.env.REACT_APP_APIImage


export async function GetIP4() {
    const publicIp = require('public-ip');
    let Ip: any;
    await (async () => {

        return await publicIp.v4();
        //=> '46.5.21.123'

        //   console.log('IP6',await publicIp.v6());
        //=> 'fe80::200:f8ff:fe21:67cf'
    })().then((value) => {
         
        Ip = value;
    })
    return await Ip;
}
