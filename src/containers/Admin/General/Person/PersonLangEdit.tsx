import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as PersonLangStore from '../../../../store/PersonLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwPersonLang } from '../../../../model/viewModel/VwPersonLang';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';


type PersonLangProps =
    stateBase<VwPersonLang> &
    typeof PersonLangStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class PersonLangEdit extends React.PureComponent<PersonLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state = {
        //     parentId: this.props.parentId,
        // }
    }
    componentDidMount() {
        console.log(this.props.parentId);

    }
    componentDidUpdate(props: any) {

    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwPersonLang;
           if(((senddata) as any).ID)
        {
            this.props.saveData(senddata);
        }
        else
        {
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
        console.log('this.props.edit=' + this.props.edit);
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }

        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'PersonLang.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'PersonLang.EditForm.PersonId', type: typeComponent.hidden, value:this.props.edit.personId?this.props.edit.personId: this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonLang.EditForm.FirstName', type: typeComponent.textArea, value: this.props.edit.firstName }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonLang.EditForm.LastName', type: typeComponent.textArea, value: this.props.edit.lastName }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonLang.EditForm.MidName', type: typeComponent.textArea, value: this.props.edit.midName }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'PersonLang.EditForm.FatherName', type: typeComponent.textArea, value: this.props.edit.fatherName }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "PersonLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "PersonLang.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "PersonLang.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "PersonLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "PersonLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "PersonLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.personlangs,
    PersonLangStore.actionCreators
)(PersonLangEdit as any);