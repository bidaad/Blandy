import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCGuaranteeTypelangStore from '../../../store/HCGuaranteeTypelang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCGuaranteeTypelang } from '../../../model/viewModel/VwHCGuaranteeTypelang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';


type HCGuaranteeTypelangProps =
    stateBase<VwHCGuaranteeTypelang> & typeof HCGuaranteeTypelangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class HCGuaranteeTypelangEdit extends React.PureComponent<HCGuaranteeTypelangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCGuaranteeTypelang;
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
                                <InputBox {...{ name: 'HCGuaranteeTypelang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'HCGuaranteeTypelang.EditForm.HCGuaranteeTypeId', type: typeComponent.hidden, value: this.props.edit.hcguaranteeTypeid? this.props.edit.hcguaranteeTypeid: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "HCGuaranteeTypelang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCGuaranteeTypelang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCGuaranteeTypelang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCGuaranteeTypelang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "HCGuaranteeTypelang.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCGuaranteeTypelang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcguaranteetypelang,
    HCGuaranteeTypelangStore.actionCreators
)(HCGuaranteeTypelangEdit as any);