import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as AssignmentStore from '../../../../store/Assignment';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwAssignment } from '../../../../model/viewModel/VwAssignment';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import TAutoComplete from '../../../../components/TAutoComplete';
import DateTime from '../../../../components/DateTime';
import TTitle from '../../../../components/TTitle';
import TTabs, { ComponentColumns } from '../../../../components/TTabs';
import { Directions } from '../../../../model/general';


type AssignmentProps =
    stateBase<VwAssignment> & typeof AssignmentStore.actionCreators & RouteComponentProps<{}>;
class AssignmentEdit extends React.PureComponent<AssignmentProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwAssignment;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        //const { history } = this.props;
        // history.goBack();
        this.props.ChangeTab('','AssignmentEdit','Assignment');

    }

    public render() {
        const columnStructure = [
            { key: "assignmentdetail", name: "assignmentdetail" },
            { key: "document", name: "document" },
        ] as ComponentColumns[];

        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
          Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
          return null;
        }
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={12} className={"form-container" + Rtl}>
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "Assignment.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'Assignment.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "DepId name", valueId: this.props.edit.depId, valueName: this.props.edit.depSign, name: "Assignment.EditForm.DepId", entityName: "departmentsl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Assignment.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Assignment.EditForm.Sign', type: typeComponent.text, value: this.props.edit.sign }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{name:"Assignment.EditForm.Date",value:this.props.edit.date,timePicker:true}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCWHOperationType", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcwhoperationTypeId, name: "Assignment.EditForm.HCWHOperationTypeId", valueName: this.props.edit.whoperationTypeSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCWHOperationStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcwhoperationStatusId, name: "Assignment.EditForm.HCWHOperationStatusId", valueName: this.props.edit.whoperationStatusSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPriority", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcpriorityId, name: "Assignment.EditForm.HCPriorityId", valueName: this.props.edit.prioritySign }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "BookingId name", valueId: this.props.edit.bookingId, valueName: this.props.edit.bookingCode, name: "Assignment.EditForm.BookingId", entityName: "bookingsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Assignment.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Assignment.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>

                                <Row>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Assignment.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Assignment.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>
                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "Assignment.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Assignment.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "Assignment.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {this.props.edit.id !== '' ?
                        <TTabs {...{ component: columnStructure, editId: this.props.edit.id, defaultKey: "assignmentdetail" }} />
                        : null}

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.assignment,
    AssignmentStore.actionCreators
)(AssignmentEdit as any);