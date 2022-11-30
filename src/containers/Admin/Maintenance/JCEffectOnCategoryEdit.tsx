import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCEffectOnCategoryStore from '../../../store/JCEffectOnCategory';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCEffectOnCategory } from '../../../model/viewModel/VwJCEffectOnCategory';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type JCEffectOnCategoryProps =
    stateBase<VwJCEffectOnCategory> & typeof JCEffectOnCategoryStore.actionCreators & RouteComponentProps<{}>;
class JCEffectOnCategoryEdit extends React.PureComponent<JCEffectOnCategoryProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCEffectOnCategory;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
        const { history } = this.props;
        history.goBack();

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
                                <TTitle {...{ name: "JCEffectOnCategory.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JCEffectOnCategory.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'JCEffectOnCategory.EditForm.JobCardId', type: typeComponent.hidden, value:this.props.edit.jobCardId ?this.props.edit.jobCardId : this.props.edit.parentId }} />

                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "CategoryId name", valueId: this.props.edit.categoryId, valueName: this.props.edit.categoryCode, name: "JCEffectOnCategory.EditForm.CategoryId", entityName: "categorysl" }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCEffectOnCategory.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCEffectOnCategory.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCEffectOnCategory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCEffectOnCategory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCEffectOnCategory.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jceffectoncategory,
    JCEffectOnCategoryStore.actionCreators
)(JCEffectOnCategoryEdit as any);