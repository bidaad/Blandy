import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCUserRejectStore from '../../../store/JCUserReject';
import * as JCUserRejectAssetStore from '../../../store/JCUserRejectAsset';
import * as JCUserRejectJobcardStore from '../../../store/JCUserRejectJobcard';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCUserReject } from '../../../model/viewModel/VwJCUserReject';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type JCUserRejectProps =
    stateBase<VwJCUserReject> & typeof JCUserRejectStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };
class JCUserRejectEdit extends React.PureComponent<JCUserRejectProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCUserReject;
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
                            <Form >
                                <InputBox {...{ name: 'JCUserReject.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                {
                                    this.props.typeForm === "asset" ?
                                        <Row>
                                            <Col md={6}>
                                                <SelectList {...{ label: "JobCard name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobcardSign, name: "JCUserReject.EditForm.JobCardId", entityName: "jobcardsl" }} />
                                                <InputBox {...{ name: 'JCUserReject.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                            </Col>
                                        </Row>
                                        : this.props.typeForm === "jobcard" ?
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.producrSign, name: "JCUserReject.EditForm.AssetId", entityName: "assetsl" }} />
                                                    <InputBox {...{ name: 'JCUserReject.EditForm.JobCardId', type: typeComponent.hidden, value: this.props.edit.jobCardId ? this.props.edit.jobCardId : this.props.edit.parentId }} />

                                                </Col>
                                            </Row>
                                            :
                                            <Row>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "JobCard name", valueId: this.props.edit.jobCardId, valueName: this.props.edit.jobcardSign, name: "JCUserReject.EditForm.JobCardId", entityName: "jobcardsl" }} />
                                                </Col>
                                                <Col md={6}>
                                                    <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.producrSign, name: "JCUserReject.EditForm.AssetId", entityName: "assetsl" }} />
                                                </Col>
                                            </Row>
                                }
                                <InputBox {...{ name: 'JCUserReject.EditForm.JobCardId', type: typeComponent.hidden, value: this.props.parentId }} />

                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "UserId name", valueId: this.props.edit.userId, valueName: this.props.edit.nikName, name: "JCUserReject.EditForm.UserId", entityName: "usersl" }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCUserReject.EditForm.IsReject', type: typeComponent.check, value: this.props.edit.isReject }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCUserReject.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCUserReject.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCUserReject.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCUserReject.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCUserReject.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jcuserreject,
    JCUserRejectStore.actionCreators
)(JCUserRejectEdit as any);

class JCUserRejectAssetEditClass extends JCUserRejectEdit {
}

export const JCUserRejectAssetEdit = connect(
    (state: ApplicationState) => state.jcuserrejectasset,
    JCUserRejectAssetStore.actionCreators
)(JCUserRejectAssetEditClass as any);

class JCUserRejectJobcardEditClass extends JCUserRejectEdit {
}

export const JCUserRejectJobcardEdit = connect(
    (state: ApplicationState) => state.jcuserrejectjobcard,
    JCUserRejectJobcardStore.actionCreators
)(JCUserRejectJobcardEditClass as any);