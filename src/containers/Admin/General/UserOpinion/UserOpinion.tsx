import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from '../../../../components/ReactGrid';
import { stateBase } from '../../../../model/general/stateBase';
import * as UserOpinionStore from '../../../../store/UserOpinion';
import * as UserOpinionSLStore from '../../../../store/UserOpinionSL';
import * as UserOpinionAssetStore from '../../../../store/UserOpinionAsset';
import * as UserOpinionUserStore from '../../../../store/UserOpinionUser';
import { KnownEntities } from '../../../../model/general/entityBase';
import { Modal } from 'react-bootstrap';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
import { VwUserOpinion, columnStructure } from '../../../../model/viewModel/VwUserOpinion';
import UserOpinionEdit, { UserOpinionAssetEdit, UserOpinionUserEdit } from './UserOpinionEdit';

type UserOpinionProps =
    stateBase<VwUserOpinion> &
    typeof UserOpinionStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, selectRecord: any, valuefiltersl: string, noselectId: string, };

class UserOpinion extends React.PureComponent<UserOpinionProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"UserOpinion.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'UserOpinion.Grid',
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
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "UserOpinion.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {this.props.typeForm === "asset" ?
                                <UserOpinionAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                : this.props.typeForm === "user" ?
                                    <UserOpinionUserEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    : <UserOpinionEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.useropinion,
    UserOpinionStore.actionCreators
)(UserOpinion as any);


class UserOpinionAssetClass extends UserOpinion {
}

export const UserOpinionAsset = connect(
    (state: ApplicationState) => state.useropinionasset,
    UserOpinionAssetStore.actionCreators
)(UserOpinionAssetClass as any);


class UserOpinionUserClass extends UserOpinion {
}

export const UserOpinionUser = connect(
    (state: ApplicationState) => state.useropinionuser,
    UserOpinionUserStore.actionCreators
)(UserOpinionUserClass as any);



class UserOpinionSLClass extends UserOpinion {
}

export const UserOpinionSelect = connect(
    (state: ApplicationState) => state.useropinionsl,
    UserOpinionSLStore.actionCreators
)(UserOpinionSLClass as any);
