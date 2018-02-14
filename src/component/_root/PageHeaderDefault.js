import React, { Component } from 'react';

export default class PageHeaderDefault extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h4 className="page-header">{this.props.label}</h4>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.label !== nextProps.label;
    }
}
