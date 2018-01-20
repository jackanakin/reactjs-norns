import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class SaveFormDefault extends Component {
    render() {
        return (
            <Button onSubmit={this.props.onSubmit} style={{ width: 120 + 'px' }}
                type="submit" className="btn btn-success">Salvar</Button>
        );
    }
}