import { projectInfo } from '../model/general/projectInfo';
import { VwMessageSystem } from '../model/viewModel/VwMessageSystem';

export  class projectStrong {
    static info: projectInfo = {token:'',url:''}
    static message:any;
    static getInfo() {
        const result = localStorage.getItem('PROJECT_INFO');
        if (result) {
            this.info = JSON.parse(result) as projectInfo;
        }
    }
    static setInfo(projectInfo: any) {
        localStorage.setItem('PROJECT_INFO', JSON.stringify(projectInfo));
        this.info=projectInfo;
    }
    static getMessageList(code:string,lang:string) {
        const result =localStorage.getItem('MESSAGE_LIST');
        if(result)
        {
            
            const messageList=JSON.parse(result) as VwMessageSystem[];
            if(messageList.length>0)
            {
                const msg=messageList.find(c=>c.code.toUpperCase()===code.toString().toUpperCase() && c.lang.toUpperCase()===lang.toString().toUpperCase());
                if(msg)
                {
                    this.message=msg;
                    return;
                }

            }

        }
        this.message=undefined;
    }
    static setMessageList(messageList: any) {
        localStorage.setItem('MESSAGE_LIST',JSON.stringify( messageList));
    }
    static emptyMessage(messageList: any) {
        this.message='';
    }
}