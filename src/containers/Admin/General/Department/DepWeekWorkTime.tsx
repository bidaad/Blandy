import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import ReactGrid from '../../../../components/ReactGrid';
import { stateBase } from '../../../../model/general/stateBase';
import * as DepWeekWorkTimeStore from '../../../../store/DepWeekWorkTime';
import { VwDepWeekWorkTime, columnStructure } from '../../../../model/viewModel/VwDepWeekWorkTime';
import { Modal } from 'react-bootstrap';
import DepWeekWorkTimeEdit from './DepWeekWorkTimeEdit';
import { Directions } from '../../../../model/general';
import { AdminModelRequest } from '../../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../../components/TTitle';


type DepWeekWorkTimeProps =
    stateBase<VwDepWeekWorkTime> &
    typeof DepWeekWorkTimeStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };


class DepWeekWorkTime extends React.PureComponent<DepWeekWorkTimeProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"DepWeekWorkTime.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }
    

    editRecord = (id: string) => {
        	
	//history.push('/DepWeekWorkTimeEdit', { id: id });
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
                                title: 'DepWeekWorkTime.Grid',
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
                    

                </div>
                <div key={2}>
                    <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "DepWeekWorkTime.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <DepWeekWorkTimeEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId }} />
                        </Modal.Body>
                        
                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.depweekworktime,
    DepWeekWorkTimeStore.actionCreators
)(DepWeekWorkTime as any);

