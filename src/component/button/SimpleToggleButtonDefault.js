import React, { Component } from 'react';

import Toggle from 'react-toggle';
import FormRowDefault from '../_root/FormRowDefault';
import "react-toggle/style.css"; // for ES6 modules

export default class SimpleToggleButtonDefault extends Component {
    render() {
        return (
            <FormRowDefault>
                <label className="col-md-3 col-sm-3 col-xs-6" htmlFor={this.props.id}>{this.props.label}
                </label>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <Toggle onChange={this.handleChange} defaultChecked={this.props.value} field={this.props.field} entity={this.props.entity}
                        id={this.props.id} onChange={this.props.onChange} kind="simpleToggleButton"/>
                </div>
            </FormRowDefault>
        );
    }
/*
    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value;
    }*/
}