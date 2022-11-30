import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as UserInfoStore from "../store/UserInfo";
import { Message, MessageTypes } from "../model/general";
import { Row } from "reactstrap";
import { Col } from "react-bootstrap";

type MsgBoxProps = UserInfoStore.UserInfoState &
  typeof UserInfoStore.actionCreators;

class MsgBox extends React.PureComponent<MsgBoxProps> {
  // constructor(props: any) {
  //   super(props);
  // }
  closeClick = (e: any) => {
    this.props.emptyMessages();
    // e.preventDefault();
    // $(e.currentTarget).closest('div').hide();
  };
  public render() {
    let classmessage = "msgRight";
    if (this.props.dir === 2) {
      classmessage = "msg";
    }

    if (this.props.messages === undefined) return null;

    return (
      <Row>
        <Col md={12}>
          {this.props.messages.map((m: Message) => {
            var alertClass = "alert-success";
            switch (m.msgType) {
              case MessageTypes.Error:
                alertClass = "alert-danger";
                break;
              case MessageTypes.Warning:
                alertClass = "alert-warning";
                break;
              case MessageTypes.Success:
                alertClass = "alert-info";
                break;

              default:
                break;
            }
            return (
              <div key={1} className="messages">
                <div
                  onClick={this.closeClick}
                  key={m.msg}
                  className={
                    "alert " +
                    alertClass +
                    " alert-dismissible msgAnimate " +
                    classmessage
                  }
                >
                  <p className="labelClose">{m.msg}</p>
                  <div
                    style={{ left: "0 !important" }}
                    onClick={this.closeClick}
                    className="close"
                  >
                    &times;
                  </div>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo, // Selects which state properties are merged into the component's props
  UserInfoStore.actionCreators // Selects which action creators are merged into the component's props
)(MsgBox as any);
