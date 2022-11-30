import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as ChatDetailStore from '../../../store/ChatDetail';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwChatDetail } from '../../../model/viewModel/VwChatDetail';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import { Directions } from '../../../model/general';

type ChatDetailProps =
    stateBase<VwChatDetail> &
    typeof ChatDetailStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class ChatDetailEdit extends React.PureComponent<ChatDetailProps> {
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
        const senddata = convertToObject(sdata) as VwChatDetail;
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
        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <InputBox {...{ name: 'ChatDetail.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'ChatDetail.EditForm.ChatId', type: typeComponent.hidden, value: this.props.parentId }} />
                                <Row>
                                <Col md={12}>
                                        <InputBox {...{ name: 'ChatDetail.EditForm.ChatText', type: typeComponent.textArea, value: this.props.edit.chatText }} />
                                    </Col>
                                </Row>
                                <Row>
                                <Col md={6}>
                                        <InputBox {...{ name: 'ChatDetail.EditForm.UserSeen', type: typeComponent.check, value: this.props.edit.userSeen }} />
                                    </Col>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'ChatDetail.EditForm.expertSeen', type: typeComponent.check, value: this.props.edit.expertSeen }} />
                                    </Col>

                                </Row>
                            
                                <Row>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'ChatDetail.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>
                                <Row>
                                <Col md={12}>
                                    <hr/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "ChatDetail.EditForm.userNikName", size: 6, value: this.props.edit.userNikName }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "ChatDetail.EditForm.expertNikName", size: 6, value: this.props.edit.expertNikName }} /></Col>
                                </Row>
                                <Row>
                                <Col md={12}>
                                    <hr/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "ChatDetail.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "ChatDetail.EditForm.updator", size: 6, value: this.props.edit.updator }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2} >
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "ChatDetail.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "ChatDetail.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "ChatDetail.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.chatdetail,
    ChatDetailStore.actionCreators
)(ChatDetailEdit as any);