import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import NumberFormat from 'react-number-format';
import PubSub from 'pubsub-js';

import FormRowDefault from '../_root/FormRowDefault';

export default class ToggleButtonGroupDefault extends Component {
    constructor() {
        super();
        this.state = { validationStyle: null, validationMessage: null };
    }

    render() {
        let buttonList = this.props.buttonList.map(obj =>
            <ToggleButton key={obj.value} value={obj.value}>{obj.name}</ToggleButton>
        );

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
                        <ToggleButtonGroup name={this.props.id} type={this.props.type}
                            value={this.props.value} onChange={this.props.onChange}>
                            {buttonList}
                        </ToggleButtonGroup>
                    </div>
                    {validationSpan}
                </div>
            </FormRowDefault >
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value;
    }
}