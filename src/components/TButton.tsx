import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";
import { ApplicationState } from "../store";
import * as UserInfo from "../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { VwPermisionResource } from "../model/viewModel/VwPermisionResource";
type btnVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-dark"
  | "outline-light";
type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> & {
    submit?: any;
    name: string;
    variant?: btnVariant;
    class?: string;
    isloading?: boolean;
  };
class TButton extends Component<InputProps> {
  render() {
    let disbaled = false;
    var vr: btnVariant | undefined;
    if (!this.props.variant) {
      vr = "primary";
    } else {
      vr = this.props.variant;
    }
    var myResource: VwPermisionResource | undefined;
    if (!this.props.name) {
      return null;
    }
    if (this.props.resources) {
      let Resources = this.props.resources as VwPermisionResource[];
      if (Resources) {
        myResource = Resources.find(
          (c) =>
            c.resourceCode === this.props.name.toString().toUpperCase() &&
            c.lang === this.props.lang.abr.toUpperCase()
        );
      }
    }
    if (myResource === undefined) {
      return null;
    } else {
      if (myResource) {
        if (myResource.actionTypes) {
          if (!myResource.actionTypes.toUpperCase().includes("V")) return null;
          if (!myResource.actionTypes.toUpperCase().includes("E"))
            disbaled = true;
        }
      }
    }
    return (
      <div>
        {this.props.isloading ? (
          <Button variant={vr} disabled className="btnLoadingAdmin">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button
            className={this.props.class ? this.props.class : ""}
            disabled={disbaled}
            onClick={this.props.submit}
            variant={vr}
            name={this.props.name}
          >
            {myResource.resourceLanguageName}
          </Button>
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(TButton as any);
