import React, { Component } from 'react';

import Switch from 'react-bootstrap-switch';
import bootstrap_switch_css from '../../../node_modules/react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css';

import FormRowDefault from '../_root/FormRowDefault';

export default class SwitchFormDefault extends Component {
    render() {
        return (
            <FormRowDefault>
                <label className="col-md-3 col-sm-3 col-xs-6" htmlFor={this.props.id}>{this.props.label}
                </label>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <Switch disabled={this.props.disabled} field={this.props.field} entity={this.props.entity}
                        offText={this.props.offText} onText={this.props.onText} offColor={this.props.offColor} onColor={this.props.onColor}
                        id={this.props.id} className="form-control col-md-7 col-xs-12" value={this.props.value} onChange={this.props.onChange} />
                </div>
            </FormRowDefault>
        );
    }
}