import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as AssetSelectionTypeStore from "../../../../store/AssetSelectionType";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwAssetSelectionType } from "../../../../model/viewModel/VwAssetSelectionType";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TAutoComplete from "../../../../components/TAutoComplete";
import { Directions } from "../../../../model/general";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";

type AssetSelectionTypeProps = stateBase<VwAssetSelectionType> &
  typeof AssetSelectionTypeStore.actionCreators &
  RouteComponentProps<{}> &{closeModal:any};
class AssetSelectionTypeEdit extends React.PureComponent<AssetSelectionTypeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwAssetSelectionType;
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
  };

  public render() {
    const columnStructure2 = [
      { key: "document", name: "document" }
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
            <Col md={12} className={"form-container"+Rtl} >
              <Col md={12} className="T-header">
                <TTitle {...{ name: "AssetSelectionType.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "AssetSelectionType.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "AssetId name",
                        valueId: this.props.edit.assetId,
                        valueName: this.props.edit.productSign,
                        name: "AssetSelectionType.EditForm.AssetId",
                        entityName: "assetsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TAutoComplete
                      {...{
                        controller: "HCSelectionType",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.hcselectionTypeId,
                        name: "AssetSelectionType.EditForm.HCSelectionTypeId",
                        valueName: this.props.edit.selectionTypeSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "AssetSelectionType.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "AssetSelectionType.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "AssetSelectionType.EditForm.Description",
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
                        name: "AssetSelectionType.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "AssetSelectionType.EditForm.updater",
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
                          name: "AssetSelectionType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "AssetSelectionType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "AssetSelectionType.EditForm.BTN_Back",
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
                defaultKey: columnStructure2[0].key,
                typeForm: "assetselectiontype",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.assetselectiontype,
  AssetSelectionTypeStore.actionCreators
)(AssetSelectionTypeEdit as any);
