import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as LoginHistoryStore from "../../../../store/LoginHistory";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwLoginHistory, columnStructure } from "../../../../model/viewModel/VwLoginHistory";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs from "../../../../components/TTabs";
import { Directions } from "../../../../model/general";
import DateTime from "../../../../components/DateTime";

type LoginHistoryProps = stateBase<VwLoginHistory> &
  typeof LoginHistoryStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm: string;
  };
class LoginHistoryEdit extends React.PureComponent<LoginHistoryProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwLoginHistory;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    this.props.closeModal();
  };

  public render() {
    console.log("this.props.edit=" + this.props.edit);

    const columnStructure2 = [
      { key: "document", name: "document" },
    ];
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
            <Col md={12} className={"form-container"+Rtl} >
              <Col md={12} className="T-header">
                <TTitle {...{ name: "LoginHistory.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "LoginHistory.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    {/* <SelectList {...{ label: "Department name", valueId: this.props.edit.depId, valueName: this.props.edit.depSign, name: "User.EditForm.DepId", entityName: "departmentsl" }} /> */}
                    <SelectList
                      {...{
                        label: "User name",
                        valueId: this.props.edit.userId,
                        valueName: this.props.edit.username,
                        name: "LoginHistory.EditForm.UserId",
                        entityName: "usersl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.Browser",
                        type: typeComponent.text,
                        value: this.props.edit.browser,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.OS",
                        type: typeComponent.text,
                        value: this.props.edit.os,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.LoginIP",
                        type: typeComponent.text,
                        value: this.props.edit.loginIp,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <DateTime
                      {...{
                        name: "LoginHistory.EditForm.LoginTime",
                        value: this.props.edit.loginTime,
                        datepicker: false,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.Version",
                        type: typeComponent.text,
                        value: this.props.edit.version,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "LoginHistory.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
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
                        name: "LoginHistory.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "LoginHistory.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "LoginHistory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "LoginHistory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "LoginHistory.EditForm.BTN_Back",
                        variant: "outline-info",
                        submit: this.gotoBackPage,
                      }}
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <hr></hr>
          {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure2,
                editId: this.props.edit.id,
                defaultKey: columnStructure[0].key,
                typeForm: "loginHistory",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.loginhistory, // Selects which state properties are merged into the component's props
  LoginHistoryStore.actionCreators // Selects which action creators are merged into the component's props
)(LoginHistoryEdit as any);
