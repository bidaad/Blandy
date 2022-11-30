import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as JCNeedProductStore from '../../../store/JCNeedProduct';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwJCNeedProduct } from '../../../model/viewModel/VwJCNeedProduct';
import { stateBase } from '../../../model/general/stateBase';
import SelectList from '../../../components/SelectList';
import TButton from '../../../components/TButton';
import { Directions } from '../../../model/general';


type JCNeedProductProps =
    stateBase<VwJCNeedProduct> & typeof JCNeedProductStore.actionCreators & RouteComponentProps<{}>;
class JCNeedProductEdit extends React.PureComponent<JCNeedProductProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwJCNeedProduct;
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
                                <TTitle {...{ name: "JCNeedProduct.EditForm" }} />
                            </Col> */}
                            <Form >
                                <InputBox {...{ name: 'JCNeedProduct.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
                                <InputBox {...{ name: 'JCNeedProduct.EditForm.JobCardId', type: typeComponent.hidden, value: this.props.edit.jobCardId ? this.props.edit.jobCardId : this.props.edit.parentId }} />

                                <Row>
                                    <Col md={6}>
                                        <SelectList {...{ label: "ProductId name", valueId: this.props.edit.productId, valueName: this.props.edit.productSign, name: "JCNeedProduct.EditForm.ProductId", entityName: "productsl" }} />
                                    </Col>
                                    <Col md={6}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedProduct.EditForm.ProductCount', type: typeComponent.number, value: this.props.edit.productCount }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedProduct.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'JCNeedProduct.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "JCNeedProduct.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "JCNeedProduct.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "JCNeedProduct.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.jcneedproduct,
    JCNeedProductStore.actionCreators
)(JCNeedProductEdit as any);