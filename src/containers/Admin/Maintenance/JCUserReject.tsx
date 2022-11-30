import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as JCUserRejectStore from '../../../store/JCUserReject';
import * as JCUserRejectAssetStore from '../../../store/JCUserRejectAsset';
import * as JCUserRejectJobcardStore from '../../../store/JCUserRejectJobcard';
import { VwJCUserReject, columnStructure } from '../../../model/viewModel/VwJCUserReject';
import { Modal } from 'react-bootstrap';
import JCUserRejectEdit, { JCUserRejectAssetEdit, JCUserRejectJobcardEdit } from './JCUserRejectEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../components/TTitle';



type JCUserRejectProps =
    stateBase<VwJCUserReject> &
    typeof JCUserRejectStore.actionCreators &
    RouteComponentProps<{}> &
        {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };


class JCUserReject extends React.PureComponent<JCUserRejectProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"JCUserReject.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }


    editRecord = (id: string) => {
	//	
	//history.push('/JCUserRejecEdit', { id: id });
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
        console.log('this.props.pId=' + this.props.pId);


        return (
            <React.Fragment>
                <div key={1}>

                    <ReactGrid
                        {...
                        {
                            title: 'JCUserReject.Grid',
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
                            isLoading: this.props.isLoading

                        }}
                    />


                </div>
                <div key={84}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "JCUserReject.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "asset" ?
                                    <JCUserRejectAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    : this.props.typeForm === "jobcard" ?
                                        <JCUserRejectJobcardEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                        : <JCUserRejectEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                            }

                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.jcuserreject,
    JCUserRejectStore.actionCreators
)(JCUserReject as any);

class JCUserRejectClass extends JCUserReject {
}

export const JCUserRejectAsset = connect(
    (state: ApplicationState) => state.jcuserrejectasset,
    JCUserRejectAssetStore.actionCreators
)(JCUserRejectClass as any);

class JCUserRejectJobCardClass extends JCUserReject {
}

export const JCUserRejectJobcard = connect(
    (state: ApplicationState) => state.jcuserrejectjobcard,
    JCUserRejectJobcardStore.actionCreators
)(JCUserRejectJobCardClass as any);