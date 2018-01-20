import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import FormRowDefault from '../_root/FormRowDefault';

export default class AddButtonFormDefault extends Component {
    render() {
        return (
            <Button onClick={this.props.onClick} style={{ width: 120 + 'px' }}
                type="button" className="btn btn-primary form-control col-md-7 col-xs-12">Adicionar</Button>
        );
    }
}

/**
 *  <FormRowDefault>
                <label className="col-md-3 col-sm-3 col-xs-6" />
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <Button onClick={this.props.onClick} style={{ width: 120 + 'px' }}
                        type="button" className="btn btn-primary form-control col-md-7 col-xs-12">Adicionar</Button>
                </div>
            </FormRowDefault>
 */