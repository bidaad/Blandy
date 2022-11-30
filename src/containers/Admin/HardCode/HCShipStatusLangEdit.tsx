import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCShipStatusLangStore from '../../../store/HCShipStatusLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCShipStatusLang } from '../../../model/viewModel/VwHCShipStatusLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';


type HCShipStatusLangProps =
    stateBase<VwHCShipStatusLang> & typeof HCShipStatusLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class HCShipStatusLangEdit extends React.PureComponent<HCShipStatusLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCShipStatusLang;
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
                                <InputBox {...{ name: 'HCShipStatusLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'HCShipStatusLang.EditForm.HCShipStatusId', type: typeComponent.hidden, value: this.props.edit.hcshipStatusId? this.props.edit.hcshipStatusId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCShipStatusLang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "HCShipStatusLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <InputBox {...{ name: 'HCShipStatusLang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCShipStatusLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "HCShipStatusLang.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCShipStatusLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcshipstatuslang,
    HCShipStatusLangStore.actionCreators
)(HCShipStatusLangEdit as any);