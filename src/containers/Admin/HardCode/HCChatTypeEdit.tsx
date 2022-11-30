import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import * as HCChatTypeStore from '../../../store/HCChatType';

import { Container, Form, Row, Col } from 'react-bootstrap';

import InputBox from '../../../components/InputBox';
import { typeComponent } from '../../../model/general/typeComponent';
import { convertToObject, serialize } from '../../../helper/serialize';
import { VwHCChatType } from '../../../model/viewModel/VwHCChatType';
import { stateBase } from '../../../model/general/stateBase';
 
import TButton from '../../../components/TButton';
import TTitle from '../../../components/TTitle';
import { Directions } from '../../../model/general';
 



type HCChatTypeProps =
    stateBase<VwHCChatType> & typeof HCChatTypeStore.actionCreators & RouteComponentProps<{}>;
class EditHCChatType
 extends React.PureComponent<HCChatTypeProps> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {

        event.preventDefault();
        const sdata = serialize(event.target.form);
        const senddata = convertToObject(sdata) as VwHCChatType;
        this.props.saveData(senddata);

    }

    getLabel = (label: string) => {
        return label;
    }
    getAccess = (label: string) => {
        return label;
    }

    gotoBackPage = () => {
		this.props.ChangeTab('','EditHCChatType','HCChatType');

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
                <Container className={"form-container"+Rtl}>
                    <Row>
                        <Col md={12} className="T-container">
                            <Col md={12} className="T-header">
                                <TTitle {...{ name: "HCChatType.EditForm" }} />
                            </Col>
                            <Form >
                                <InputBox {...{ name: 'HCChatType.EditForm.ID', type: typeComponent.hidden, value: this.props.edit.id }} />
<Row>
<Col md={6}>
<InputBox { ...{ name: 'HCChatType.EditForm.Code', type: typeComponent.text, value: this.props.edit.code }} />
</Col>
<Col md={6}>
<InputBox {...{ name: 'HCChatType.EditForm.Sign', type: typeComponent.textArea, value: this.props.edit.sign }} />
</Col>
</Row>
<Row>
<Col md={6}>
<InputBox {...{ name: 'HCChatType.EditForm.Icon', type: typeComponent.textArea, value: this.props.edit.icon }} />
</Col>
<Col md={6}>
<InputBox { ...{ name: 'HCChatType.EditForm.OrderBy', type: typeComponent.number, value: this.props.edit.orderBy }} />
</Col>
</Row>
<Row>
<Col md={6}>
<InputBox { ...{ name: 'HCChatType.EditForm.Description', type: typeComponent.text, value: this.props.edit.description }} />
</Col>
<Col md={6}>
<InputBox { ...{ name: 'HCChatType.EditForm.IsActive', type: typeComponent.check, value: this.props.edit.isActive }} />
</Col>

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
                        name: "HCChatType.EditForm.Creator",
                        size: 6,
                        value: this.props.edit.creator,
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <TTitle
                      {...{
                        name: "HCChatType.EditForm.updator",
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
                          name: "HCChatType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                          isloading: true,
                        }}
                      />
                     : 
                      <TButton
                        {...{
                          name: "HCChatType.EditForm.BTN_Save",
                          submit: this.handleSubmit,
                        }}
                      />
                    }
                                    </Col>
                                    <Col md={1}>
                                        <TButton {...{ name: "HCChatType.EditForm.BTN_Back", variant: "outline-info", submit: this.gotoBackPage }} />
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
    (state: ApplicationState) => state.hcchattype, 
    HCChatTypeStore.actionCreators 
)(EditHCChatType as any);