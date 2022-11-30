import React, { Component } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
export interface BestSellProps {
  controller: string;
  action: string;
  min: number;
  max: number;
  changeHandler: any;
  changeCompleteHandler: any;
  changeCompleteTextboxMax: any;
  clear: any;
}

type InputProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  RouteComponentProps<{}> &
  BestSellProps;
class Price_Range extends Component<
  InputProps,
  { value: any; textValue: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: { min: this.props.min, max: this.props.max },
      textValue: { min: this.props.min, max: this.props.max },
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.clear !== nextProps.clear) {
      this.setState( {
        value: { min: 0, max: 50000000 },
        textValue: { min: 0, max: 50000000 },
      });
    }
  }
  changeSlider = (e: any) => {
    this.props.changeHandler(e);
    this.setState({ value: { min: e.min, max: e.max } });
  };
  changeCompleteSlider = (e: any) => {
    this.props.changeCompleteHandler(e);
    this.setState({
      value: { min: e.min, max: e.max },
      textValue: { min: e.min, max: e.max },
    });
  };
  KeyUpMax = (e: any) => {
     if (e.keyCode === 13) {
      const ev = { min: Number, max: Number };
      ev.max = this.state.textValue.max;
      ev.min = this.state.textValue.min;
      this.props.changeCompleteTextboxMax(ev);
    }
  };
  ChangeMax = (e: any) => {
     this.setState({
      textValue: {
        min: this.state.textValue.min,
        max: e.currentTarget.value as number,
      },
    });
  };
  KeyUpMin = (e: any) => {
    if (e.keyCode === 13) {
      const ev = { min: Number, max: Number };
      ev.max = this.state.textValue.max;
      ev.min = this.state.textValue.min;
      this.props.changeCompleteTextboxMax(ev);
    }
  };
  ChangeMin = (e: any) => {
     this.setState({
      textValue: { min: e.currentTarget.value, max: this.state.textValue.max },
    });
  };
  public render() {
    return (
      <div>
        <div className="Price_Slider_Container">
          <InputRange
            maxValue={this.props.max}
            minValue={this.props.min}
            value={this.state.value}
            onChange={this.changeSlider}
            onChangeComplete={this.changeCompleteSlider}
          />
        </div>
        {/* formatAndEncCurrency(this.state.value.max) */}
        <div className="Price_Slider_Text">
          <span>از</span>
          <input
            type="number"
            className="input-text-price"
            defaultValue={this.state.textValue.min}
            value={this.state.textValue.min}
            onKeyUp={this.KeyUpMin}
            onChange={this.ChangeMin}
          ></input>
          <span>تا</span>
          <input
            type="number"
            className="input-text-price"
             defaultValue={this.state.textValue.max}
            value={this.state.textValue.max}
            onKeyUp={this.KeyUpMax}
            onChange={this.ChangeMax}
          ></input>
          <span>تومان</span>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(Price_Range as any);
