import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import PubSub from 'pubsub-js';
import { toast } from 'react-toastify';
import * as _AppUtil from '../../_util/AppUtil';
import * as _PresentationalUtil from '../../_util/PresentationalUtil';

import FormHeaderDefault from '../../component/_root/FormHeaderDefault';
import FormPanelDefault from '../../component/_root/FormPanelDefault';
import FormRowDefault from '../../component/_root/FormRowDefault';
import PageHeaderDefault from '../../component/_root/PageHeaderDefault';

import InputTextFormDefault from '../../component/input/InputTextFormDefault';
import InputNumberMaskForm from '../../component/input/InputNumberMaskForm';
import SwitchFormDefault from '../../component/input/SwitchFormDefault';
import SelectFormDefault from '../../component/input/SelectFormDefault';

import SaveFormDefault from '../../component/button/SaveFormDefault';
import CancelFormDefault from '../../component/button/CancelFormDefault';
import CancelAddDefault from '../../component/button/CancelAddDefault';
import AddButtonFormDefault from '../../component/button/AddButtonFormDefault';

import DeviceContainer from './DeviceContainer';

import Sensor from '../../entity/Sensor';
import Device from '../../entity/Device';

export default class DevicePresentational extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.match.params.id !== undefined && this.props.match.params.id != null) {
            this.props.store.dispatch(DeviceContainer.fetchDevice(this.props.match.params.id));
            this.props.history.push('/dispositivos');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== undefined && nextProps.match.params.id !== null) {
            this.props.store.dispatch(DeviceContainer.fetchDevice(nextProps.match.params.id));
            this.props.history.push('/dispositivos');
        }
    }

    render() {
        return (
            <div>
                <div className="panel-body">
                    <PageHeaderDefault label="Dispositivos" />
                    <ul className="nav nav-tabs">
                        <li id="liFormTab" className="active"><a href="#formTab" data-toggle="tab">Cadastro</a>
                        </li>
                        <li id="liListTab"><a href="#listTab" data-toggle="tab">Localizar</a>
                        </li>
                    </ul>
                    <div className="tab-content" style={{ marginTop: 20 + 'px' }}>
                        <div className="tab-pane fade in active" id="formTab">
                            <DeviceForm store={this.props.store}
                                history={this.props.history} />
                        </div>
                        <div className="tab-pane fade" id="listTab">
                            <DeviceList store={this.props.store} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

class DeviceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor: new Sensor(), device: new Device(),
            sensor_auto: false, sensorList: [], sensor_intervalList: [], deviceList: []
        };
    }

    componentDidMount() {
        this.props.store.dispatch(DeviceContainer.fetchAllInterval());
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ sensor_intervalList: this.props.store.getState().enumReducer.sensor_intervalList });
        });
        this.props.store.subscribe(() => {
            this.setState({ deviceList: this.props.store.getState().deviceReducer.deviceList });
        });
        this.props.store.subscribe(() => {
            this.setState({ sensorList: this.props.store.getState().deviceReducer.sensorList });
        });
        this.props.store.subscribe(() => {
            this.setState({ sensor: this.props.store.getState().deviceReducer.sensor });
        });
        this.props.store.subscribe(() => {
            this.setState({ device: this.props.store.getState().deviceReducer.device });
        });
    }

    saveState = (fieldName, event) => {
        var stateField = {};
        stateField[fieldName] = event.target.value;
        this.setState(stateField);
    }

    toggleSwitch = (fieldName, value) => {
        var stateField = {};
        stateField[fieldName] = !value;
        this.setState(stateField);
    }

    saveEntity = (fieldName, entityName, event) => {
        let obj = this.state[entityName];

        // event.target === undefined --> ToggleSwitch
        if (event.target === undefined) {
            // If got here it's a toggle switch and: event = value = boolean
            obj[fieldName] = event;
        } else {
            obj[fieldName] = event.target.value;
        }
        this.setState(obj);
    }

    addSensor = (e) => {
        e.preventDefault();
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();
        this.props.store.dispatch(DeviceContainer.addSensor(JSON.stringify(this.state.sensor)));
    }

    submitForm = (e) => {
        e.preventDefault();
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();

        let deviceTemp = this.state.device;
        deviceTemp.sensorList = this.state.sensorList;
        this.props.store.dispatch(DeviceContainer.saveDevice(JSON.stringify(deviceTemp)));
    }

    removeSensor = (uuid) => {
        this.props.store.dispatch(DeviceContainer.removeSensor(uuid));
    }

    setSensor = (uuid) => {
        this.props.store.dispatch(DeviceContainer.setSensor(uuid));
    }

    resetSensor = (uuid) => {
        this.props.store.dispatch(DeviceContainer.resetSensor());
    }

    resetDevice = () => {
        this.props.history.push('/dispositivos');
        this.props.store.dispatch(DeviceContainer.resetDevice());
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                        <FormPanelDefault>
                            <FormHeaderDefault label="Configurações Gerais" />
                            <div className="panel-body">
                                <InputNumberMaskForm type="text" value={this.state.device.ipv4} onChange={this.saveEntity.bind(this, 'ipv4', "device")}
                                    label="Endereço IPv4*" id="device_ipv4" format="###.###.###.###" />
                                <InputNumberMaskForm type="text" value={this.state.device.port} onChange={this.saveEntity.bind(this, 'port', "device")}
                                    label="Porta (SNMP)*" id="device_port" />
                                <InputTextFormDefault value={this.state.device.description} onChange={this.saveEntity.bind(this, 'description', "device")}
                                    label="Descrição" id="device_description" />
                                <SwitchFormDefault value={this.state.device.status} onChange={this.saveEntity.bind(this, 'status', "device", !this.state.device.status)}
                                    id="device_status" offText="NÃO" onText="SIM" offColor="danger" onColor="success" label="Habilitado" />
                            </div>
                        </FormPanelDefault>

                        <FormPanelDefault>
                            <FormHeaderDefault label="Sensores" />
                            <div className="panel-body">
                                <SwitchFormDefault disabled value={this.state.sensor_auto} onChange={this.toggleSwitch.bind(this, 'sensor_auto', this.state.sensor_auto)}
                                    id="sensor_method" label="Método" offText="MANUAL" onText="AUTOMÁTICO" offColor="warning" />
                                <InputTextFormDefault value={this.state.sensor.name} onChange={this.saveEntity.bind(this, "name", "sensor")}
                                    label="Nome*" id="sensor_name" />
                                <InputTextFormDefault value={this.state.sensor.oid} onChange={this.saveEntity.bind(this, "oid", "sensor")}
                                    label="OID*" id="sensor_oid" />
                                <SelectFormDefault value={this.state.sensor.interval} onChange={this.saveEntity.bind(this, "interval", "sensor")}
                                    data={this.state.sensor_intervalList} id="sensor_interval" label="Intervalo*" />
                                <SwitchFormDefault value={this.state.sensor.status} onChange={this.saveEntity.bind(this, "status", "sensor", !this.state.sensor.status)}
                                    offText="NÃO" onText="SIM" offColor="danger" onColor="success" id="sensor_status" label="Habilitado" />
                                <FormRowDefault>
                                    <div className="col-md-3 col-sm-3 col-xs-6" />
                                    <AddButtonFormDefault onClick={this.addSensor} />
                                    <CancelAddDefault onClick={this.resetSensor} />
                                </FormRowDefault>

                                <SensorTable data={this.state.sensorList} onRemove={this.removeSensor} onEdit={this.setSensor} />
                            </div>
                        </FormPanelDefault>
                        <SaveFormDefault onSubmit={this.props.onSubmit} />
                        <div style={{ display: 'inline', marginLeft: 20 + 'px' }} >
                            <CancelFormDefault onClick={this.resetDevice} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class SensorTR extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.oid}</td>
                <td>{this.props.obj.interval_name}</td>
                <td>{this.props.obj.status_name}</td>
                <td>
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'red' }} className="fa fa-trash-o fa-2x"
                        onClick={this.props.onRemove.bind(this,
                            this.props.obj.uuid
                        )} />
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'blue' }} className="fa fa-pencil fa-2x"
                        onClick={this.props.onEdit.bind(this,
                            this.props.obj.uuid
                        )} />
                </td>
            </tr>
        )
    }
}

class SensorTable extends Component {
    render() {
        let body = this.props.data.map(obj =>
            <SensorTR key={!obj.id ? obj.uuid : obj.id} obj={obj} onRemove={this.props.onRemove} onEdit={this.props.onEdit} />
        );

        return (
            <Table bordered responsive
                hover striped style={{ marginTop: 20 + 'px' }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>OID</th>
                        <th>Intervalo</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        );
    }
}

class DeviceList extends Component {
    constructor() {
        super();
        this.state = {
            page: 1, size: 5,
            totalPages: 1, deviceList: []
        };
    }
    componentDidMount() {
        this.props.store.dispatch(DeviceContainer.fetchDevicePage(this.state.size, this.state.page));
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ deviceList: this.props.store.getState().deviceReducer.deviceList });
        });
        this.props.store.subscribe(() => {
            this.setState({ totalPages: this.props.store.getState().deviceReducer.totalPages });
        });
    }

    pagination = (eventKey) => {
        this.setState({
            page: eventKey
        });
        this.props.store.dispatch(DeviceContainer.fetchDevicePage(this.state.size, eventKey));
    }

    showForm = () => {
        _PresentationalUtil.gTriggerTabPanel('liListTab', 'listTab', 'liFormTab', 'formTab');
    }

    render() {
        let body = this.state.deviceList.map(obj =>
            <DeviceTR key={obj.id} obj={obj} onEdit={this.showForm} />
        );

        return (
            <div>
                <FormRowDefault>
                    <Table bordered responsive
                        hover striped style={{ marginTop: 20 + 'px' }}>
                        <thead>
                            <tr>
                                <th>Endereço IP</th>
                                <th>Porta</th>
                                <th>Status</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>{body}</tbody>
                    </Table>
                </FormRowDefault>
                <FormRowDefault>
                    <Pagination
                        first
                        next
                        prev
                        last
                        ellipsis
                        items={this.state.totalPages}
                        maxButtons={3}
                        activePage={this.state.page}
                        onSelect={this.pagination}
                    />
                </FormRowDefault>
            </div>
        );
    }
}

class DeviceTR extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.ipv4}</td>
                <td>{this.props.obj.port}</td>
                <td>{this.props.obj.status.name}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link to={`/dispositivos/${this.props.obj.id}`} >
                        <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'blue' }} className="fa fa-pencil fa-2x"
                            onClick={this.props.onEdit.bind(this)} />
                    </Link>
                </td>
            </tr>
        )
    }
}