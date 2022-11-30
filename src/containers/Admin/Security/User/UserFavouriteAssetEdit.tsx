import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as UserFavouriteAssetStore from "../../../../store/UserFavouriteAsset";
import * as UserFavouriteAssetForAssetStore from "../../../../store/UserFavouriteAssetForAsset";
import * as UserFavouriteAssetUserStore from "../../../../store/UserFavouriteAssetUser";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwUserFavouriteAsset } from "../../../../model/viewModel/VwUserFavouriteAsset";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import { Directions } from "../../../../model/general";

type UserFavouriteAssetProps = stateBase<VwUserFavouriteAsset> &
  typeof UserFavouriteAssetStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm: string;
  };
class UserFavouriteAssetEdit extends React.PureComponent<UserFavouriteAssetProps> {
  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwUserFavouriteAsset;
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
    const columnStructure2 = [
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
              <Form>
                <InputBox
                  {...{
                    name: "UserFavouriteAsset.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                {this.props.typeForm === "asset" ? (
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "UserId name",
                        valueId: this.props.edit.userId,
                        valueName: this.props.edit.favUser,
                        name: "UserFavouriteAsset.EditForm.UserId",
                        entityName: "usersl",
                      }}
                    />
                    <InputBox
                      {...{
                        name: "UserFavouriteAsset.EditForm.AssetId",
                        type: typeComponent.hidden,
                        value: this.props.edit.assetId
                          ? this.props.edit.assetId
                          : this.props.edit.parentId,
                      }}
                    />
                  </Col>
                ) : this.props.typeForm === "user" ? (
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "AssetId name",
                        valueId: this.props.edit.assetId,
                        valueName: this.props.edit.productSign,
                        name: "UserFavouriteAsset.EditForm.AssetId",
                        entityName: "assetsl",
                      }}
                    />
                    <InputBox
                      {...{
                        name: "UserFavouriteAsset.EditForm.UserId",
                        type: typeComponent.hidden,
                        value: this.props.edit.userId
                          ? this.props.edit.userId
                          : this.props.edit.parentId,
                      }}
                    />
                  </Col>
                ) : (
                  <Row>
                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "UserId name",
                          valueId: this.props.edit.userId,
                          valueName: this.props.edit.favUser,
                          name: "UserFavouriteAsset.EditForm.UserId",
                          entityName: "usersl",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "AssetId name",
                          valueId: this.props.edit.assetId,
                          valueName: this.props.edit.productSign,
                          name: "UserFavouriteAsset.EditForm.AssetId",
                          entityName: "assetsl",
                        }}
                      />
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFavouriteAsset.EditForm.Description",
                        type: typeComponent.text,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "UserFavouriteAsset.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
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
                        name: "UserFavouriteAsset.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "UserFavouriteAsset.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "UserFavouriteAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "UserFavouriteAsset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "UserFavouriteAsset.EditForm.BTN_Back",
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
          {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure2,
                editId: this.props.edit.id,
                defaultKey: "userfavourieasset",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.userfavouriteasset,
  UserFavouriteAssetStore.actionCreators
)(UserFavouriteAssetEdit as any);

class UserFavouriteAssetEditClass extends UserFavouriteAssetEdit {}

export const UserFavouriteAssetForAssetEdit = connect(
  (state: ApplicationState) => state.userfavouriteassetforasset,
  UserFavouriteAssetForAssetStore.actionCreators
)(UserFavouriteAssetEditClass as any);

class UserFavouriteAssetUserEditClass extends UserFavouriteAssetEdit {}

export const UserFavouriteAssetUserEdit = connect(
  (state: ApplicationState) => state.userfavouriteassetuser,
  UserFavouriteAssetUserStore.actionCreators
)(UserFavouriteAssetUserEditClass as any);
