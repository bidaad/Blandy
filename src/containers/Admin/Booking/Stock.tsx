import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as StockStore from '../../../store/Stock';
import { VwStock, columnStructure } from '../../../model/viewModel/VwStock';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TTitle from '../../../components/TTitle';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import StockEdit from './StockEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';

type StockProps =
    stateBase<VwStock> &
    typeof StockStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };

class Stock extends React.PureComponent<StockProps,{ showModal: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    private ensureDataFetched(pageNo: number) {
        this.getData(1, 10, '')

    }

    componentDidMount() {
        console.log('stock didmount');
        
//        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched(1);
    }
    refreshGrid = (parentId: string) => {
        this.getData(1, 10, '')
    }

        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Stock.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
        // if (this.props.selectRecord !== undefined)
        //     this.props.selectRecord(id, selectedColumns);
    }
    handleClose = () => {
        this.setState({ showModal: false })
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
                            title: 'Stock.Grid',
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
                <div key={98}>
                        <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                            <Modal.Header >
                                <Modal.Title>
                                    <TTitle {...{name:"Pricing.EditForm"}}/>
                                    </Modal.Title>
                                <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                            </Modal.Header>
                            <Modal.Body>
                                 <StockEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                            </Modal.Body>
                            {/* <Modal.Footer>
                                </Modal.Footer> */}
                        </Modal>
                    </div>
               
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.stock,
    StockStore.actionCreators
)(Stock as any);

