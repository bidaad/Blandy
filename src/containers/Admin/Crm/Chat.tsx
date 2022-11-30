import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as ChatStore from '../../../store/Chat';
import { VwChat, columnStructure } from '../../../model/viewModel/VwChat';
import { Modal } from 'react-bootstrap';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../components/TTitle';

import ChatEdit from './ChatEdit';


type ChatProps =
    stateBase<VwChat> &
    typeof ChatStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };



class Chat extends React.PureComponent<ChatProps, { showModal: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false,
        }
    }

    refreshGrid = (parentId: string) => {
        this.getData(1, 10, '')
    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);

        this.refreshGrid(this.props.pId)
    }

    componentWillReceiveProps() {

    }

        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Chat.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }
    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }


    editRecord = (id: string) => {
        	
	//history.push('/ProductLangEdit', { id: id });
        this.setState({ showModal: true })
        this.props.editData(id);

    }
    newRecord = () => {

        this.setState({ showModal: true })
        this.props.newData(this.props.id);
    }
    selectRecord = (id: string, selectedColumns: string) => {

    }

    handleClose = () => {
        this.setState({ showModal: false })
    }

    public render() {
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = "Rtl";
        }


        return (
            <React.Fragment>
                <div key={1}>

                    <ReactGrid
                        {...
                        {
                            title: 'Chat.Grid',
                            columns: columnStructure,
                            editable: true,
                            data: this.props.models,
                            count: this.props.count,
                            getData: this.getData,
                            deleteRecord: this.deleteRecord,
                            filter: this.props.filter,
                            editRecord: this.editRecord,
                            selectRecord: this.selectRecord,
                            pageSize: this.props.pageSize,
                            pageNo: this.props.pageNo,
                            newRecord: this.newRecord,
                            internalLoading: this.props.isLoading,
                            
                            sort: this.props.sort,
                            isSelected: this.props.isSelected

                        }}
                    />


                </div>
                <div key={2}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Chat.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <ChatEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId,typeForm:this.props.typeForm }} />
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.chat,
    ChatStore.actionCreators
)(Chat as any);

