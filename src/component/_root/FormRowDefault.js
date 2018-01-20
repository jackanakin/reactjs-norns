import React, { Component } from 'react';

export default class FormRowDefault extends Component {
    render() {
        return (
            <div className="row" style={{ marginTop: 15 + 'px' }}>
                {this.props.children}
            </div>
        );
    }
}