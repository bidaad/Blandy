import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as JobCardStore from '../../../store/JobCard';
import * as JobCardSLStore from '../../../store/JobCardSL';
import { VwJobCard, columnStructure } from '../../../model/viewModel/VwJobCard';

import { Modal } from 'react-bootstrap';
import TTitle from '../../../components/TTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import JobCardEdit from './JobCardEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { KnownEntities } from '../../../model/general/entityBase';
//var CSSTransitionGroup = require('react-transition-group/CSSTransition')


type JobCardProps =
    stateBase<VwJobCard> &
    typeof JobCardStore.actionCreators &
    RouteComponentProps<{}> &
    { pId: string, isSelected?: boolean, folderName?: KnownEntities, typeForm: string, selectRecord: any, valuefiltersl: string, noselectId: string, };

class JobCard extends React.PureComponent<JobCardProps, { showModal: boolean }> {

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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"JobCard.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
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
                            title: 'JobCard.Grid',
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
                                <TTitle {...{ name: "JobCard.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <JobCardEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.jobcard,
    JobCardStore.actionCreators
)(JobCard as any);


class JobCardSLClass extends JobCard {
}

export const JobCardSelect = connect(
    (state: ApplicationState) => state.jobcardsl,
    JobCardSLStore.actionCreators
)(JobCardSLClass as any);
