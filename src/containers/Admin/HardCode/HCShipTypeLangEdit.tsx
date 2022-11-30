import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCShipTypeLangStore from '../../../store/HCShipTypeLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCShipTypeLang } from '../../../model/viewModel/VwHCShipTypeLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';


type HCShipTypeLangProps =
    stateBase<VwHCShipTypeLang> & typeof HCShipTypeLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class HCShipTypeLangEdit extends React.PureComponent<HCShipTypeLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCShipTypeLang;
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
                                <InputBox {...{ name: 'HCShipTypeLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'HCShipTypeLang.EditForm.HCShipTypeId', type: typeComponent.hidden, value: this.props.edit.hcshipTypeId? this.props.edit.hcshipTypeId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCShipTypeLang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "HCShipTypeLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCShipTypeLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCShipTypeLang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "HCShipTypeLang.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCShipTypeLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcshiptypelang,
    HCShipTypeLangStore.actionCreators
)(HCShipTypeLangEdit as any);