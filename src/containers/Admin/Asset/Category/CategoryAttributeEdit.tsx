import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as CategoryAttributeStore from '../../../../store/CategoryAttribute';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwCategoryAttribute } from '../../../../model/viewModel/VwCategoryAttribute';
import { stateBase } from '../../../../model/general/stateBase';
import TAutoComplete from '../../../../components/TAutoComplete';
import TButton from '../../../../components/TButton';
import { Directions } from '../../../../model/general';


type CategoryAttributeProps =
    stateBase<VwCategoryAttribute> &
    typeof CategoryAttributeStore.actionCreators &
    RouteComponentProps<{}> &
    { closeModal: any, refreshGrid: any, parentId: string };

class CategoryAttributeEdit extends React.PureComponent<CategoryAttributeProps, { parentId: string }> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            parentId: this.props.parentId,
        }
    }
    handleSubmit(event: any) {
        event.preventDefault();

        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwCategoryAttribute;
        if (((senddata) as VwCategoryAttribute).id) {
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
                            <Form className="edit-form">
                                <InputBox {...{ name: 'CategoryAttribute.EditForm.id', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'CategoryAttribute.EditForm.CategoryId', type: typeComponent.hidden, value: this.props.edit.categoryId ? this.props.edit.categoryId : this.props.edit.parentId }} />
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'CategoryAttribute.EditForm.value', type: typeComponent.textArea, value: this.props.edit.value }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox  {...{ name: 'CategoryAttribute.EditForm.isActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>

                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <TAutoComplete {...{ controller: "HCAttributeTitle", action: "GetHCList", selectName: "sign", valueId: this.props.edit.hcattributeTitleId, name: "CategoryAttribute.EditForm.HCAttributeTitleId", valueName: this.props.edit.sign }} />
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
                          name: "CategoryAttribute.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "CategoryAttribute.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={2} >
                                        <TButton {...{ name: "CategoryAttribute.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.categoryattributes,
    CategoryAttributeStore.actionCreators
)(CategoryAttributeEdit as any);