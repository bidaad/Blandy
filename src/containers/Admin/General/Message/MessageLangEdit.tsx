import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as MessageLangStore from '../../../../store/MessageLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import { VwMessageLang } from '../../../../model/viewModel/VwMessageLang';
import { Directions } from '../../../../model/general';



type MessageLangProps =
    stateBase<VwMessageLang> &
    typeof MessageLangStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string};

class MessageLangEdit extends React.PureComponent<MessageLangProps> {
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
        const senddata = convertToObject(sdata) as VwMessageLang;
        this.props.saveData(senddata);
         this.props.closeModal();
        this.props.refreshGrid(this.props.parentId);
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
                            {this.props.isFormLoading !== true ?
                                <Form onSubmit={this.handleSubmit}>
                                    <InputBox {...{ name: 'MessageLang.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                    <InputBox {...{ name: 'MessageLang.EditForm.parentId', type: typeComponent.hidden, value: this.props.parentId }} />
                                    <Row>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'MessageLang.EditForm.name', type: typeComponent.textArea, value: this.props.edit.name }} />
                                        </Col>
                                        <Col md={6}>
                                            <InputBox {...{ name: 'MessageLang.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col md={12}>
                                            <TAutoComplete {...{ controller: "Language", action: "ReadData", selectName: "sign", valueId: this.props.edit.languageId, name: "MessageLang.EditForm.LanguageId", valueName: this.props.edit.sign }} />
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <hr />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2} >
                                              {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "MessageLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "MessageLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                        </Col>
                                        <Col md={2} >
                                            <TButton {...{ name: "MessageLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </Form>
                                : <div className="centered"><div className="spinner-grow text-warning" role="status"><span className="sr-only">Loading...</span></div></div>

                            }


                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.messagelangs,
    MessageLangStore.actionCreators
)(MessageLangEdit as any);