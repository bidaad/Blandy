import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as LoadDeliveryTTWeekDayStore from '../../../store/LoadDeliveryTTWeekDay';
import * as LoadDeliveryTTWeekDaySLStore from '../../../store/LoadDeliveryTTWeekDaySL';
import { VwLoadDeliveryTTWeekDay, columnStructure } from '../../../model/viewModel/VwLoadDeliveryTTWeekDay';
import { Modal } from 'react-bootstrap';
import LoadDeliveryTTWeekDayEdit from './LoadDeliveryTTWeekDayEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../components/TTitle';


type LoadDeliveryTTWeekDayProps =
    stateBase<VwLoadDeliveryTTWeekDay> &
    typeof LoadDeliveryTTWeekDayStore.actionCreators &
    RouteComponentProps<{}> &
{  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };


class LoadDeliveryTTWeekDay extends React.PureComponent<LoadDeliveryTTWeekDayProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"LoadDeliveryTTWeekDay.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }


    editRecord = (id: string) => {
        	
	//history.push('/LoadDeliveryTTWeekDayEdit', { id: id });
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
                    {this.props.isLoading === true ?
                        <ReactGrid
                            {...
                            {
                                title: 'LoadDeliveryTTWeekDay.Grid',
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

                            }}
                        />
                        : <div className="centered"><div className="spinner-grow text-warning" role="status"><span className="sr-only">Loading...</span></div></div>

                    }

                </div>
                <div key={2}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "LoadDeliveryTTWeekDay.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <LoadDeliveryTTWeekDayEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.loaddeliveryttweekday,
    LoadDeliveryTTWeekDayStore.actionCreators
)(LoadDeliveryTTWeekDay as any);

class LoadDeliveryTTWeekDaySLClass extends LoadDeliveryTTWeekDay {
}

export const LoadDeliveryTTWeekDaySelect = connect(
    (state: ApplicationState) => state.loaddeliveryttweekdaysl,
    LoadDeliveryTTWeekDaySLStore.actionCreators
)(LoadDeliveryTTWeekDaySLClass as any);
