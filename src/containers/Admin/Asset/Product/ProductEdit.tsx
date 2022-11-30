import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as ProductStore from "../../../../store/Product";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";

import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import UploadIcon from "../../../../components/UploadIcon";
import { VwProduct } from "../../../../model/viewModel/VwProduct";
import TAutoComplete from "../../../../components/TAutoComplete";
import { Button } from "react-bootstrap";
import { Directions } from "../../../../model/general";

type ProductProps = stateBase<VwProduct> &
  typeof ProductStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm: string;
  };
class ProductEdit extends React.PureComponent<ProductProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwProduct;
    this.props.saveData(senddata);
  }
  handleGenerateWorkOrder(Id: any) {
    const data = { id: Id };
    this.props.generateWorkOrder(data);
  }
  getLabel = (label: string) => {
    return label;
  };
  getAccess = (label: string) => {
    return label;
  };

  gotoBackPage = () => {
    // const { history } = this.props;
    // history.goBack();
    this.props.closeModal();

    //this.props.ChangeTab('', 'ProductEdit', 'Product');
  };

  CopyRecord = () => {
    this.props.copyRecord(this.props.edit.id);
    this.props.refreshGrid();
  };

  componentDidMount() {}
  public render() {
    console.log("this.props.edit=" + this.props.edit.id);

    const columnStructure = [
      { key: "productlang", name: "productlang" },
      { key: "productcategory", name: "productcategory" },
      { key: "productattribute", name: "productattribute" },
      { key: "productcolor", name: "productcolor" },
      { key: "productlife", name: "productlife" },
      { key: "machinerelated", name: "machinerelated" },
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
            <Col md={12} className={"form-container"+Rtl} >
              <Col md={12} className="T-header">
                <TTitle {...{ name: "Product.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "Product.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.sign",
                        type: typeComponent.text,
                        value: this.props.edit.sign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.internalFactoryPN",
                        type: typeComponent.textArea,
                        value: this.props.edit.internalFactoryPn,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.mainFactoryPN",
                        type: typeComponent.textArea,
                        value: this.props.edit.mainFactoryPn,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.model",
                        type: typeComponent.textArea,
                        value: this.props.edit.model,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Brand name",
                        valueId: this.props.edit.brandId,
                        valueName: this.props.edit.brandName,
                        name: "Product.EditForm.BrandId",
                        entityName: "brandsl",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Manufacture name",
                        valueId: this.props.edit.manufactureId,
                        valueName: this.props.edit.manufactureSign,
                        name: "Product.EditForm.manufactureId",
                        entityName: "departmentsl",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.barCode",
                        type: typeComponent.textArea,
                        value: this.props.edit.barCode,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.accesory",
                        type: typeComponent.textArea,
                        value: this.props.edit.accesory,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <UploadIcon
                      {...{
                        name: "Product.EditForm.Icon",
                        value: this.props.edit.icon,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <UploadIcon
                      {...{
                        name: "Product.EditForm.mainImage",
                        value: this.props.edit.mainImage,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.machine",
                        type: typeComponent.check,
                        value: this.props.edit.machine,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.marketable",
                        type: typeComponent.check,
                        value: this.props.edit.marketable,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.packingHeight",
                        type: typeComponent.number,
                        value: this.props.edit.packingHeight,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.packinglength",
                        type: typeComponent.number,
                        value: this.props.edit.packinglength,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.packingWidth",
                        type: typeComponent.number,
                        value: this.props.edit.packingWidth,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.netWeight",
                        type: typeComponent.number,
                        value: this.props.edit.netWeight,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.packingWeight",
                        type: typeComponent.number,
                        value: this.props.edit.packingWeight,
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <TAutoComplete
                      {...{
                        controller: "Hcunit",
                        action: "GetHCList",
                        selectName: "sign",
                        valueId: this.props.edit.dimensionUnitId,
                        name: "Product.EditForm.dimensionUnitId",
                        valueName: this.props.edit.unitSign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Parent name",
                        valueId: this.props.edit.prouductParentId,
                        valueName: this.props.edit.parentName,
                        name: "Product.EditForm.prouductParentId",
                        entityName: "product",
                        noselectId: this.props.edit.id,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "Zone name",
                        valueId: this.props.edit.madeInZone,
                        valueName: this.props.edit.zoneName,
                        name: "Product.EditForm.madeInZone",
                        entityName: "zonesl",
                        valuefiltersl: "zoneTypeCode:2:2;",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.productInPackage",
                        type: typeComponent.number,
                        value: this.props.edit.productInPackage,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Product.EditForm.description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}></Col>
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
                        name: "Product.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Product.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "Product.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Product.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Product.EditForm.BTN_Back",
                        variant: "outline-info",
                        submit: this.gotoBackPage,
                      }}
                    />
                  </Col>
                  {this.props.edit.id !== "" ? (
                    <Col md={1}>
                      <Button
                        className="btn-orange"
                        style={{ width: 80 }}
                        onClick={() => this.CopyRecord()}
                      >
                        کپی
                      </Button>
                    </Col>
                  ) : null}
                  {this.props.edit.machine === true ? (
                    <Col md={1}>
                      <TButton
                        {...{
                          name: "Product.EditForm.GenerateWorkOrder",
                          submit: () =>
                            this.handleGenerateWorkOrder(this.props.edit.id),
                          variant: "danger",
                          class: "BtnWorkOrder",
                        }}
                      />
                    </Col>
                  ) : null}
                </Row>
              </Form>
            </Col>
          </Row>
          {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure,
                editId: this.props.edit.id,
                defaultKey: "productLang",
                folder: "productLang",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.products,
  ProductStore.actionCreators
)(ProductEdit as any);
