import React from "react";
import TreeView from "../../../../components/TreeView";
import * as ResourceStore from '../../../../store/TreeResource';
import { ApplicationState } from "../../../../store";
import { connect } from "react-redux";
import { stateBase } from "../../../../model/general/stateBase";
import { VwGetTreeResource } from "../../../../model/viewModel/VwGetTreeResource";
import { RouteComponentProps } from "react-router";
import TTitle from "../../../../components/TTitle";
import {  Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Directions } from "../../../../model/general";
import ResourceEdit from "./ResourceEdit";

type TreeResourceProps =
    stateBase<VwGetTreeResource> &
    typeof ResourceStore.actionCreators &
    RouteComponentProps<{}> &
     {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string  };

class TreeResource extends React.PureComponent<TreeResourceProps, { showModal: boolean,loading:boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            showModal: false,
            loading:false
        }
    }

    FillList = (data: any) => {
        this.props.fillResourceList(data, "Resource.EditForm");
    }
    EditDataHandler = (id: any) => {
        this.setState({loading:true});
        this.props.editDataFetch(id);
     setTimeout(() => {
        this.setState({
            showModal: true,
            loading:false
        })
     }, 2000);
    }
    NewData = (id: any) => {
        this.props.newData("");
        this.setState({
            showModal: true
        })
    }
    deleteRecord = (id: string) => {

        this.props.deleteRecord(id);
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
                {this.props.isEditLoad === true || this.state.loading===true ? 
                <div className="Rtl"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>
                    : <TreeView {...
                        {
                            Title: "resource.Grid",
                            controller: 'Resource',
                            action: 'GET_Tree_Resources',
                            columns: ['sign', 'code'],
                            FillList: this.FillList,
                            Edit: this.EditDataHandler,
                            New: this.NewData,
                            Delete: this.deleteRecord

                        }} />}

                <div key={2}>
                    <Modal size="xl" show={this.state.showModal} onHide={this.handleClose} className={Rtl}>
                        <Modal.Header >
                            <Modal.Title>
                                <TTitle {...{ name: "Resource.EditForm" }} />
                            </Modal.Title>
                            <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={this.handleClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <ResourceEdit {...{ closeModal: this.handleClose }} />
                        </Modal.Body>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.treeresources,
    ResourceStore.actionCreators
)(TreeResource as any);
