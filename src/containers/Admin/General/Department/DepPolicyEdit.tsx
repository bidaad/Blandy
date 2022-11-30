import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepPolicyStore from '../../../../store/DepPolicy';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepPolicy } from '../../../../model/viewModel/VwDepPolicy';
import { stateBase } from '../../../../model/general/stateBase';
import TButton from '../../../../components/TButton';
import TAutoComplete from '../../../../components/TAutoComplete';
import { Directions } from '../../../../model/general';


type DepPolicyProps =
    stateBase<VwDepPolicy> & typeof DepPolicyStore.actionCreators & RouteComponentProps<{}> & { closeModal: any, refreshGrid: any, parentId: string };
class DepPolicyEdit extends React.PureComponent<DepPolicyProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepPolicy;
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
        // const { history } = this.props;
        // history.goBack();
        this.props.ChangeTab('', 'DepPolicyEdit', 'DepPolicy');
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
                            {/* <Col md={12} className="T-header">
                                <TTitle {...{ name: "DepPolicy.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'DepPolicy.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'DepPolicy.EditForm.DepId', type: typeComponent.hidden, value: this.props.edit.depId?this.props.edit.depId:this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <TAutoComplete {...{ controller: "HCPolicyTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcpolicyTitleId, name: "DepPolicy.EditForm.HCPolicyTitleId", valueName: this.props.edit.policyTitleSign }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepPolicy.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepPolicy.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepPolicy.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepPolicy.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepPolicy.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.deppolicy,
    DepPolicyStore.actionCreators
)(DepPolicyEdit as any);