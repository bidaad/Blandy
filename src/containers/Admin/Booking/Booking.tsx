import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as BookingStore from '../../../store/Booking';
import * as BookingSLStore from '../../../store/BookingSL';
import * as BookingForAssetStore from '../../../store/BookingForAsset';
import { VwBooking, columnStructure } from '../../../model/viewModel/VwBooking';

import Modal from 'react-bootstrap/Modal';
import TTitle from '../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import BookingEdit, { BookingForAssetEdit } from './BookingEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';

type BookingProps =
    stateBase<VwBooking> &
    typeof BookingStore.actionCreators &
    RouteComponentProps<{}> &
        {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };

class Booking extends React.PureComponent<BookingProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"Booking.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'Booking.Grid',
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
                                <TTitle {...{ name: "Guarantee.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>

                            {
                                this.props.typeForm === "asset" ?
                                    <BookingForAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    :
                                    <BookingEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />

                            }
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.booking,
    BookingStore.actionCreators
)(Booking as any);


class BookingClass extends Booking {
}

export const BookingForAsset = connect(
    (state: ApplicationState) => state.bookingforasset,
    BookingForAssetStore.actionCreators
)(BookingClass as any);


class BookingSLClass extends Booking {
}

export const BookingSelect = connect(
    (state: ApplicationState) => state.bookingsl,
    BookingSLStore.actionCreators
)(BookingSLClass as any);