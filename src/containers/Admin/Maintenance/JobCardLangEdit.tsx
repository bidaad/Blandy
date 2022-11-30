import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JobCardLangStore from '../../../store/JobCardLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJobCardLang } from '../../../model/viewModel/VwJobCardLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';
import { Directions } from '../../../model/general';


type JobCardLangProps =
    stateBase<VwJobCardLang> & typeof JobCardLangStore.actionCreators & RouteComponentProps<{}>&
    { closeModal: any, refreshGrid: any, parentId: string };
class JobCardLangEdit extends React.PureComponent<JobCardLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJobCardLang;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        this.props.closeModal();

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
                                <TTitle {...{ name: "JobCardLang.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JobCardLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'JobCardLang.EditForm.JobCardId', type: typeComponent.hidden, value:this.props.edit.jobCardId?this.props.edit.jobCardId: this.props.edit.parentId }} />

                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={12}>
                                        <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "JobCardLang.EditForm.LanguageId", valueName: this.props.edit.languageSign }} />
                                    </Col>
                                    {/* <Col md={6}>
                                        <SelectList {...{ label: "LanguageId name", valueId: this.props.edit.languageId, valueName: this.props.edit.languageSign, name: "JobCardLang.EditForm.LanguageId", entityName: "languagesl" }} />
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.Name', type: typeComponent.textArea, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.DetailDesc', type: typeComponent.textArea, value: this.props.edit.detailDesc }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.SaftyInstruction', type: typeComponent.textArea, value: this.props.edit.saftyInstruction }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JobCardLang.EditForm.TechnicalDescription', type: typeComponent.textArea, value: this.props.edit.technicalDescription }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JobCardLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JobCardLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JobCardLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jobcardlang,
    JobCardLangStore.actionCreators
)(JobCardLangEdit as any);