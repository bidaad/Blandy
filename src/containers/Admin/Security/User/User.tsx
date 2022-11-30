import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from "../../../../components/ReactGrid";
import * as UserStore from '../../../../store/User';
import * as UserSLStore from '../../../../store/UserSL';
import { VwUser, columnStructure } from '../../../../model/viewModel/VwUser';
import { stateBase } from '../../../../model/general/stateBase';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
import { KnownEntities } from '../../../../model/general/entityBase';
import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import UserEdit from './UserEdit';
import { Directions } from '../../../../model/general';



type UserProps =
    stateBase<VwUser> &
    typeof UserStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, RefreshTab: boolean, selectRecord: any, valuefiltersl: string, noselectId: string };

class User extends React.PureComponent<UserProps, { showModal: boolean }> {
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
        const rm: AdminModelRequest = { pageNo: pageNo, pageSize: pageSize, filter: filter, resourceName: "User.Menu", isSelected: isSelected, sort: sort, sortKey: sortKey, parentId: this.props.pId, filtersl: this.props.valuefiltersl, noselectId: this.props.noselectId };
        this.props.requestList(rm);

    }
    handleClose = () => {
        console.log('modal closed');

        this.setState({ showModal: false })
    }


    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    refreshGrid = (parentId: string) => {
        // this.getData(1, 10, '',undefined,undefined)
    }

    editRecord = (id: string) => {
        this.setState({ showModal: true })
        this.props.editData(id);

    }
    newRecord = () => {
        
        this.props.ChangeTab('', 'User', 'UserEdit');
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
                            title: 'User.Grid',
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
                                <TTitle {...{ name: "Asset.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <UserEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                        </Modal.Body>
                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.users,
    UserStore.actionCreators
)(User as any);


class UserSLClass extends User {
}

export const UserSelect = connect(
    (state: ApplicationState) => state.userssl,
    UserSLStore.actionCreators
)(UserSLClass as any);
