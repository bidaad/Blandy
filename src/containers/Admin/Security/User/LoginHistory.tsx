import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from "../../../../components/ReactGrid";
import * as LoginHistoryStore from '../../../../store/LoginHistory';
import {  columnStructure } from '../../../../model/viewModel/VwLoginHistory';
import { stateBase } from '../../../../model/general/stateBase';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
import { KnownEntities } from '../../../../model/general/entityBase';
import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Directions } from '../../../../model/general';
import { VwLoginHistory } from '../../../../model/viewModel/VwLoginHistory';
import LoginHistoryEdit from './LoginHistoryEdit';



type LoginHistoryProps =
    stateBase<VwLoginHistory> &
    typeof LoginHistoryStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, RefreshTab: boolean, selectRecord: any, valuefiltersl: string, noselectId: string };

class LoginHistory extends React.PureComponent<LoginHistoryProps, { showModal: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false,
        }
    }

    private ensureDataFetched() {
        this.getData(1, 10, '')

    }

    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched();
    }

    getData = (pageNo: number, pageSize: number, filter: string, sort?: string, sortKey?: string) => {

        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm: AdminModelRequest = { pageNo: pageNo, pageSize: pageSize, filter: filter, resourceName: "LoginHistory.Menu", isSelected: isSelected, sort: sort, sortKey: sortKey, parentId: this.props.pId, filtersl: this.props.valuefiltersl, noselectId: this.props.noselectId };
        this.props.requestList(rm);

    }
    handleClose = () => {
        console.log('modal closed');

        this.setState({ showModal: false })
    }


    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    refreshGrid = () => {
        // this.getData(1, 10, '',undefined,undefined)
    }

    editRecord = (id: string) => {
        this.setState({ showModal: true })
        this.props.editData(id);

    }
    newRecord = () => {
        this.props.ChangeTab('', 'LoginHistory', 'LoginHistoryEdit');
        this.props.editData();
    }
    selectRecord = (id: string, selectedColumns: string) => {
        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
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
                        {...{
                            title: 'LoginHistory.Grid',
                            columns: columnStructure,
                            editable: true,
                            data: this.props.models,
                            count: this.props.count,
                            getData: this.getData,

                            deleteRecord: this.deleteRecord,
                            filter: this.props.filter,
                            editRecord: this.editRecord,
                            selectRecord: this.selectRecord,
                            isSelected: this.props.isSelected,
                            pageSize: this.props.pageSize,
                            newRecord: this.newRecord,
                        }}
                    />
                </div>
                <div>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "LoginHistory.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <LoginHistoryEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                        </Modal.Body>
                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.loginhistory,
    LoginHistoryStore.actionCreators
)(LoginHistory as any);



