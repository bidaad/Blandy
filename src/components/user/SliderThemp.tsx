import React, { Component } from 'react';
import { ApplicationState } from '../../store';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

export interface SliderProps { value: number, title: string }

type InputProps =
    UserInfo.UserInfoState &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> &
    SliderProps;
class Slider_Themp extends Component<InputProps, { value: any, id: any, name: string }> {
    constructor(props: any) {
        super(props);
        this.state = { value: this.props.value, id: Math.floor((Math.random() * 10000) + 1), name: '' }

    }
    componentDidMount() {

        // if (this.state.value === 1) {
        //   this.setState({name:'بد'});
        //   $('#' + this.state.id).css('right', this.state.value * 0 + '%');
        // }
        // if (this.state.value === 2) {
        //     this.setState({name:'بد'});
        //     $('#' + this.state.id).css('right', this.state.value * 14 + '%');
        //   }
        //   if (this.state.value === 3) {
        //     this.setState({name:'معمولی'});
        //     $('#' + this.state.id).css('right', this.state.value * 19 + '%');
        //   }
        //   if (this.state.value === 4) {
        //     this.setState({name:'معمولی'});
        //     $('#' + this.state.id).css('right', this.state.value * 21.5 + '%');
        //   }

    }
    public render() {
        return (
            <div className="User_Comments_Rank_Row_Rang">
                {/* <input className="User_Comments_Rank-Rang" disabled={true} type="range" max="4" min="1" defaultValue={this.props.value} /> */}
                <div id={this.state.id} style={{right: this.state.value - 20 + '%'}} className="User_Comments_Slider-Thumb">{this.props.title}</div>
            </div>

        )
    }
}



export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(Slider_Themp as any);