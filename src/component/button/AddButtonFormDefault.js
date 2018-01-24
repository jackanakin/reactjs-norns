import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class AddButtonFormDefault extends Component {
    render() {
        return (
            <Button onClick={this.props.onClick} style={{ width: 120 + 'px' }}
                type="button" className="btn btn-primary form-control col-md-7 col-xs-12">Adicionar</Button>
        );
    }
}