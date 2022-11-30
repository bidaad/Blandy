import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as WorkOrderLangStore from '../../../store/WorkOrderLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwWorkOrderLang } from '../../../model/viewModel/VwWorkOrderLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';


type WorkOrderLangProps =
    stateBase<VwWorkOrderLang> & typeof WorkOrderLangStore.actionCreators & RouteComponentProps<{}>;
class WorkOrderLangEdit extends React.PureComponent<WorkOrderLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwWorkOrderLang;
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
                                <TTitle {...{ name: "WorkOrderLang.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'WorkOrderLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'WorkOrderLang.EditForm.WorkOrderId', type: typeComponent.hidden, value: this.props.edit.workOrderId? this.props.edit.workOrderId: this.props.edit.parentId }} />

                                <Row>
                                <Col md={6}>
                                        <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "WorkOrderLang.EditForm.LanguageId", valueName: this.props.edit.languageSign }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrderLang.EditForm.Name', type: typeComponent.textArea, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrderLang.EditForm.Detail', type: typeComponent.textArea, value: this.props.edit.detail }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrderLang.EditForm.ExpertDescription', type: typeComponent.text, value: this.props.edit.expertDescription }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrderLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'WorkOrderLang.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "WorkOrderLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "WorkOrderLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "WorkOrderLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.workorderlang,
    WorkOrderLangStore.actionCreators
)(WorkOrderLangEdit as any);