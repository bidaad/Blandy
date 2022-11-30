import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as CategorySelectionTypeStore from "../../../../store/CategorySelectionType";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwCategorySelectionType } from "../../../../model/viewModel/VwCategorySelectionType";
import { stateBase } from "../../../../model/general/stateBase";
import SelectList from "../../../../components/SelectList";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import TAutoComplete from "../../../../components/TAutoComplete";
import { Directions } from "../../../../model/general";

type CategorySelectionTypeProps = stateBase<VwCategorySelectionType> &
  typeof CategorySelectionTypeStore.actionCreators &
  RouteComponentProps<{}> & { closeModal: any };
class CategorySelectionTypeEdit extends React.PureComponent<CategorySelectionTypeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwCategorySelectionType;
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
              <Col md={12} className="T-header">
                <TTitle {...{ name: "CategorySelectionType.EditForm" }} />
              </Col>
              <Form>
                <InputBox
                  {...{
                    name: "CategorySelectionType.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <SelectList
                      {...{
                        label: "CategoryId name",
                        valueId: this.props.edit.categoryId,
                        valueName: this.props.edit.categorySign,
                        name: "CategorySelectionType.EditForm.CategoryId",
                        entityName: "categorysl",
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
                        name:
                          "CategorySelectionType.EditForm.HCSelectionTypeId",
                        valueName: this.props.edit.sign,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "CategorySelectionType.EditForm.OrderBy",
                        type: typeComponent.number,
                        value: this.props.edit.orderBy,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "CategorySelectionType.EditForm.IsActive",
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
                        name: "CategorySelectionType.EditForm.Description",
                        type: typeComponent.text,
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
                        name: "CategorySelectionType.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "CategorySelectionType.EditForm.updater",
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
                          name: "CategorySelectionType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "CategorySelectionType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "CategorySelectionType.EditForm.BTN_Back",
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
                typeForm: "categoryselectiontype",
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.categoryselectiontype,
  CategorySelectionTypeStore.actionCreators
)(CategorySelectionTypeEdit as any);
