import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCBookingStatusLangStore from '../../../store/HCBookingStatusLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCBookingStatusLang } from '../../../model/viewModel/VwHCBookingStatusLang';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TAutoComplete from '../../../components/TAutoComplete';


type HCBookingStatusLangProps =
    stateBase<VwHCBookingStatusLang> & typeof HCBookingStatusLangStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class HCBookingStatusLangEdit extends React.PureComponent<HCBookingStatusLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCBookingStatusLang;
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
                                <InputBox {...{ name: 'HCBookingStatusLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'HCBookingStatusLang.EditForm.HCBookingStatusId', type: typeComponent.hidden, value: this.props.edit.hcbookingStatusId? this.props.edit.hcbookingStatusId: this.props.edit.parentId }} />
                                <Row>
                                <Col md={6}>
                                    <TAutoComplete {...{ controller: "Language", action: "GetList", selectName: "sign", valueId: this.props.edit.languageId, name: "HCBookingStatusLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                       
                                    </Col>
                                    <Col md={6}>
                                        
                                    </Col>
                        
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCBookingStatusLang.EditForm.Name', type: typeComponent.text, value: this.props.edit.name }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCBookingStatusLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'HCBookingStatusLang.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                        <TButton {...{ name: "HCBookingStatusLang.EditForm.BTN_Save", submit: this.handleSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCBookingStatusLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcbookingstatuslang,
    HCBookingStatusLangStore.actionCreators
)(HCBookingStatusLangEdit as any);