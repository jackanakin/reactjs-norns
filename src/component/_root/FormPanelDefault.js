import React, { Component } from 'react';

export default class FormPanelDefault extends Component {
    render() {
        return (
            <div className="panel panel-default">
                {this.props.children}
            </div>
        );
    }
}