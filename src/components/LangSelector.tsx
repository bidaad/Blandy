import React from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as UserInfoStore from '../store/UserInfo';
import { langs, Language, Directions } from '../model/general';


type LayoutProps =
    UserInfoStore.UserInfoState &
    typeof UserInfoStore.actionCreators;


class LangSelector extends React.PureComponent<LayoutProps, { children?: React.ReactNode }> {
    constructor(props: any) {
        super(props);
    }
    changeDirection = (dir: Directions,lang:Language) => {
        if (dir === Directions.RTL)
            this.props.SetDirection(1,lang);
        else
            this.props.SetDirection(2,lang);
    }


    render() {

        return (
            <div className="ltr">
                <div className="btn-group small-size">
                <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Change Language</span>
                    </button>
                    <button type="button" className="btn btn-light">انتخاب زبان</button>
                    
                    <div className="dropdown-menu">
                        {
                            langs.map((l: Language) =>
                                <button key={l.abr} className="dropdown-item" onClick={() => this.changeDirection(l.direction,l)}>{l.abr}</button>
                            )
                        }

                    </div>
                </div>
            </div>
        )

    }
}

export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfoStore.actionCreators
)(LangSelector);

