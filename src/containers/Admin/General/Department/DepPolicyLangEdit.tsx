import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepPolicyLangStore from '../../../../store/DepPolicyLang';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepPolicyLang } from '../../../../model/viewModel/VwDepPolicyLang';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import SelectList from '../../../../components/SelectList';
import { Directions } from '../../../../model/general';


type DepPolicyLangProps =
    stateBase<VwDepPolicyLang> & typeof DepPolicyLangStore.actionCreators & RouteComponentProps<{}>;
class DepPolicyLangEdit extends React.PureComponent<DepPolicyLangProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepPolicyLang;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        // const { history } = this.props;
        // history.goBack();
        this.props.ChangeTab('','DepPolicyLangEdit','DepPolicyLang');
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
                <Container>
                    <Row>
                        <Col md={12} className={"form-container"+Rtl} >
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "DepPolicyLang.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'DepPolicyLang.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepPolicyLang.EditForm.DepId', type: typeComponent.hidden, value: this.props.parentId }} />
                                <Row>
                                    <Col md={6}>
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "LanguageId name", valueId: this.props.edit.languageId, valueName: this.props.edit.languageSign, name: "DepPolicyLang.EditForm.LanguageId", entityName: "languagesl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepPolicyLang.EditForm.Title', type: typeComponent.textArea, value: this.props.edit.title }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepPolicyLang.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepPolicyLang.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepPolicyLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepPolicyLang.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepPolicyLang.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.deppolicylang,
    DepPolicyLangStore.actionCreators
)(DepPolicyLangEdit as any);