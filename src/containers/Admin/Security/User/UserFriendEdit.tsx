import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as UserFriendStore from "../../../../store/UserFriend";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwUserFriend } from "../../../../model/viewModel/VwUserFriend";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import { Directions } from "../../../../model/general";

type UserFriendProps = stateBase<VwUserFriend> &
  typeof UserFriendStore.actionCreators &
  RouteComponentProps<{}>;
class UserFriendEdit extends React.PureComponent<UserFriendProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwUserFriend;
    this.props.saveData(senddata);
  }

  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    const { history } = this.props;
    history.goBack();
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
              {/* <Col md={12} className="T-header">
                <TTitle {...{ name: "UserFriend.EditForm" }} />
              </Col> */}
              <Form>
                <InputBox
                  {...{
                    name: "UserFriend.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <InputBox
                  {...{
                    name: "UserFriend.EditForm.UserId",
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
                        label: "FriendId name",
                        valueId: this.props.edit.friendNikName,
                        valueName: this.props.edit.friendNikName,
                        name: "UserFriend.EditForm.FriendId",
                        entityName: "usersl",
                      }}
                    />
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFriend.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFriend.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "UserFriend.EditForm.BTN_Save",
                        submit: this.handleSubmit,
                      }}
                    />
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "UserFriend.EditForm.BTN_Back",
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
  (state: ApplicationState) => state.userfriend,
  UserFriendStore.actionCreators
)(UserFriendEdit as any);
