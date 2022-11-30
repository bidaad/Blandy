import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as RolePermissionStore from '../../../../store/RolePermission';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwRolePermission } from '../../../../model/viewModel/VwRolePermission';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';

type RolePermissionProps =
    stateBase<VwRolePermission> &
    typeof RolePermissionStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class RolePermissionEdit extends React.PureComponent<RolePermissionProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {

    }
    componentDidUpdate(props: any) {

    }
    handleSubmit(event: any) {
        
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwRolePermission;
        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata);
            this.props.closeModal();
        }
        // this.props.saveData(senddata);
        // //this.props.closeModal();
        // this.props.refreshGrid(this.props.parentId);
    }
    handleChildsSubmit = (event: any) => {
        
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwRolePermission;
        this.props.saveChilds(senddata);
        this.props.closeModal();
        this.props.refreshGrid(this.props.parentId);
    }
    handleDeleteChilds = (event: any) => {
        
        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwRolePermission;
        this.props.DeleteChilds(senddata);
        this.props.closeModal();
        this.props.refreshGrid(this.props.parentId);
    }
    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        this.props.closeModal();
    }

    public render() {
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        return (
            <React.Fragment>

                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'RolePermission.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'RolePermission.EditForm.resourceId', type: typeComponent.hidden, value:this.props.edit.resourceId?this.props.edit.resourceId: this.props.edit.parentId }} />
                                <InputBox {...{ name: 'RolePermission.EditForm.permissionId', type: typeComponent.hidden, value: this.props.edit.permissionId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCActionType", action: "GetHCList", selectName: "sign", valueId: this.props.edit.actionTypeId , name: "RolePermission.EditForm.actionTypeId", valueName: this.props.edit.actionTypeName }} />
                                    </Col>

                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "RolePermission", action: "GetHCRoleList", selectName: "sign", valueId: this.props.edit.roleId, name: "RolePermission.EditForm.roleId", valueName: this.props.edit.roleName }} />
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'RolePermission.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "RolePermission.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "RolePermission.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "RolePermission.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "RolePermission.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={3} >
                                        <TButton {...{ name: "RolePermission.EditForm.BTN_Child", submit: this.handleChildsSubmit }} />
                                    </Col>
                                    <Col md={3} >
                                        <TButton {...{ name: "RolePermission.EditForm.BTN_DeleteChild", variant: "outline-danger", submit: this.handleDeleteChilds }} />
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "RolePermission.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.rolepermissions,
    RolePermissionStore.actionCreators
)(RolePermissionEdit as any);