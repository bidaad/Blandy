import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCSkillTitleStore from '../../../store/HCSkillTitle';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCSkillTitle } from '../../../model/viewModel/VwHCSkillTitle';
import { stateBase } from '../../../model/general/stateBase';
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import UploadIcon from '../../../components/UploadIcon';
import TTabs, { ComponentColumns } from '../../../components/TTabs';
import { Directions } from '../../../model/general';


const tabStructure = [
    { key: "hcskilltitlelang", name: "hcskilltitlelang" },
] as ComponentColumns[];


type HCSkillTitleProps =
    stateBase<VwHCSkillTitle> & typeof HCSkillTitleStore.actionCreators & RouteComponentProps<{}>;
class EditHCSkillTitle
 extends React.PureComponent<HCSkillTitleProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCSkillTitle;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
		this.props.ChangeTab('','EditHCSkillTitle','HCSkillTitle');

    }

    public render() {
        let Rtl = "";
        if (this.props.dir === Directions.RTL) {
            Rtl = " Rtl";
        }
        if (this.props.edit === undefined) {
            return null;
        }
        if (this.props.edit === undefined) {
            return null;
        }
        return (
            <React.Fragment>
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12} className="T-container">
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "HCSkillTitle.EditForm" }} />
                            </Col>
                            <Form className="edit-form">
                                <InputBox {...{ name: 'HCSkillTitle.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <Row>
                                    <Col md={6}><InputBox {...{ name: 'HCSkillTitle.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} /></Col>
                                    <Col md={6}><InputBox {...{ name: 'HCSkillTitle.EditForm.Sign', type: typeComponent.text, value: this.props.edit.sign }} /></Col>

                                </Row>
                                <Row>
                                    <Col md={6}><UploadIcon {...{ name: "HCSkillTitle.EditForm.Icon", value: this.props.edit.icon }} /></Col>
                                    <Col md={6}><InputBox {...{ name: 'HCSkillTitle.EditForm.OrderBy', type: typeComponent.number, value: this.props.edit.orderBy }} /></Col>
                                </Row>
                                <Row>
                                    <Col md={6}><InputBox {...{ name: 'HCSkillTitle.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} /></Col>
                                    <Col md={6}><InputBox {...{ name: 'HCSkillTitle.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} /></Col>
                                </Row>


                                                <Row>
                  <Col md={12}>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCSkillTitle.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCSkillTitle.EditForm.updator",
                        size: 6,
                        value: this.props.edit.updator,
                      }}
                    />
                  </Col>
                </Row>
<Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "HCSkillTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "HCSkillTitle.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCSkillTitle.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {this.props.edit.id !== '' ?
                        <TTabs {...{ component: tabStructure, editId: this.props.edit.id, defaultKey: tabStructure[0].key }} />
                        : null}
                </Container>
            </React.Fragment>
        );
    }
}
export default connect(
    (state: ApplicationState) => state.hcskilltitle,
    HCSkillTitleStore.actionCreators
)(EditHCSkillTitle as any);