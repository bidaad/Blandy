import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as UserFavouriteDepStore from "../../../../store/UserFavouriteDep";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwUserFavouriteDep } from "../../../../model/viewModel/VwUserFavouriteDep";
import { stateBase } from "../../../../model/general/stateBase";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import SelectList from "../../../../components/SelectList";
import { Directions } from "../../../../model/general";

type UserFavouriteDepProps = stateBase<VwUserFavouriteDep> &
  typeof UserFavouriteDepStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
  };
class UserFavouriteDepEdit extends React.PureComponent<UserFavouriteDepProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwUserFavouriteDep;
    if ((senddata as any).ID) {
      this.props.saveData(senddata);
    } else {
      this.props.saveData(senddata);
      this.props.closeModal();
    }
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
                <TTitle {...{ name: "UserFavouriteDep.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "UserFavouriteDep.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <InputBox
                  {...{
                    name: "UserFavouriteDep.EditForm.userId",
                    type: typeComponent.hidden,
                    value: this.props.edit.userId
                      ? this.props.edit.userId
                      : this.props.edit.parentId,
                  }}
                />
                <Row>
                <Col md={6}>
                    <SelectList
                      {...{
                        label: "DepId name",
                        valueId: this.props.edit.depId,
                        valueName: this.props.edit.depSign,
                        name: "UserFavouriteDep.EditForm.DepId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}></Col>

                </Row>
                <Row>
                  <Col md={12}>
                    <InputBox
                      {...{
                        name: "UserFavouriteDep.EditForm.UserComment",
                        type: typeComponent.textArea,
                        value: this.props.edit.userComment,
                      }}
                    />
                  </Col>
              
                </Row>
                <Row>
                <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFavouriteDep.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFavouriteDep.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>

                </Row>

                <Row className="mt-2">
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "UserFavouriteDep.EditForm.BTN_Save",
                        submit: this.handleSubmit,
                      }}
                    />
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "UserFavouriteDep.EditForm.BTN_Back",
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
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.userfavouritedep,
  UserFavouriteDepStore.actionCreators
)(UserFavouriteDepEdit as any);
