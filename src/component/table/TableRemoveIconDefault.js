import React, { Component } from 'react';

export default class TableRemoveIconDefault extends Component {
    render() {
        return (
            <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'red' }} className="fa fa-trash-o fa-2x"
                onClick={this.props.onClick} />
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.onClick !== nextProps.onClick;
    }
}