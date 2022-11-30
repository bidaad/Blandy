import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../../store';
import * as DepBrandStore from '../../../../store/DepBrand';
import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../../components/InputBox';
import { typeComponent } from '../../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../../helper/serialize';
import { VwDepBrand } from '../../../../model/viewModel/VwDepBrand';
import { stateBase } from '../../../../model/general/stateBase';
import SelectList from '../../../../components/SelectList';
import TButton from '../../../../components/TButton';
import TTitle from '../../../../components/TTitle';
import { Directions } from '../../../../model/general';


type DepBrandProps =
    stateBase<VwDepBrand> & typeof DepBrandStore.actionCreators & RouteComponentProps<{}>  & { closeModal: any, refreshGrid: any, parentId: string };
class DepBrandEdit extends React.PureComponent<DepBrandProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwDepBrand;
        if(((senddata) as any).ID)
        {
            this.props.saveData(senddata);
        }
        else
        {
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
        this.props.ChangeTab('','DepBrandEdit','DepBrand');
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
                                <TTitle {...{ name: "DepBrand.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'DepBrand.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />

                                <InputBox {...{ name: 'DepBrand.EditForm.DepId', type: typeComponent.hidden,  value: this.props.edit.depId?this.props.edit.depId:this.props.edit.parentId}} />
                                <Row>
                                    <Col md={12}>
                                        <SelectList {...{ label: "BrandId name", valueId: this.props.edit.brandId, valueName: this.props.edit.sign, name: "DepBrand.EditForm.BrandId", entityName: "brandsl" }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepBrand.EditForm.IsDefault', type: typeComponent.check, value: this.props.edit.isDefault }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepBrand.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputBox {...{ name: 'DepBrand.EditForm.Description', type: typeComponent.textArea, value: this.props.edit.description }} />
                                    </Col>
                                </Row>


                                <Row className="mt-2">
                                    <Col md={1}>
                                          {this.props.saveLoading === true ? 
                      <TButton
                        {...{
                          name: "DepBrand.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "DepBrand.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "DepBrand.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.depbrand,
    DepBrandStore.actionCreators
)(DepBrandEdit as any);