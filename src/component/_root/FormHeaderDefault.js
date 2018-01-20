import React, { Component } from 'react';

export default class FormHeaderDefault extends Component {
    render() {
        return (
            <div className="panel-heading">
                {this.props.label}
            </div>
        );
    }
}
