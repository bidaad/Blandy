import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as AssetStore from "../../../../store/Asset";
import * as AssetDepStore from "../../../../store/AssetDep";
import * as AssetPersonStore from "../../../../store/AssetPerson";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { stateBase } from "../../../../model/general/stateBase";
import TTitle from "../../../../components/TTitle";
import { VwAsset } from "../../../../model/viewModel/VwAsset";
import TAutoComplete from "../../../../components/TAutoComplete";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import DateTime from "../../../../components/DateTime";
import { Directions } from "../../../../model/general";

type AssetProps = stateBase<VwAsset> &
  typeof AssetStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm: string;
  };
// { parentId: string, typeForm?: string };
export class AssetEdit extends React.PureComponent<AssetProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwAsset;
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
    // const { history } = this.props;
    // history.goBack();
    // this.props.ChangeTab('','AssetEdit','Asset');
  };

  public render() {
    const columnStructure = [
      { key: "assetlang", name: "assetlang" },
      { key: "pricing", name: "pricing" },
      { key: "stock", name: "stock" },
      { key: "guaranteeasset", name: "guarantee" },
      { key: "assetoperstatus", name: "assetoperstatus" },
      { key: "assetattribute", name: "assetattribute" },
      { key: "assetdefect", name: "assetdefect" },
      { key: "assetusage", name: "assetusage" },
      { key: "userfavouriteassetforasset", name: "userfavouriteasset" },
      { key: "useropinionasset", name: "useropinion" },
      { key: "bookingforasset", name: "booking" },
      { key: "workorderasset", name: "workorder" },
      { key: "jceffectonassetforasset", name: "jceffectonasset" },
      { key: "jcuserrejectasset", name: "jcuserreject" },
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
        <Container className={"form-container" + Rtl}>
          <Row>
            <Col md={12} className={"form-container"+Rtl} >
              <Col md={12} className="T-header">
                <TTitle {...{ name: "Asset.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "Asset.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Product name",
                        valueId: this.props.edit.productId,
                        valueName: this.props.edit.productCode,
                        name: "Asset.EditForm.ProductId",
                        entityName: "productsl",
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.SerialNumberVIN",
                        type: typeComponent.text,
                        value: this.props.edit.serialNumberVin,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  {this.props.typeForm !== "dep" &&
                  this.props.typeForm !== "person" ? (
                    <Col md={6}>
                      <SelectList
                        {...{
                          label: "Person name",
                          valueId: this.props.edit.personId,
                          valueName: this.props.edit.personCode,
                          name: "Asset.EditForm.PersonId",
                          entityName: "personsl",
                        }}
                      />
                    </Col>
                  ) : null}
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Pelak1",
                        type: typeComponent.text,
                        value: this.props.edit.pelak1,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    {this.props.typeForm === "dep" ? (
                      <InputBox
                        {...{
                          name: "Asset.EditForm.DepartmentId",
                          type: typeComponent.hidden,
                          value: this.props.edit.departmentId
                            ? this.props.edit.departmentId
                            : this.props.parentId,
                        }}
                      />
                    ) : this.props.typeForm === "person" ? (
                      <InputBox
                        {...{
                          name: "Asset.EditForm.PersonId",
                          type: typeComponent.hidden,
                          value: this.props.edit.personId
                            ? this.props.edit.personId
                            : this.props.parentId,
                        }}
                      />
                    ) : (
                      <SelectList
                        {...{
                          label: "Department name",
                          valueId: this.props.edit.departmentId,
                          valueName: this.props.edit.departmentCode,
                          name: "Asset.EditForm.DepartmentId",
                          entityName: "departmentsl",
                        }}
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Pelak",
                        type: typeComponent.text,
                        value: this.props.edit.pelak,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Asset.EditForm.ManufactureDate",
                        value: this.props.edit.manufactureDate,
                        datepicker: false,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Pelak2",
                        type: typeComponent.text,
                        value: this.props.edit.pelak2,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DateTime
                      {...{
                        name: "Asset.EditForm.GuaranteeStartDate",
                        value: this.props.edit.guaranteeStartDate,
                        datepicker: false,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Pelak3",
                        type: typeComponent.text,
                        value: this.props.edit.pelak3,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Type",
                        type: typeComponent.text,
                        value: this.props.edit.type,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCAssetHealthStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcassetHealthStatusId,
                        name: "Asset.EditForm.HCAssetHealthStatusId",
                        valueName: this.props.edit.healthStatusSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.BarCode",
                        type: typeComponent.text,
                        value: this.props.edit.barCode,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HcassetQuality",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcassetQualityId,
                        name: "Asset.EditForm.HCAssetQualityId",
                        valueName: this.props.edit.qualitySign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.CurrentPrice",
                        type: typeComponent.number,
                        value: this.props.edit.currentPrice,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.PriceDifference",
                        type: typeComponent.number,
                        value: this.props.edit.priceDifference,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.PreviousPrice",
                        type: typeComponent.number,
                        value: this.props.edit.previousPrice,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.PercentDifference",
                        type: typeComponent.number,
                        value: this.props.edit.percentDifference,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.CurrentStock",
                        type: typeComponent.number,
                        value: this.props.edit.currentStock,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "Hcunit",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcunitId,
                        name: "Asset.EditForm.HCunitId",
                        valueName: this.props.edit.unitSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.TotalWeight",
                        type: typeComponent.number,
                        value: this.props.edit.totalWeight,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCAssetConfirmStatus",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcassetConfirmStatusId,
                        name: "Asset.EditForm.HCAssetConfirmStatusId",
                        valueName: this.props.edit.hcconfirmSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.AssetInPackage",
                        type: typeComponent.number,
                        value: this.props.edit.assetInPackage,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Package",
                        type: typeComponent.text,
                        value: this.props.edit.package,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Parent name",
                        valueId: this.props.edit.parentId,
                        valueName: this.props.edit.parentName,
                        name: "Asset.EditForm.ParentId",
                        entityName: "asset",
                        noselectId: this.props.edit.id,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCColor",
                        action: "HCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcColorId,
                        name: "Asset.EditForm.HCColorId",
                        valueName: this.props.edit.colorSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.PartNumber",
                        type: typeComponent.text,
                        value: this.props.edit.partNumber,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.Year",
                        type: typeComponent.text,
                        value: this.props.edit.year,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Asset.EditForm.IsActive",
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
                        name: "Asset.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Asset.EditForm.updator",
                        size: 6,
                        value: this.props.edit.updator,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "Asset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Asset.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Asset.EditForm.BTN_Back",
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
                component: columnStructure,
                editId: this.props.edit.id,
                defaultKey: columnStructure[0].key,
                typeForm: "asset",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.assets,
  AssetStore.actionCreators
)(AssetEdit as any);

class AssetEditDepClass extends AssetEdit {}
export const AssetEditDep = connect(
  (state: ApplicationState) => state.assetdep,
  AssetDepStore.actionCreators
)(AssetEditDepClass as any);

class AssetPersonEditClass extends AssetEdit {}

export const AssetPersonEdit = connect(
  (state: ApplicationState) => state.assetperson,
  AssetPersonStore.actionCreators
)(AssetPersonEditClass as any);
