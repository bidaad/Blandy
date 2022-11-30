import React, { Component } from 'react';
import { ApplicationState } from '../store';
import * as UserInfo from '../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Tab from 'react-bootstrap/Tab';
import { Tabs } from 'react-bootstrap';
import DynamicComponent from './DynamicComponent';
import { KnownEntities } from '../model/general/entityBase';
import { responseModel } from '../model/general/responseModel';
import { APIUrl } from '../helper/config';
import { SPTabs } from '../model/viewModel/SpTabs';
import history from '../history';
export interface ComponentColumns {
    key: string;
    name: string;
}
type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    { component: ComponentColumns[], editId: any, defaultKey: string, folder: KnownEntities, typeForm?: string, isTabDetail?: boolean };
class TTabs extends Component<InputProps, { typeform: any, tablist: any, componet: any, componentName: any }> {

    constructor(props: any) {
        super(props);
        this.state = { tablist: [], componet: null, componentName: '', typeform: '' };
    }
    async componentDidMount() {
        
        
        let listCodes = '';
        this.props.component.filter((value: ComponentColumns) => {
            listCodes = listCodes + value.name + '.EditForm' + '|';
        })

        listCodes = listCodes.slice(0, listCodes.length - 1);
        fetch(APIUrl+'/Resource/GET_Tabs?listcode=' + listCodes + '&lang=fa', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(response => { if (response.status === 200) { return response.json() as Promise<responseModel> } else { throw response } })
            .then(mr => {
                if (mr.messageCode === 0) {
 
                    this.setState({ tablist: mr.data as SPTabs[] })
                }
            }).catch(
                error => {
                    if (error.status === 401) {
                        history.push('/adminlogin');
                    }
                }
            );
        // const res1 = await fetchData<responseModel>(APIUrl + '/Resource/GET_Tabs?listcode=' + listCodes + '&lang=fa', 'GET', this.props, false, '', this.props.token);
        // if ((res1 as responseModel).data && (res1 as responseModel).data.length > 0) {
        //     let data = (res1 as responseModel).data as SPTabs[];
        //     this.setState({ tablist: data })
        // }
    }

    // componentDidUpdate(prevProps: any) {
    //     
    //     if (prevProps.RefreshTab !== this.props.RefreshTab) {
    //         var sl = $(".tabcontentAdmin.activeContent .TTABS a.active").attr("id");
    //         if (sl !== undefined) {
    //             setTimeout(() => {
    //                 if (sl !== undefined) {
    //                     sl = sl.replace("tab", "tabpane");
    //                     $("#" + sl + " span.btn.btn-info.fa.fa-refresh").click();
    //                 }
    //             }, 3000)
    //         }
    //     }

    // }

    handletClick = (e: any) => {
         
             let cmp = e.currentTarget.dataset.key;
        cmp = cmp.toString().replace('.EditForm', '').toLowerCase();
         
        let cd=this.props.component.find(c=>c.name===cmp);
        let tp = e.currentTarget.dataset.typeform;
             this.setState({
            componet:<DynamicComponent  {...{ entityName: cd?cd.key:'', parentId: this.props.editId, folderName: this.props.folder, typeForm: tp }} />
            , componentName: cmp + '.EditForm'
        })
    }


    render() {
         
        if (this.props.component === undefined) {
            return null;
        }
        let identity = Math.floor(Math.random() * 99000).toString();
        return (
            <Tabs className="TTABS" defaultActiveKey={this.props.defaultKey} id={identity} >
                {/* {this.props.component.map((col: ComponentColumns) => */}

                {this.state.tablist.map((col2: SPTabs) =>
                    <Tab key={col2.rcode} eventKey={col2.rcode} title={<h6 data-typeform={this.props.typeForm} data-key={col2.rcode} onClick={this.handletClick}>{col2.rname}</h6>}>
                        {this.state.componentName && this.state.componentName.toString().toUpperCase() === col2.rcode.toString().toUpperCase() ? this.state.componet : null}
                        {/* <TTitle {...{ name: col2.rName, size: 6, click: this.handletClick }} /> */}
                        {/* (col.name + ".EditForm").toString().toUpperCase()===col2.rCode.toString().toUpperCase()?col2.rName:'***' */}
                        {/* <DynamicComponent  {...{ entityName: col.key, parentId: this.props.editId, folderName: this.props.folder, typeForm: this.props.typeForm }} /> */}
                    </Tab>
                )}


                {/* )} */}
            </Tabs>)
    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(TTabs as any);