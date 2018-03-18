import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Tab, Tabs } from 'react-bootstrap';
import PubSub from 'pubsub-js';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

import FormHeaderDefault from '../../component/_root/FormHeaderDefault';
import FormPanelDefault from '../../component/_root/FormPanelDefault';
import FormRowDefault from '../../component/_root/FormRowDefault';
import PageHeaderDefault from '../../component/_root/PageHeaderDefault';
import TableDefault from '../../component/table/TableDefault';

import InputTextFormDefault from '../../component/input/InputTextFormDefault';
import InputNumberMaskForm from '../../component/input/InputNumberMaskForm';
import SwitchFormDefault from '../../component/input/SwitchFormDefault';
import SelectFormDefault from '../../component/input/SelectFormDefault';

import SaveFormDefault from '../../component/button/SaveFormDefault';
import CancelFormDefault from '../../component/button/CancelFormDefault';
import CancelAddDefault from '../../component/button/CancelAddDefault';
import AddButtonFormDefault from '../../component/button/AddButtonFormDefault';
import ToggleButtonGroupDefault from '../../component/button/ToggleButtonGroupDefault';
import TableEditIconDefault from '../../component/table/TableEditIconDefault';
import TableRemoveIconDefault from '../../component/table/TableRemoveIconDefault';

import DeviceContainer from './DeviceContainer';
import * as TableHeader from './TableHeader';

import Sensor from '../../entity/Sensor';
import Device from '../../entity/Device';

class DevicePresentational extends Component {
    constructor() {
        super();
        this.state = {
            page: 1, size: 10, tabKey: 1,
            totalPages: 1, deviceList: []
        };
    }

    componentDidMount() {
        this.loadDataTable(null);
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

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ deviceList: this.props.store.getState().deviceReducer.deviceList });
        });
        this.props.store.subscribe(() => {
            this.setState({ totalPages: this.props.store.getState().deviceReducer.totalPages });
        });
        this.props.store.subscribe(() => {
            this.setState({ tabKey: this.props.store.getState().deviceReducer.tabKey });
        });
    }

    loadDataTable = (eventKey) => {
        let pageNumber = eventKey;
        if (pageNumber !== null && pageNumber !== NaN && pageNumber !== undefined) {
            this.setState({
                page: pageNumber
            });
        } else {
            pageNumber = this.state.page;
        }
        this.props.store.dispatch(DeviceContainer.fetchDevicePage(this.state.size, pageNumber));
    }

    handleTabChange = (key) => {
        this.props.store.dispatch(DeviceContainer.setTabKey(key));
    }

    render() {
        return (
            <div>
                <div className="panel-body">
                    <PageHeaderDefault label="Dispositivos" />
                    <Tabs defaultActiveKey={this.state.tabKey} activeKey={this.state.tabKey}
                        onSelect={this.handleTabChange} id="configurationTab">
                        <Tab tabClassName="myFormTabItem" style={{ marginTop: 20 + 'px' }} eventKey={1} title="Cadastro">
                            <DeviceForm store={this.props.store} loadDataTable={this.loadDataTable}
                                history={this.props.history} />
                        </Tab>
                        <Tab className="myFormTabItem" eventKey={2} title="Localizar">
                            <DeviceList store={this.props.store} data={this.state} loadDataTable={this.loadDataTable} />
                        </Tab>
                    </Tabs>
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
            sensor_auto: false, sensorList: [],
            sensor_intervalList: [], device_snmpList: [], device_sifCollectorList: [],
            device_sensorKindList: [], device_authenticationProfileList: [], device_communityProfileList: []
        };
        this.handleChange.bind(this);
        this.sensorIntervalhandleChange.bind(this);
    }

    componentDidMount() {
        this.props.store.dispatch(DeviceContainer.fetchAllSifCollector());
        this.props.store.dispatch(DeviceContainer.fetchDeviceCommunityProfile());
        this.props.store.dispatch(DeviceContainer.fetchDeviceAuthenticationProfile());
        this.props.store.dispatch(DeviceContainer.fetchAllInterval());
        this.props.store.dispatch(DeviceContainer.fetchAllSnmp());
        this.props.store.dispatch(DeviceContainer.fetchAllSensorKind());
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ sensor_intervalList: this.props.store.getState().deviceReducer.sensor_intervalList });
        });
        this.props.store.subscribe(() => {
            this.setState({ device_snmpList: this.props.store.getState().deviceReducer.device_snmpList });
        });
        this.props.store.subscribe(() => {
            this.setState({ device_sensorKindList: this.props.store.getState().deviceReducer.device_sensorKindList });
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
        this.props.store.subscribe(() => {
            this.setState({ device_sifCollectorList: this.props.store.getState().deviceReducer.device_sifCollectorList });
        });
        this.props.store.subscribe(() => {
            this.setState({ device_authenticationProfileList: this.props.store.getState().deviceReducer.device_authenticationProfileList });
        });
        this.props.store.subscribe(() => {
            this.setState({ device_communityProfileList: this.props.store.getState().deviceReducer.device_communityProfileList });
        });
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
        this.props.store.dispatch(DeviceContainer.saveDevice(function () {
            this.props.loadDataTable();
        }.bind(this), deviceTemp));
    }

    resetSensor = (uuid) => {
        this.props.store.dispatch(DeviceContainer.resetSensor());
    }

    resetDevice = () => {
        this.props.history.push('/dispositivos');
        this.props.store.dispatch(DeviceContainer.resetDevice());
    }

    scanDeviceSensors = () => {
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();
        this.props.store.dispatch(DeviceContainer.scanDeviceSensors(this.state.device));
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                        <FormPanelDefault>
                            <FormHeaderDefault label="Dispositivo" />
                            <div className="panel-body">
                                <InputNumberMaskForm type="text" value={this.state.device.ipv4} onChange={this.handleChange}
                                    label="Endereço IPv4*" id="device_ipv4" format="###.###.###.###" field="ipv4" entity="device" />
                                <InputNumberMaskForm type="text" value={this.state.device.port} onChange={this.handleChange}
                                    label="Porta (SNMP)*" id="device_port" field="port" entity="device" />
                                <InputTextFormDefault value={this.state.device.description} onChange={this.handleChange}
                                    label="Descrição" id="device_description" field="description" entity="device" />
                                <SelectFormDefault value={this.state.device.sifCollectorId} labelField={'description'} onChange={this.handleChange}
                                    data={this.state.device_sifCollectorList} id="device_sifCollectorId" label="Coletor*" field="sifCollectorId" entity="device" />
                                <SelectFormDefault value={this.state.device.snmp} labelField={'name'} onChange={this.handleChange}
                                    data={this.state.device_snmpList} id="device_snmp" label="Protocolo SNMP*" field="snmp" entity="device" />
                                <SelectFormDefault value={this.state.device.authenticatioProfileId} labelField={'description'} onChange={this.handleChange}
                                    data={this.state.device_authenticationProfileList} id="device_authenticactionProfile" label="Perfil de autenticação" field="authenticatioProfileId" entity="device" />
                                <SelectFormDefault value={this.state.device.communityProfileId} labelField={'description'} onChange={this.handleChange}
                                    data={this.state.device_communityProfileList} id="device_communityProfile" label="Comunidade" field="communityProfileId" entity="device" />
                                <SwitchFormDefault value={this.state.device.status} onChange={this.handleChange} field="status" entity="device"
                                    offText="NÃO" onText="SIM" offColor="danger" onColor="success" id="device_status" label="Habilitado" />
                            </div>
                        </FormPanelDefault>

                        <FormPanelDefault>
                            <FormHeaderDefault label="Sensores" />
                            <div className="panel-body">
                                <FormRowDefault>
                                    <label className="col-md-3 col-sm-3 col-xs-6" />
                                    <div className="col-md-3 col-sm-3 col-xs-6">
                                        <Button className="form-control" bsStyle="info" onClick={this.scanDeviceSensors}>SNMP Scanner</Button>
                                    </div>
                                </FormRowDefault>
                                <SelectFormDefault value={this.state.sensor.sensorKind} labelField={'name'} onChange={this.handleChange}
                                    data={this.state.device_sensorKindList} id="sensor_sensorKind" label="Tipo" field="sensorKind" entity="sensor" />
                                <InputTextFormDefault value={this.state.sensor.name} onChange={this.handleChange}
                                    label="Nome*" id="sensor_name" field="name" entity="sensor" />
                                <InputTextFormDefault value={this.state.sensor.description} onChange={this.handleChange}
                                    label="Descrição" id="sensor_description" field="description" entity="sensor" />
                                <InputTextFormDefault value={this.state.sensor.oid} onChange={this.handleChange}
                                    label="OID*" id="sensor_oid" field="oid" entity="sensor" />
                                <ToggleButtonGroupDefault label="Intervalo" id="sensor_interval" type="radio" value={this.state.sensor.interval}
                                    onChange={this.sensorIntervalhandleChange} buttonList={[{ 'name': 'SEGUNDO', 'value': 'PER_SECOND' }, { 'name': 'MINUTO', 'value': 'PER_MINUTE' }, { 'name': 'HORA', 'value': 'PER_HOUR' }]}>
                                </ToggleButtonGroupDefault>
                                <InputNumberMaskForm type="text" value={this.state.sensor.time} onChange={this.handleChange}
                                    label="Tempo*" id="sensor_time" field="time" entity="sensor" />
                                <SwitchFormDefault value={this.state.sensor.status} onChange={this.handleChange} field="status" entity="sensor"
                                    offText="NÃO" onText="SIM" offColor="danger" onColor="success" id="sensor_status" label="Habilitado" />
                                <FormRowDefault>
                                    <label className="col-md-3 col-sm-3 col-xs-6" />
                                    <div className="col-md-3 col-sm-3 col-xs-6">
                                        <AddButtonFormDefault className="form-control" onClick={this.addSensor} />
                                        <CancelAddDefault className="form-control" onClick={this.resetSensor} />
                                    </div>
                                </FormRowDefault>
                                <SensorTable data={this.state.sensorList} store={this.props.store} />
                            </div>
                        </FormPanelDefault>
                        <FormRowDefault>
                            <label className="col-md-3 col-sm-3 col-xs-6" />
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <SaveFormDefault className="form-control" onSubmit={this.props.onSubmit} />
                                <CancelFormDefault className="form-control" onClick={this.resetDevice} />
                            </div>
                        </FormRowDefault>
                    </form>
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        // event.target === undefined --> ToggleSwitch
        if (event.target === undefined) {
            // If got here it's a toggle switch and: event = value = boolean
            let obj = this.state[event.props.entity];
            obj[event.props.field] = event.state.value;
            this.setState(obj);
        } else {
            let field = event.target.attributes.field.value;
            if (event.target.attributes.entity !== undefined) {
                let entity = event.target.attributes.entity.value;
                let obj = this.state[entity];
                // event.target === undefined --> ToggleSwitch
                if (event.target === undefined) {
                    // If got here it's a toggle switch and: event = value = boolean
                    obj[field] = event;
                } else {
                    obj[field] = event.target.value;
                }
                this.setState(obj);
            } else {
                let stateField = {};
                stateField[field] = event.target.value;
                this.setState(stateField);
            }
        }
    }

    sensorIntervalhandleChange = (value) => {
        let obj = this.state['sensor'];
        obj.interval = value;
        this.setState(obj);
    }
}

class SensorTR extends Component {
    removeSensor = () => {
        this.props.store.dispatch(DeviceContainer.removeSensor(this.props.obj.uuid));
    }

    setSensor = () => {
        this.props.store.dispatch(DeviceContainer.setSensor(this.props.obj.uuid));
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.oid}</td>
                <td>{this.props.obj.time}{this.props.obj.interval_shortened}</td>
                <td>{this.props.obj.status_name}</td>
                <td>
                    <TableRemoveIconDefault onClick={this.removeSensor} />
                    <TableEditIconDefault onClick={this.setSensor} />
                </td>
            </tr>
        )
    }

    shouldComponentUpdate(nextProps) {
        return this.props.obj !== nextProps.obj;
    }
}

class SensorTable extends Component {
    render() {
        let body = this.props.data.map(obj =>
            <SensorTR key={!obj.id ? obj.uuid : obj.id} obj={obj} store={this.props.store} />
        );

        return (
            <TableDefault head={TableHeader.SensorTableHead} body={body} />
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.data !== nextProps.data;
    }
}

class DeviceList extends Component {
    render() {
        let body = this.props.data.deviceList.map(obj =>
            <DeviceTR key={obj.id} obj={obj} store={this.props.store} />
        );

        return (
            <div>
                <FormRowDefault>
                    <TableDefault head={TableHeader.DeviceTableHead} body={body} />
                </FormRowDefault>
                <FormRowDefault>
                    <Pagination
                        first
                        next
                        prev
                        last
                        ellipsis
                        items={this.props.data.totalPages}
                        maxButtons={3}
                        activePage={this.props.data.page}
                        onSelect={this.props.loadDataTable}
                    />
                </FormRowDefault>
            </div>
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.data.deviceList !== nextProps.data.deviceList
            || this.props.data.page !== nextProps.data.page || this.props.data.totalPages !== nextProps.data.totalPages;
    }
}

class DeviceTR extends Component {
    handleTabChange = () => {
        this.props.store.dispatch(DeviceContainer.setTabKey(1));
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.ipv4}</td>
                <td>{this.props.obj.port}</td>
                <td>{this.props.obj.status.name}</td>
                <td>
                    <Link to={`/dispositivos/${this.props.obj.id}`} >
                        <TableEditIconDefault onClick={this.handleTabChange} />
                    </Link>
                </td>
            </tr>
        )
    }

    shouldComponentUpdate(nextProps) {
        return this.props.obj !== nextProps.obj;
    }
}

export default DevicePresentational;