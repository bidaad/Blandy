import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCNeedCategoryStore from '../../../store/JCNeedCategory';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCNeedCategory } from '../../../model/viewModel/VwJCNeedCategory';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type JCNeedCategoryProps =
    stateBase<VwJCNeedCategory> & typeof JCNeedCategoryStore.actionCreators & RouteComponentProps<{}>;
class JCNeedCategoryEdit extends React.PureComponent<JCNeedCategoryProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCNeedCategory;
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
                                <TTitle {...{ name: "JCNeedCategory.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JCNeedCategory.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'JCNeedCategory.EditForm.JobCardId', type: typeComponent.hidden, value:this.props.edit.jobCardId?this.props.edit.jobCardId: this.props.edit.parentId }} />
                                <Row>

                                    <Col md={6}>
                                        <SelectList {...{ label: "CategoryId name", valueId: this.props.edit.categoryId, valueName: this.props.edit.categorySign, name: "JCNeedCategory.EditForm.CategoryId", entityName: "categorysl" }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedCategory.EditForm.CategoryCount', type: typeComponent.number, value: this.props.edit.categoryCount }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedCategory.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedCategory.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCNeedCategory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCNeedCategory.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCNeedCategory.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jcneedcategory,
    JCNeedCategoryStore.actionCreators
)(JCNeedCategoryEdit as any);