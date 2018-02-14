import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class TableDefault extends Component {
    render() {
        return (
            <Table bordered responsive
                hover striped style={{ marginTop: 20 + 'px' }}>
                {this.props.head}
                <tbody>
                    {this.props.body}
                </tbody>
            </Table>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.body !== nextProps.body;
    }
}