import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCPlanTypeLangStore from '../../../store/HCPlanTypeLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCPlanTypeLang } from '../../../model/viewModel/VwHCPlanTypeLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';


type HCPlanTypeLangProps =
    stateBase<VwHCPlanTypeLang> & typeof HCPlanTypeLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class HCPlanTypeLangEdit extends React.PureComponent<HCPlanTypeLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCPlanTypeLang;
        if (((senddata) as any).ID) {
            this.props.saveData(senddata);
        }
        else {
            this.props.saveData(senddata);
            this.props.closeModal();
        }

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

        if (this.props.edit === undefined) {
            return null;
        }
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={12} className="T-container">
                           
                            <Form >
                                <InputBox {...{ name: 'HCPlanTypeLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'HCPlanTypeLang.EditForm.HCPlanTypeLangId', type: typeComponent.hidden, value: this.props.edit.hcplanTypeLangId? this.props.edit.hcplanTypeLangId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCPlanTypeLang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "HCPlanTypeLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCPlanTypeLang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCPlanTypeLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                               


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "HCPlanTypeLang.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCPlanTypeLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcplantypelang,
    HCPlanTypeLangStore.actionCreators
)(HCPlanTypeLangEdit as any);