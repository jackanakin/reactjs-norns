import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class CancelAddDefault extends Component {
    render() {
        return (
            <Button onClick={this.props.onClick} type="button" className="btn btn-warning form-control col-md-7 col-xs-12"
                style={{ width: 120 + 'px', marginLeft: 15 + 'px' }}>Cancelar</Button>
        );
    }
}