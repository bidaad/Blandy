import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as UserOpinionStore from '../../../../store/UserOpinion';
import * as UserOpinionAssetStore from '../../../../store/UserOpinionAsset';
import * as UserOpinionUserStore from '../../../../store/UserOpinionUser';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwUserOpinion } from '../../../../model/viewModel/VwUserOpinion';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';


type UserOpinionProps =
    stateBase<VwUserOpinion> & typeof UserOpinionStore.actionCreators & RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string, typeForm?: string };
class UserOpinionEdit extends React.PureComponent<UserOpinionProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwUserOpinion;
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
                                <InputBox {...{ name: 'UserOpinion.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />

                                {this.props.typeForm === "asset" ?
                                    <Row>
                                        <Col md={6}>
                                            <SelectList {...{ label: "UserId name", valueId: this.props.edit.userId, valueName: this.props.edit.senderFullName, name: "UserOpinion.EditForm.UserId", entityName: "usersl" }} />
                                            <InputBox {...{ name: 'UserOpinion.EditForm.AssetId', type: typeComponent.hidden, value: this.props.edit.assetId ? this.props.edit.assetId : this.props.edit.parentId }} />
                                        </Col>
                                    </Row>
                                    : this.props.typeForm === "user" ?
                                        <Row>
                                            <Col md={6}>
                                                <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "UserOpinion.EditForm.AssetId", entityName: "assetsl" }} />
                                                <InputBox {...{ name: 'UserOpinion.EditForm.UserId', type: typeComponent.hidden, value: this.props.edit.userId ? this.props.edit.userId : this.props.edit.parentId }} />
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col md={6}>
                                                <SelectList {...{ label: "AssetId name", valueId: this.props.edit.assetId, valueName: this.props.edit.productSign, name: "UserOpinion.EditForm.AssetId", entityName: "assetsl" }} />
                                                <InputBox {...{ name: 'UserOpinion.EditForm.UserId', type: typeComponent.hidden, value: this.props.edit.userId ? this.props.edit.userId : this.props.edit.parentId }} />
                                            </Col>
                                            <Col md={6}>
                                                <SelectList {...{ label: "UserId name", valueId: this.props.edit.userId, valueName: this.props.edit.senderFullName, name: "UserOpinion.EditForm.UserId", entityName: "usersl" }} />
                                            </Col>
                                        </Row>
                                }

                                <Row>

                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.Subject', type: typeComponent.text, value: this.props.edit.subject }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.Opinion', type: typeComponent.textArea, value: this.props.edit.opinion }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.ExpertComment', type: typeComponent.textArea, value: this.props.edit.expertComment }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.ShowIt', type: typeComponent.check, value: this.props.edit.showIt }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.Star', type: typeComponent.number, value: this.props.edit.star }} />
                                    </Col>
                                    <Col md={6}>
                                        <SelectList {...{ label: "Parent name", valueId: this.props.edit.opinionParentId, valueName: this.props.edit.parentName, name: "UserOpinion.EditForm.opinionParentId", entityName: "useropinion", noselectId: this.props.edit.id }} />
                                    </Col> </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'UserOpinion.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col> </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}><TTitle {...{ name: "UserOpinion.EditForm.Creator", size: 6, value: this.props.edit.creator }} /></Col>
                                    <Col md={6}><TTitle {...{ name: "UserOpinion.EditForm.updater", size: 6, value: this.props.edit.updater }} /></Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "UserOpinion.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "UserOpinion.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "UserOpinion.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment >
        );
    }
}
export default connect(
    (state: ApplicationState) => state.useropinion,
    UserOpinionStore.actionCreators
)(UserOpinionEdit as any);

class UserOpinionAssetEditClass extends UserOpinionEdit {
}

export const UserOpinionAssetEdit = connect(
    (state: ApplicationState) => state.useropinionasset,
    UserOpinionAssetStore.actionCreators
)(UserOpinionAssetEditClass as any);

class UserOpinionUserEditClass extends UserOpinionEdit {
}

export const UserOpinionUserEdit = connect(
    (state: ApplicationState) => state.useropinionuser,
    UserOpinionUserStore.actionCreators
)(UserOpinionUserEditClass as any);