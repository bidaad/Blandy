import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../../../../store";
import * as BrandStore from "../../../../store/Brand";
import { Container, Form, Row, Col } from "react-bootstrap";

import InputBox from "../../../../components/InputBox";
import { typeComponent } from "../../../../model/general/typeComponent";
import { convertToObject, serialize } from "../../../../helper/serialize";
import { VwBrand } from "../../../../model/viewModel/VwBrand";
import { stateBase } from "../../../../model/general/stateBase";
import TButton from "../../../../components/TButton";
import TTitle from "../../../../components/TTitle";
import TTabs, { ComponentColumns } from "../../../../components/TTabs";
import UploadIcon from "../../../../components/UploadIcon";
import { Directions } from "../../../../model/general";

type BrandProps = stateBase<VwBrand> &
  typeof BrandStore.actionCreators &
  RouteComponentProps<{}> & {
    closeModal: any;
    refreshGrid: any;
    parentId: string;
    typeForm?: string;
  };

class BrandEdit extends React.PureComponent<BrandProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {
    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwBrand;
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
    this.props.closeModal();
  };

  public render() {
    console.log("brandedit");
    const columnStructure = [
      { key: "brandlang", name: "brandlang" },
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
                <TTitle {...{ name: "Brand.EditForm" }} />
              </Col>
              <Form className="edit-form">
                <InputBox
                  {...{
                    name: "Brand.EditForm.ID",
                    type: typeComponent.hidden,
                    value: this.props.edit.id,
                  }}
                />
                <Row>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Brand.EditForm.code",
                        type: typeComponent.text,
                        value: this.props.edit.code,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Brand.EditForm.sign",
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
                        name: "Brand.EditForm.Description",
                        type: typeComponent.textArea,
                        value: this.props.edit.description,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <UploadIcon
                      {...{
                        name: "Brand.EditForm.Logo",
                        value: this.props.edit.logo,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <InputBox
                      {...{
                        name: "Brand.EditForm.IsActive",
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
                        name: "Brand.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "Brand.EditForm.updater",
                        size: 6,
                        value: this.props.edit.updater,
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={1}>
                    {this.props.saveLoading === true ? (
                      <TButton
                        {...{
                          name: "Brand.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                    ) : (
                      <TButton
                        {...{
                          name: "Brand.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <TButton
                      {...{
                        name: "Brand.EditForm.BTN_Back",
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
                folder: columnStructure[0].key,
              }}
            />
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.brands,
  BrandStore.actionCreators
)(BrandEdit as any);
