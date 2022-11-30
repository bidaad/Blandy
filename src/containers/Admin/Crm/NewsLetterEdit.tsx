import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as NewsLetterStore from '../../../store/NewsLetter';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';

import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import { VwNewsLetter } from '../../../model/viewModel/VwNewsLetter';
import DateTime from '../../../components/DateTime';
import TextEditorBox from '../../../components/TextEditorBox';
import { Directions } from '../../../model/general';
import TTabs, { ComponentColumns } from '../../../components/TTabs';


type NewsLetterProps =
    stateBase<VwNewsLetter> & typeof NewsLetterStore.actionCreators & RouteComponentProps<{}>;
class NewsLetterEdit extends React.PureComponent<NewsLetterProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit=(event: any)=> {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwNewsLetter;
        this.props.saveData(senddata);

    }
    SendEmailSubmit=(event: any)=> {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwNewsLetter;
        this.props.sendEmail(senddata);

    }
    gotoBackPage = () => {
        // const { history } = this.props;
        // history.goBack();
        this.props.ChangeTab('','NewsLetterEdit','NewsLetter');

    }

    // CopyRecord = () => {
    //     this.props.copyRecord(this.props.edit.id);
    // }


    componentDidMount() {

 
    }
    public render() {
        const columnStructure = [
            { key: "document", name: "document" },
          ] as ComponentColumns[];
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
                        <Col md={12} className={"form-container"+Rtl} >
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "NewsLetter.EditForm" }} />
                            </Col>
                            <Form className="edit-form">
                                <InputBox {...{ name: 'NewsLetter.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}>

                                        <InputBox  {...{ name: 'NewsLetter.EditForm.code', type: typeComponent.text, value: this.props.edit.code }} />
                                    </Col>
                                    <Col md={6}>
                                        <DateTime {...{ name: 'NewsLetter.EditForm.publicationDate', value: this.props.edit.publicationDate, timePicker: false }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>

                                        <InputBox  {...{ name: 'NewsLetter.EditForm.newsSubject', type: typeComponent.textArea, value: this.props.edit.newsSubject }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <TextEditorBox  {...{ name: 'NewsLetter.EditForm.newsBody', value: this.props.edit.newsBody }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox  {...{ name: 'NewsLetter.EditForm.description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox  {...{ name: 'NewsLetter.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />

                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "NewsLetter.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "NewsLetter.EditForm.updater", size: 6, value: this.props.edit.updater }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "NewsLetter.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "NewsLetter.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "NewsLetter.EditForm.SendEmail", submit: this.SendEmailSubmit }} />
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "NewsLetter.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                    </Row>
                    {this.props.edit.id !== "" ? (
            <TTabs
              {...{
                component: columnStructure,
                editId: this.props.edit.id,
                defaultKey: columnStructure[0].key,
                typeForm: "asset",
              }}
            />
          ) : null}
                </Container>
            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.newsletter,
    NewsLetterStore.actionCreators
)(NewsLetterEdit as any);