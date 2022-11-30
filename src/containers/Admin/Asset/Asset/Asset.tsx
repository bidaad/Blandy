import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from "../../../../components/ReactGrid";
import { stateBase } from '../../../../model/general/stateBase';
import * as AssetStore from '../../../../store/Asset';
import * as AssetSLStore from '../../../../store/AssetSL';
import * as AssetDepStore from '../../../../store/AssetDep';
import * as AssetPersonStore from '../../../../store/AssetPerson';
import { VwAsset, columnStructure } from '../../../../model/viewModel/VwAsset';
import { KnownEntities } from '../../../../model/general/entityBase';
import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import AssetEdit, { AssetEditDep, AssetPersonEdit } from './AssetEdit';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';


type AssetProps =
    stateBase<VwAsset> &
    typeof AssetStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, RefreshTab: boolean, selectRecord: any, valuefiltersl: string,noselectId:string  };

    
class Asset extends React.PureComponent<AssetProps, { showModal: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false,
        }
    }
    private ensureDataFetched() {
        this.getData(1, 10, '')

    }
    // componentDidUpdate(prevProps: any) {
    //     if (prevProps.RefreshTab !== this.props.RefreshTab) {
    //         setTimeout(()=>{
    //             this.getData(1, 10, '')

    //         },2000)
    //     }
    // }
    componentDidMount() {
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched();
    }

    getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
        console.log('asset getData');
        
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Asset.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {

        // if (this.props.isTabDetail) {

        // }
        // else {
        //     this.props.ChangeTab('', 'Asset', 'AssetEdit');

        // }
        this.setState({ showModal: true })
        this.props.editData(id);



    }
    newRecord = () => {

        this.setState({ showModal: true })
        this.props.newData(this.props.id);
        // if (this.props.isTabDetail) {

        // }
        // else {
        //     this.props.ChangeTab('', 'Asset', 'AssetEdit');

        // }
        this.props.editData();
    } 
    selectRecord = (id: string, selectedColumns: string) => {

        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
    }
    handleClose = () => 
    {
        console.log('modal closed');
        
        this.setState({ showModal: false })
    }
    refreshGrid = () => {
        // this.getData(1, 10, '',undefined,undefined)
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
                            title: 'Asset.Grid',
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
                            pageNo: this.props.pageNo,
                            newRecord: this.newRecord,
                            internalLoading: this.props.isLoading,
                            sort: this.props.sort,
                        }}
                    />
                </div>
                <div key={26666666}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Asset.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "dep" ?
                                    <AssetEditDep {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :this.props.typeForm === "person" ?
                                    <AssetPersonEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :
                                    <AssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />

                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.assets,
    AssetStore.actionCreators
)(Asset as any);


class AssetDepClass extends Asset {
}

export const AssetDep = connect(
    (state: ApplicationState) => state.assetdep,
    AssetDepStore.actionCreators
)(AssetDepClass as any);

class AssetPersonClass extends Asset {
}

export const AssetPerson = connect(
    (state: ApplicationState) => state.assetperson,
    AssetPersonStore.actionCreators
)(AssetPersonClass as any);

class AssetSLClass extends Asset {
}

export const AssetSelect = connect(
    (state: ApplicationState) => state.assetssl,
    AssetSLStore.actionCreators
)(AssetSLClass as any);