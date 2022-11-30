import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from "../../../../components/ReactGrid";
import { stateBase } from '../../../../model/general/stateBase';
import * as BrandStore from '../../../../store/Brand';
import * as BrandSLStore from '../../../../store/BrandSL';
import { VwBrand, columnStructure } from '../../../../model/viewModel/VwBrand';
import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import BrandEdit from './BrandEdit';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';



type BrandProps =
    stateBase<VwBrand> &
    typeof BrandStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string, noselectId: string, isload: boolean };

class Brand extends React.PureComponent<BrandProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"brand.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                        {...{
                            title: 'Brand.Grid',
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
                            internalLoading: this.props.isLoading,
                            sort: this.props.sort,
                        }}
                    />
                </div>
                <div key={2}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "ProductLang.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <BrandEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.brands,
    BrandStore.actionCreators
)(Brand as any);



class BrandSLClass extends Brand {
}

export const BrandSelect = connect(
    (state: ApplicationState) => state.brandssl,
    BrandSLStore.actionCreators
)(BrandSLClass as any);
