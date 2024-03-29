import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import FormRowDefault from '../_root/FormRowDefault';

export default class SelectFormDefault extends Component {
    constructor() {
        super();
        this.state = { validationStyle: null, validationMessage: null };
    }

    render() {
        let validationSpan = null;
        let labelField = this.props.labelField;
        if (this.state.validationMessage !== null) {
            validationSpan = <span style={{ display: 'inline' }} className="label label-warning">{this.state.validationMessage}</span>;
        }

        let optionList = this.props.data.map(function (item) {
            return <option key={item.id} value={item.id}>{item[labelField]}</option>;
        });

        return (
            <FormRowDefault>
                <div className={this.state.validationStyle}>
                    <label className="col-md-3 col-sm-3 col-xs-6" htmlFor={this.props.id}>{this.props.label} </label>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <select id={this.props.id} value={this.props.value} onChange={this.props.onChange} className="form-control"
                            entity={this.props.entity} field={this.props.field}>
                            <option value={undefined}>Selecione</option>
                            {optionList}
                        </select>
                    </div>
                    {validationSpan}
                </div>
            </FormRowDefault>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.value !== nextProps.value || this.props.data !== nextProps.data;
    }

    componentDidMount() {
        PubSub.subscribe("validation-error", function (topico, error) {
            if (error.code === this.props.id) {
                this.setState({ validationMessage: error.defaultMessage, validationStyle: 'has-warning' });
                this.forceUpdate();
            }
        }.bind(this));
        PubSub.subscribe("clean-validation-error", function (topico) {
            this.setState({ validationMessage: null, validationStyle: null });
            this.forceUpdate();
        }.bind(this));
    }
}