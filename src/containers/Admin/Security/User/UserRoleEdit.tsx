import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as UserRoleStore from '../../../../store/UserRole';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwUserRole } from '../../../../model/viewModel/VwUserRole';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';

type UserRoleProps =
    stateBase<VwUserRole> &
    typeof UserRoleStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class UserRoleEdit extends React.PureComponent<UserRoleProps> {
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
        const senddata = convertToObject(sdata) as VwUserRole;
        this.props.saveData(senddata);
        //this.props.closeModal();
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
                                <InputBox {...{ name: 'UserRole.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'UserRole.EditForm.userId', type: typeComponent.hidden, value: this.props.edit.userId?this.props.edit.userId:this.props.edit.parentId }} />
                                <Row>
                                    {/* <Col md={6}>
                                        <SelectList {...{ label: "User name", valueId: this.props.edit.userId, valueName: this.props.edit.userName, name: "UserRole.EditForm.userId", entityName: "user", noselectId: this.props.edit.id }} />
                                    </Col> */}

                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "RolePermission", action: "GetHCRoleList", selectName: "sign", valueId: this.props.edit.roleId, name: "UserRole.EditForm.roleId", valueName: this.props.edit.roleName }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserRole.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "UserRole.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "UserRole.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
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
                          name: "UserRole.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "UserRole.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "UserRole.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.userroles,
    UserRoleStore.actionCreators
)(UserRoleEdit as any);