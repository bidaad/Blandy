import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from '../../../../components/ReactGrid';
import { stateBase } from '../../../../model/general/stateBase';
import * as DepartmentDepTypeStore from '../../../../store/DepartmentDepType';
import { VwDepartmentDepType, columnStructure } from '../../../../model/viewModel/VwDepartmentDepType';
import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import DepartmentDepTypeEdit from './DepartmentDepTypeEdit';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
//var CSSTransitionGroup = require('react-transition-group/CSSTransition')


type DepartmentDepTypeProps =
    stateBase<VwDepartmentDepType> &
    typeof DepartmentDepTypeStore.actionCreators &
    RouteComponentProps<{}> &
        { pId: string, selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string, noselectId: string, isload: boolean, typeForm: string };

class DepartmentDepType extends React.PureComponent<DepartmentDepTypeProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"DepartmentDepType.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'DepartmentDepType.Grid',
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
                <div key={2}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "DepartmentDepType.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <DepartmentDepTypeEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.departmentdeptype,
    DepartmentDepTypeStore.actionCreators
)(DepartmentDepType as any);

