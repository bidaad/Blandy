import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as GuaranteeStore from '../../../store/Guarantee';
import * as GuaranteeDepStore from '../../../store/GuaranteeDep';
import * as GuaranteeAssetStore from '../../../store/GuaranteeAsset';
import { VwGuarantee, columnStructure } from '../../../model/viewModel/VwGuarantee';

import { Modal } from 'react-bootstrap';
import TTitle from '../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import GuaranteeEdit, { GuaranteeDepEdit, GuaranteeAssetEdit } from './GuaranteeEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';

type GuaranteeProps =
    stateBase<VwGuarantee> &
    typeof GuaranteeStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };

class Guarantee extends React.PureComponent<GuaranteeProps, { showModal: boolean }> {
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
        console.log('TF',this.props.typeForm)
        this.props.checkSecurity(this.props.history);
        this.refreshGrid(this.props.pId)
    }

    getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Guarantee.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'Guarantee.Grid',
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
                <div key={268}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Guarantee.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>

                            {
                                this.props.typeForm === "dep" ?
                                    <GuaranteeDepEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :this.props.typeForm === "asset" ?
                                     <GuaranteeAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :<GuaranteeEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />

                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.guarantee,
    GuaranteeStore.actionCreators
)(Guarantee as any);
 

class GuaranteeClass extends Guarantee {
}

export const GuaranteeDep = connect(
    (state: ApplicationState) => state.guaranteedep,
    GuaranteeDepStore.actionCreators
)(GuaranteeClass as any);

class GuaranteeAssetClass extends Guarantee {
}

export const GuaranteeAsset = connect(
    (state: ApplicationState) => state.guaranteeasset,
    GuaranteeAssetStore.actionCreators
)(GuaranteeAssetClass as any);