import React, { Component } from 'react'

export class ShowMessage extends Component<{ msg: string | undefined }> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
    }

    render() {
        if (this.props.msg === undefined || this.props.msg === '')
            return null;
        return (
            <div className="error">
                <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                {this.props.msg}
            </div>
        )
    }
}
