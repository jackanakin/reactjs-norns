import React, { Component } from 'react';

import NumberFormat from 'react-number-format';
import PubSub from 'pubsub-js';

import FormRowDefault from '../_root/FormRowDefault';

export default class InputNumberMaskForm extends Component {
    constructor() {
        super();
        this.state = { validationStyle: null, validationMessage: null };
    }

    render() {
        let validationSpan = null;
        if (this.state.validationMessage !== null) {
            validationSpan = <span style={{ display: 'inline' }} className="label label-warning">{this.state.validationMessage}</span>;
        }

        return (
            <FormRowDefault>
                <div className={this.state.validationStyle}>
                    <label className="col-md-3 col-sm-3 col-xs-6" htmlFor={this.props.id}> {this.props.label}
                    </label>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <NumberFormat type={this.props.type} format={this.props.format} mask={this.props.mask}
                            className="form-control col-md-7 col-xs-12" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
                    </div>
                    {validationSpan}
                </div>
            </FormRowDefault >
        );
    }

    componentDidMount() {
        PubSub.subscribe("validation-error", function (topico, error) {
            if (error.code === this.props.id) {
                this.setState({ validationMessage: error.defaultMessage, validationStyle: 'has-warning' });
            }
        }.bind(this));
        PubSub.subscribe("clean-validation-error", function (topico) {
            this.setState({ validationMessage: null, validationStyle: null });
        }.bind(this));
    }
}