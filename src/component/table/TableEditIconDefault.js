import React, { Component } from 'react';

export default class TableEditIconDefault extends Component {
    render() {
        return (
            <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'blue' }} className="fa fa-pencil fa-2x"
                onClick={this.props.onClick} />
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.onClick !== nextProps.onClick;
    }
}