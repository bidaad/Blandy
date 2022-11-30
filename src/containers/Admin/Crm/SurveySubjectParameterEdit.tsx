import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as SurveySubjectParameterStore from '../../../store/SurveySubjectParameter';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwSurveySubjectParameter } from '../../../model/viewModel/VwSurveySubjectParameter';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';



type SurveySubjectParameterProps =
    stateBase<VwSurveySubjectParameter> & typeof SurveySubjectParameterStore.actionCreators & RouteComponentProps<{}>;
class SurveySubjectParameterEdit extends React.PureComponent<SurveySubjectParameterProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwSurveySubjectParameter;
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
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "SurveySubjectParameter.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'SurveySubjectParameter.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'SurveySubjectParameter.EditForm.SurveySubjectId', type:typeComponent.hidden, value: this.props.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCSurveyParameter", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcsurveyParameterId, name: "SurveySubjectParameter.EditForm.HCSurveyParameterId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'SurveySubjectParameter.EditForm.OrderBy', type: typeComponent.number, value: this.props.edit.orderBy }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'SurveySubjectParameter.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'SurveySubjectParameter.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "SurveySubjectParameter.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "SurveySubjectParameter.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "SurveySubjectParameter.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.surveysubjectparameter,
    SurveySubjectParameterStore.actionCreators
)(SurveySubjectParameterEdit as any);