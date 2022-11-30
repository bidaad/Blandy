import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCPlanTypeStore from '../../../store/HCPlanType';

import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCPlanType } from '../../../model/viewModel/VwHCPlanType';
import { stateBase } from '../../../model/general/stateBase';

import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import { Directions } from '../../../model/general';
import TTabs, { ComponentColumns } from '../../../components/TTabs';


type HCPlanTypeProps =
  stateBase<VwHCPlanType> & typeof HCPlanTypeStore.actionCreators & RouteComponentProps<{}>;
class EditHCPlanType
  extends React.PureComponent<HCPlanTypeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: any) {

    event.preventDefault();
    const sdata = serialize(event.target.form);
    const senddata = convertToObject(sdata) as VwHCPlanType;
    this.props.saveData(senddata);

  }

  getLabel = (label: string) => {
    return label;
  }
  getAccess = (label: string) => {
    return label;
  }

  gotoBackPage = () => {
    this.props.ChangeTab('', 'HCPlanTypeEdit', 'HCPlanType');

  }

  public render() {
    const columnStructure = [
      { key: "hcplantypelang", name: "hcplantypelang" },
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
            <Col md={12} className="T-container">
              <Col md={12} className="T-header">
                <TTitle {...{ name: "HCPlanType.EditForm" }} />
              </Col>
              <Form >
                <InputBox {...{ name: 'HCPlanType.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                <Row>
                  <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                  </Col>
                  <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.Sign', type: typeComponent.textArea, value: this.props.edit.sign }} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.Icon', type: typeComponent.textArea, value: this.props.edit.icon }} />
                  </Col>
                  <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.OrderBy', type: typeComponent.number, value: this.props.edit.orderBy }} />
                  </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                  </Col>
                  <Col md={6}>
                    <InputBox {...{ name: 'HCPlanType.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
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
                        name: "HCPlanType.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCPlanType.EditForm.updator",
                        size: 6,
                        value: this.props.edit.updator,
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={1}>
                    {this.props.saveLoading === true ?
                      <TButton
                        {...{
                          name: "HCPlanType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                      :
                      <TButton
                        {...{
                          name: "HCPlanType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                  </Col>
                  <Col md={1}>
                    <TButton {...{ name: "HCPlanType.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
              }}
            />
          ) : null}


        </Container>
      </React.Fragment>
    );
  }
}
export default connect(
  (state: ApplicationState) => state.hcplantype,
  HCPlanTypeStore.actionCreators
)(EditHCPlanType as any);