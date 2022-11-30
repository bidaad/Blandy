import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as MessageStore from '../../../../store/Message';
import * as MessageStoreSL from '../../../../store/MessageSL';
import ReactGrid from "../../../../components/ReactGrid";
import { stateBase } from '../../../../model/general/stateBase';
import { VwMessage, columnStructure } from '../../../../model/viewModel/VwMessage';

import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';

type MessageProps =
    stateBase<VwMessage> &
    typeof MessageStore.actionCreators &
    RouteComponentProps<{}> &
     {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string  };

class Message extends React.PureComponent<MessageProps> {

    private ensureDataFetched(pageNo: number) {
        this.getData(1, 10, '')
    }

    componentDidMount() {
        //this.props.checkSecurity(this.props.history);

        this.ensureDataFetched(1);
    }

        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"message.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }
    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {
        
    this.props.ChangeTab('', 'Message', 'MessageEdit');
        this.props.editData(id);
    }
    selectRecord = (id: string, selectedColumns: string) => {
        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
    }

    newRecord = () => {
        this.props.ChangeTab('', 'Message', 'MessageEdit');
        this.props.editData();
    }


    public render() {

        return (
            <React.Fragment>
                <ReactGrid
                    {...
                    {
                        title: 'Message.Grid',
                        columns: columnStructure,
                        editable: true,
                        data: this.props.models,
                        count: this.props.count,
                        getData: this.getData,
                        deleteRecord: this.deleteRecord,
                        selectRecord: this.selectRecord,
                        filter: this.props.filter,
                        editRecord: this.editRecord,
                        pageSize: this.props.pageSize,
                        newRecord: this.newRecord,
                        internalLoading: this.props.isLoading,
                        
                        sort: this.props.sort,
                    }}
                />

            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.messages, // Selects which state properties are merged into the component's props
    MessageStore.actionCreators // Selects which action creators are merged into the component's props
)(Message as any);

class MessageSLClass extends Message {
}

export const MessageSelect = connect(
    (state: ApplicationState) => state.messagessl,
    MessageStoreSL.actionCreators
)(MessageSLClass as any);
