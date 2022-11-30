import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as UserStore from "../../../../store/User";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwUser, columnStructure } from "../../../../model/viewModel/VwUser";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TAutoComplete from "../../../../components/TAutoComplete";
import TTabs from "../../../../components/TTabs";
import { Directions } from "../../../../model/general";

type UserProps = stateBase<VwUser> &
  typeof UserStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm: string;
  };
class UserEdit extends React.PureComponent<UserProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwUser;
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
      { key: "userrole", name: "userrole" },
      { key: "userfavouriteassetuser", name: "userfavouriteasset" },
      { key: "userfavouritedep", name: "userfavouritedep" },
      { key: "useropinionuser", name: "useropinion" },
      { key: "userfriend", name: "userfriend" },
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
                <TTitle {...{ name: "User.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "User.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    {/* <SelectList {...{ label: "Department name", valueId: this.props.edit.depId, valueName: this.props.edit.depSign, name: "User.EditForm.DepId", entityName: "departmentsl" }} /> */}
                    <SelectList
                      {...{
                        label: "Department name",
                        valueId: this.props.edit.departmentId,
                        valueName: this.props.edit.depSign,
                        name: "User.EditForm.DepartmentId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Person name",
                        valueId: this.props.edit.personId,
                        valueName:
                          this.props.edit.firstName +
                          " " +
                          this.props.edit.lastName,
                        name: "User.EditForm.PersonId",
                        entityName: "personsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCUserType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcuserTypeId,
                        name: "User.EditForm.HCUserTypeId",
                        valueName: this.props.edit.userTypeSign,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "User.EditForm.Username",
                        type: typeComponent.text,
                        value: this.props.edit.username,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "User.EditForm.Password",
                        type: typeComponent.password,
                        value: "******",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "User.EditForm.NikName",
                        type: typeComponent.text,
                        value: this.props.edit.NikName,
                      }}
                    />
                  </Col>
                </Row>
                {/* <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "nameFa", valueId: this.props.edit.defaultLanguageId, name: "User.EditForm.DefaultLanguageId", valueName: this.props.edit.defLang }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCCurrency", action: "GetHCList", selectName: "sign", valueId: this.props.edit.defaultCurrencyId, name: "User.EditForm.DefaultCurrencyId", valueName: this.props.edit.currencySign }} />
                                    </Col>
                                </Row> */}
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "User.EditForm.mobile",
                        type: typeComponent.text,
                        value: this.props.edit.mobile,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "User.EditForm.email",
                        type: typeComponent.text,
                        value: this.props.edit.email,
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
                        name: "User.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "User.EditForm.updater",
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
                          name: "User.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "User.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "User.EditForm.BTN_Back",
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
                typeForm: "user",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.users, // Selects which state properties are merged into the component's props
  UserStore.actionCreators // Selects which action creators are merged into the component's props
)(UserEdit as any);
