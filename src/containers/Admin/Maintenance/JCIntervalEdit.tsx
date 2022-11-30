import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCIntervalStore from '../../../store/JCInterval';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCInterval } from '../../../model/viewModel/VwJCInterval';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';
import DateTime from '../../../components/DateTime';
import { Directions } from '../../../model/general';


type JCIntervalProps =
    stateBase<VwJCInterval> & typeof JCIntervalStore.actionCreators & RouteComponentProps<{}>;
class JCIntervalEdit extends React.PureComponent<JCIntervalProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCInterval;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        const { history } = this.props;
        history.goBack();

    }

    public render() {
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
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "JCInterval.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JCInterval.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'JCInterval.EditForm.JobCardId', type: typeComponent.hidden, value: this.props.edit.jobCardId?this.props.edit.jobCardId:this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'JCInterval.EditForm.FromDate',  value: this.props.edit.fromDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'JCInterval.EditForm.FixDate',  value: this.props.edit.fixDate }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'JCInterval.EditForm.ToDate', value: this.props.edit.toDate }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCMonth", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcmonthId, name: "JCInterval.EditForm.HCMonthId", valueName: this.props.edit.monthSign }} />
                                    </Col>
                                </Row>
                                <Row>
                                <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPlanTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcPlanTitleId, name: "JCInterval.EditForm.HCPlanTitleId", valueName: this.props.edit.planTitleSign }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                  
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Sign', type: typeComponent.text, value: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Repeatable', type: typeComponent.check, value: this.props.edit.repeatable }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Guarantee', type: typeComponent.check, value: this.props.edit.guarantee }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Value', type: typeComponent.number, value: this.props.edit.value }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCUnit", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcUnitId, name: "JCInterval.EditForm.HCUnitId", valueName: this.props.edit.unitSign }} />
                                    </Col>
             
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.NegativeTolerance', type: typeComponent.number, value: this.props.edit.negativeTolerance }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.PositiveTolerance', type: typeComponent.number, value: this.props.edit.positiveTolerance }} />
                                    </Col>
                             
                                </Row>
                             
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.ExactDay', type: typeComponent.number, value: this.props.edit.exactDay }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ZoneId name", valueId: this.props.edit.zoneId, valueName: this.props.edit.zoneSign, name: "JCInterval.EditForm.ZoneId", entityName: "zonesl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCInterval.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCInterval.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCInterval.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCInterval.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.jcinterval,
    JCIntervalStore.actionCreators
)(JCIntervalEdit as any);