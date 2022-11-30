import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as ChatStore from '../../../store/Chat';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwChat } from '../../../model/viewModel/VwChat';
import { stateBase } from '../../../model/general/stateBase';
import TAutoComplete from '../../../components/TAutoComplete';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import SelectList from '../../../components/SelectList';
import TTabs, { ComponentColumns } from '../../../components/TTabs';
import { Directions } from '../../../model/general';

type ChatProps =
    stateBase<VwChat> &
    typeof ChatStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };

class ChatEdit extends React.PureComponent<ChatProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {

    }
    componentDidUpdate(props: any) {

    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwChat;
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
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        const columnStructure2 = [
            { key: "chatdetail", name: "chatdetail" },
            { key: "document", name: "document" }
        ] as ComponentColumns[];
        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'Chat.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Chat.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Chat.EditForm.sign', type: typeComponent.textArea, value: this.props.edit.sign }} />

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCChatTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcchatTitle, name: "Chat.EditForm.hcchatTitle", valueName: this.props.edit.chatTitle }} />
                                    </Col>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCChatStatus", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcchatStatusId, name: "Chat.EditForm.hCChatStatusId", valueName: this.props.edit.chatStatus }} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "User name", valueId: this.props.edit.expertId, valueName: this.props.edit.expertNikName, name: "Chat.EditForm.expertId", entityName: "usersl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Chat.EditForm.expertComment', type: typeComponent.text, value: this.props.edit.expertComment }} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={6}>
                                        <SelectList {...{ label: "User name", valueId: this.props.edit.userId, valueName: this.props.edit.userNikName, name: "Chat.EditForm.userId", entityName: "usersl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Chat.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'Chat.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <TTitle {...{ name: "Chat.EditForm.userIp", size: 6, value: this.props.edit.userIp }} />
                                    </Col>
                                    <Col md={4}>
                                        <TTitle {...{ name: "Chat.EditForm.userDevice", size: 6, value: this.props.edit.userDevice }} />
                                    </Col>
                                    <Col md={4}>
                                        <TTitle {...{ name: "Chat.EditForm.userBrowser", size: 6, value: this.props.edit.userBrowser }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "Chat.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "Chat.EditForm.updater", size: 6, value: this.props.edit.updater }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "Chat.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "Chat.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "Chat.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                    {this.props.edit.id !== '' ?
                        <TTabs {...{ component: columnStructure2, editId: this.props.edit.id, defaultKey: "chatdetail", folder: "chatdetail" }} />
                        : null}
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.chat,
    ChatStore.actionCreators
)(ChatEdit as any);