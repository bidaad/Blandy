import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from "../../../components/ReactGrid";
import { stateBase } from '../../../model/general/stateBase';
import * as DocumentStore from '../../../store/Document';
import { Modal } from 'react-bootstrap';
import { VwDocument, columnStructure } from '../../../model/viewModel/VwDocument';
import DocumentEdit from './DocumentEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../components/TTitle';
import { KnownEntities } from '../../../model/general/entityBase';



type DocumentProps =
    stateBase<VwDocument> &
    typeof DocumentStore.actionCreators &
    RouteComponentProps<{}> &
    { selectRecord: any, pId: string, isSelected?: boolean ,folderName?:KnownEntities, valuefiltersl: string,noselectId:string,typeForm:string } &
    { match: any, location: any, history: any } ;


class Document extends React.PureComponent<DocumentProps, { showModal: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    refreshGrid = (parentId: string) => {

        this.getData(1, 10, '')
    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.refreshGrid(this.props.pId)
    }
    

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    // componentWillReceiveProps(props: any) {
    //     if (props.parentId !== '') {
    //         props.checkSecurity(this.props.history);
    //         this.refreshGrid()
    //     }
    // }

            getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Document.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }
    editRecord = (id: string) => {
        	
	//history.push('/ProductLangEdit', { id: id });
        this.setState({ showModal: true })
        this.props.editData(id);

    }
    newRecord = () => {
        this.setState({ showModal: true })
        this.props.newData(this.props.pId);
    }

    selectRecord = (id: string, selectedColumns: string) => {
        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
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
                                title: 'Document.Grid',
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
                                
                                
                            }}
                            
                        />
                </div>
                <div key={2}>
                    <Modal show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Document.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <DocumentEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                        </Modal.Body>
                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.documents,
    DocumentStore.actionCreators
)(Document as any);

