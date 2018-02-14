import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class CancelFormDefault extends Component {
    render() {
        return (
            <Button onClick={this.props.onClick} type="button" className="btn btn-danger"
                style={{ width: 120 + 'px' }}>Cancelar</Button>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.onClick !== nextProps.onClick;
    }
}