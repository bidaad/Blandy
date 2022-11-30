import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as JCEffectOnAssetStore from '../../../store/JCEffectOnAsset';
import * as JCEffectOnAssetForAssetStore from '../../../store/JCEffectOnAssetForAsset';
import * as JCEffectOnAssetForJobCardStore from '../../../store/JCEffectOnAssetForJobCard';
import { VwJCEffectOnAsset, columnStructure } from '../../../model/viewModel/VwJCEffectOnAsset';
import { Modal } from 'react-bootstrap';
import JCEffectOnAssetEdit, { JCEffectOnAssetForAssetEdit, JCEffectOnAssetForJobCardEdit } from './JCEffectOnAssetEdit';
import { Directions } from '../../../model/general';
import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import TTitle from '../../../components/TTitle';



type JCEffectOnAssetProps =
    stateBase<VwJCEffectOnAsset> &
    typeof JCEffectOnAssetStore.actionCreators &
    RouteComponentProps<{}> &
        {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };


class JCEffectOnAsset extends React.PureComponent<JCEffectOnAssetProps, { showModal: boolean }> {
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
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"JCEffectOnAsset.Grid",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }


    editRecord = (id: string) => {
	//	
	//history.push('/JCEffectOnAsseEdit', { id: id });
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
        let Rtl = "Rtl";
        if (this.props.dir === Directions.RTL) {
            Rtl = "Rtl";
        }

        if (this.props.dir === Directions.LTR) {
            Rtl = "Ltr";
        }

        return (
            <React.Fragment>
                <div key={1}>

                    <ReactGrid
                        {...
                        {
                            title: 'JCEffectOnAsset.Grid',
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

                <div key={9874}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "JCEffectOnAsset.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.typeForm === "asset" ?
                                    <JCEffectOnAssetForAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                    : this.props.typeForm === "jobcard" ?
                                        <JCEffectOnAssetForJobCardEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                                        : <JCEffectOnAssetEdit {...{ closeModal: this.handleClose, refreshGrid: this.refreshGrid, parentId: this.props.parentId, typeForm: this.props.typeForm }} />
                            }

                        </Modal.Body>

                    </Modal>
                </div>
            </React.Fragment>

        );
    }
};


export default connect(
    (state: ApplicationState) => state.jceffectonasset,
    JCEffectOnAssetStore.actionCreators
)(JCEffectOnAsset as any);

class JCEffectOnAssetClass extends JCEffectOnAsset {
}

export const JCEffectOnAssetForAsset = connect(
    (state: ApplicationState) => state.jceffectonassetforasset,
    JCEffectOnAssetForAssetStore.actionCreators
)(JCEffectOnAssetClass as any);

class JCEffectOnAssetForJobCardClass extends JCEffectOnAsset {
}

export const JCEffectOnAssetForJobCard = connect(
    (state: ApplicationState) => state.jceffectonassetforjobcard,
    JCEffectOnAssetForJobCardStore.actionCreators
)(JCEffectOnAssetForJobCardClass as any);

