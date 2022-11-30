import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as WorkOrderStore from '../../../store/WorkOrder';
import * as WorkOrderSLStore from '../../../store/WorkOrderSL';
import * as WorkOrderAssetStore from '../../../store/WorkOrderAsset';
import * as WorkOrderJobcardStore from '../../../store/WorkOrderJobcard';
import { VwWorkOrder, columnStructure } from '../../../model/viewModel/VwWorkOrder';

import { Modal } from 'react-bootstrap';
import TTitle from '../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import WorkOrderEdit, { WorkOrderAssetEdit, WorkOrderJobcardEdit } from './WorkOrderEdit';

type WorkOrderProps =
    stateBase<VwWorkOrder> &
    typeof WorkOrderStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, selectRecord: any, editable: boolean, isSelected?: boolean, typeForm: string, valuefiltersl: string, noselectId: string, isload: boolean };
class WorkOrder extends React.PureComponent<WorkOrderProps, { showModal: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false,
        }
    }

    private ensureDataFetched(pageNo: number) {
        this.getData(1, 10, '')

    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched(1);
    }

    getData = (pageNo: number, pageSize: number, filter: string, sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm: AdminModelRequest = { pageNo: pageNo, pageSize: pageSize, filter: filter, resourceName: "WorkOrder.Grid", isSelected: isSelected, sort: sort, sortKey: sortKey, parentId: this.props.pId, filtersl: this.props.valuefiltersl, noselectId: this.props.noselectId };
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {
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
    refreshGrid = (parentId: string) => {
        this.getData(1, 10, '')
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
                        {
                        ...{
                            title: 'WorkOrder.Grid',
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

                            isLoading: this.props.isLoading,
                        }
                        }

                    />
                </div>
                <div key={2}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Guarantee.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "asset" ?
                                    <WorkOrderAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    : this.props.typeForm === "jobcard" ?
                                        <WorkOrderJobcardEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                        : <WorkOrderEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.workorder,
    WorkOrderStore.actionCreators
)(WorkOrder as any);

class WorkOrderClass extends WorkOrder {
}

export const WorkOrderAsset = connect(
    (state: ApplicationState) => state.workorderasset,
    WorkOrderAssetStore.actionCreators
)(WorkOrderClass as any);

class WorkOrderJobcardClass extends WorkOrder {
}

export const WorkOrderJobcard = connect(
    (state: ApplicationState) => state.workorderjobcard,
    WorkOrderJobcardStore.actionCreators
)(WorkOrderJobcardClass as any);

class WorkOrderSLClass extends WorkOrder {
}

export const WorkOrderSelect = connect(
    (state: ApplicationState) => state.workordersl,
    WorkOrderSLStore.actionCreators
)(WorkOrderSLClass as any);