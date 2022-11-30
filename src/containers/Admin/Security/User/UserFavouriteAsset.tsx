import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from '../../../../components/ReactGrid';
import { stateBase } from '../../../../model/general/stateBase';
import * as UserFavouriteAssetStore from '../../../../store/UserFavouriteAsset';
import * as UserFavouriteAssetForAssetStore from '../../../../store/UserFavouriteAssetForAsset';
import * as UserFavouriteAssetUserStore from '../../../../store/UserFavouriteAssetUser';
import { VwUserFavouriteAsset, columnStructure } from '../../../../model/viewModel/VwUserFavouriteAsset';
import { Modal } from 'react-bootstrap';
import UserFavouriteAssetEdit, { UserFavouriteAssetUserEdit, UserFavouriteAssetForAssetEdit } from './UserFavouriteAssetEdit';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../../components/TTitle';


type UserFavouriteAssetProps =
    stateBase<VwUserFavouriteAsset> &
    typeof UserFavouriteAssetStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };


class UserFavouriteAsset extends React.PureComponent<UserFavouriteAssetProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"UserFavouriteAsset.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'UserFavouriteAsset.Grid',
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
                <div key={2}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "UserFavouriteAsset.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "user" ?
                                    <UserFavouriteAssetUserEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    : this.props.typeForm === "asset" ?
                                        <UserFavouriteAssetForAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                        :
                                        <UserFavouriteAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />

                            }

                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.userfavouriteasset,
    UserFavouriteAssetStore.actionCreators
)(UserFavouriteAsset as any);

class UserFavouriteAssetClass extends UserFavouriteAsset {
}

export const UserFavouriteAssetForAsset = connect(
    (state: ApplicationState) => state.userfavouriteassetforasset,
    UserFavouriteAssetForAssetStore.actionCreators
)(UserFavouriteAssetClass as any);

class UserFavouriteAssetUserClass extends UserFavouriteAsset {
}

export const UserFavouriteAssetUser = connect(
    (state: ApplicationState) => state.userfavouriteassetuser,
    UserFavouriteAssetUserStore.actionCreators
)(UserFavouriteAssetUserClass as any);

