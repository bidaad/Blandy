import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as CategoryStore from "../../../../store/Category";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import {
  VwCategory,
} from "../../../../model/viewModel/VwCategory";
import { stateBase } from "../../../../model/general/stateBase";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import UploadIcon from "../../../../components/UploadIcon";
import SelectList from "../../../../components/SelectList";
import { Directions } from "../../../../model/general";

type CategoryProps = stateBase<VwCategory> &
  typeof CategoryStore.actionCreators &
  RouteComponentProps<{}>;
class CategoryEdit extends React.PureComponent<CategoryProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwCategory;
    this.props.saveData(senddata);
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
    this.props.ChangeTab("", "CategoryEdit", "Category");
  };

  public render() {
    console.log("this.props.edit=" + this.props.edit);

    const columnStructure = [
      { key: "categoryattribute", name: "categoryattribute" },
      { key: "categorylang", name: "categorylang" },
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
            <Col md={12} className={"form-container" + Rtl}>
              <Col md={12} className="T-header">
                <TTitle {...{ name: "Category.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "Category.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.sign",
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
                        name: "Category.EditForm.Each",
                        type: typeComponent.check,
                        value: this.props.edit.each,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.HsCode",
                        type: typeComponent.check,
                        value: this.props.edit.hscode,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.IsActive",
                        type: typeComponent.check,
                        value: this.props.edit.isActive,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <UploadIcon
                      {...{
                        name: "Category.EditForm.Icon",
                        value: this.props.edit.icon,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.ShowInList",
                        type: typeComponent.check,
                        value: this.props.edit.showInList,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.MroplanActive",
                        type: typeComponent.check,
                        value: this.props.edit.mroplanActive,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.maxShipTime",
                        type: typeComponent.number,
                        value: this.props.edit.maxShipTime,
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
                        name: "Category.EditForm.parentId",
                        entityName: "categorysl",
                        noselectId: this.props.edit.id,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Category.EditForm.description",
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
                        name: "Category.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Category.EditForm.updater",
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
                          name: "Category.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Category.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Category.EditForm.BTN_Back",
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
                defaultKey: "categoryattribute",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.categories, // Selects which state properties are merged into the component's props
  CategoryStore.actionCreators // Selects which action creators are merged into the component's props
)(CategoryEdit as any);
