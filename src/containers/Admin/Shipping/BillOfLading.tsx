import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as BillOfLadingStore from '../../../store/BillOfLading';
import * as BillOfLadingDepStore from '../../../store/BillOfLadingDep';
import { VwBillOfLading, columnStructure } from '../../../model/viewModel/VwBillOfLading';
import TTitle from '../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import BillOfLadingEdit, { BillOfLadingEditDep } from './BillOfLadingEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { KnownEntities } from '../../../model/general/entityBase';


type BillOfLadingProps =
    stateBase<VwBillOfLading> &
    typeof BillOfLadingStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, RefreshTab: boolean, selectRecord: any, valuefiltersl: string, noselectId: string };

class BillOfLading extends React.PureComponent<BillOfLadingProps, { showModal: boolean }> {

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

        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"BillOfLading.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'BillOfLading.Grid',
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
                        }
                        }

                    />
                </div>
                <div key={204}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "BillOfLading.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "dep" ?
                                    <BillOfLadingEditDep {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :
                                    <BillOfLadingEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />


                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.billoflading,
    BillOfLadingStore.actionCreators
)(BillOfLading as any);


class BillOfLadingClass extends BillOfLading {
}

export const BillOfLadingDep = connect(
    (state: ApplicationState) => state.billofladingdep,
    BillOfLadingDepStore.actionCreators
)(BillOfLadingClass as any);
