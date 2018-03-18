import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { toast } from 'react-toastify';

import DeviceProfileCommunity from '../../entity/DeviceProfileCommunity';
import DeviceAuthenticationProfile from '../../entity/DeviceAuthenticationProfile';

import PageHeaderDefault from '../../component/_root/PageHeaderDefault';
import FormHeaderDefault from '../../component/_root/FormHeaderDefault';
import FormPanelDefault from '../../component/_root/FormPanelDefault';
import TableDefault from '../../component/table/TableDefault';

import SaveFormDefault from '../../component/button/SaveFormDefault';
import CancelFormDefault from '../../component/button/CancelFormDefault';
import InputTextFormDefault from '../../component/input/InputTextFormDefault';
import SwitchFormDefault from '../../component/input/SwitchFormDefault';
import DeviceAuthProfileContainer from './DeviceAuthProfileContainer';

export default class DeviceAuthProfilePresentational extends Component {
    render() {
        return (
            <div className="panel-body">
                <PageHeaderDefault label="Perfis de autenticação para dispositivos" />
                <div className="row">
                    <div className="col-lg-12">
                        <DeviceAuthenticationProfileForm store={this.props.store} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <CommunityForm store={this.props.store} />
                    </div>
                </div>
            </div>
        );
    }
}

class DeviceAuthenticationProfileForm extends Component {
    constructor() {
        super();
        const deviceAuthenticationProfileTableHead =
            <tr>
                <th>Descrição</th>
                <th>Usuário</th>
                <th>Status</th>
                <th>Ação</th>
            </tr>;

        this.state = {
            deviceAuthenticationProfile: new DeviceAuthenticationProfile(),
            deviceAuthenticationProfileList: [], deviceAuthenticationProfileTableBody: null,
            deviceAuthenticationProfileTableHead: deviceAuthenticationProfileTableHead
        }
    }

    componentDidMount() {
        this.props.store.dispatch(DeviceAuthProfileContainer.fetchAllDeviceAuthenticationProfile(function (response) {
            this.mountTableBody(response);
        }.bind(this)));
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ deviceAuthenticationProfile: this.props.store.getState().deviceProfileReducer.deviceAuthenticationProfile });
        });
        this.props.store.subscribe(() => {
            this.setState({ deviceAuthenticationProfileList: this.props.store.getState().deviceProfileReducer.deviceAuthenticationProfileList });
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();
        this.props.store.dispatch(DeviceAuthProfileContainer.saveDeviceAuthenticationProfile(function () {
            this.mountTableBody();
        }.bind(this), this.state.deviceAuthenticationProfile));
    }

    removeDeviceAuthenticationProfile = (id) => {
        this.props.store.dispatch(DeviceAuthProfileContainer.removeDeviceAuthenticationProfile(function () {
            this.mountTableBody();
        }.bind(this), id));
    }

    editDeviceAuthenticationProfile = (obj) => {
        this.props.store.dispatch(DeviceAuthProfileContainer.setDeviceAuthenticationProfile(obj));
    }

    mountTableBody = () => {
        let body = this.state.deviceAuthenticationProfileList.map(obj =>
            <DeviceAuthenticationProfileTR key={obj.id} obj={obj} onRemove={this.removeDeviceAuthenticationProfile}
                onEdit={this.editDeviceAuthenticationProfile} />
        );
        this.setState({ deviceAuthenticationProfileTableBody: body });
    }

    render() {
        return (
            <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                <FormPanelDefault>
                    <FormHeaderDefault label="Perfil de autenticação de dispositivos" />
                    <div className="panel-body">
                        <div className="panel-body">
                            <InputTextFormDefault value={this.state.deviceAuthenticationProfile.description} onChange={this.saveEntity.bind(this, 'description', "deviceAuthenticationProfile")}
                                label="Descrição*" id="device_auth_description" />
                            <InputTextFormDefault value={this.state.deviceAuthenticationProfile.username} onChange={this.saveEntity.bind(this, 'username', "deviceAuthenticationProfile")}
                                label="Usuário" id="username" />
                            <InputTextFormDefault value={this.state.deviceAuthenticationProfile.password} onChange={this.saveEntity.bind(this, 'password', "deviceAuthenticationProfile")}
                                label="Senha" id="password" type="password" />
                            <SwitchFormDefault value={this.state.deviceAuthenticationProfile.status} onChange={this.saveEntity.bind(this, 'status', "deviceAuthenticationProfile", !this.state.deviceAuthenticationProfile.status)}
                                id="status" offText="NÃO" onText="SIM" offColor="danger" onColor="success" label="Habilitado" />
                            <SaveFormDefault onSubmit={this.props.onSubmit} />
                            <div style={{ display: 'inline', marginLeft: 20 + 'px' }} >
                                <CancelFormDefault />
                            </div>
                            <TableDefault body={this.state.deviceAuthenticationProfileTableBody} head={this.state.deviceAuthenticationProfileTableHead} />
                        </div>
                    </div>
                </FormPanelDefault>
            </form>
        );
    }
    //////////////
    // BOILER-PLATE
    saveState = (fieldName, event) => {
        var stateField = {};
        stateField[fieldName] = event.target.value;
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
}

class DeviceAuthenticationProfileTR extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.status.name}</td>
                <td>
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'red' }} className="fa fa-trash-o fa-2x"
                        onClick={this.props.onRemove.bind(this,
                            this.props.obj.id
                        )} />
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'blue' }} className="fa fa-edit fa-2x"
                        onClick={this.props.onEdit.bind(this,
                            this.props.obj
                        )} />
                </td>
            </tr>
        )
    }
}

class CommunityForm extends Component {
    constructor() {
        super();
        const deviceProfileCommunityTableHead =
            <tr>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ação</th>
            </tr>;
        this.state = {
            deviceProfileCommunity: new DeviceProfileCommunity(),
            deviceProfileCommunityList: [], deviceProfileCommunityTableHead: deviceProfileCommunityTableHead,
            deviceProfileCommunityTableBody: null
        }
    }

    componentDidMount() {
        this.props.store.dispatch(DeviceAuthProfileContainer.fetchAllDeviceProfileCommunity(function (response) {
            this.mountTableBody(response);
        }.bind(this)));
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ deviceProfileCommunity: this.props.store.getState().deviceProfileReducer.deviceProfileCommunity });
        });
        this.props.store.subscribe(() => {
            this.setState({ deviceProfileCommunityList: this.props.store.getState().deviceProfileReducer.deviceProfileCommunityList });
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();
        this.props.store.dispatch(DeviceAuthProfileContainer.saveDeviceProfileCommunity(function () {
            this.mountTableBody();
        }.bind(this), this.state.deviceProfileCommunity));
    }

    removeDeviceProfileCommunity = (id) => {
        this.props.store.dispatch(DeviceAuthProfileContainer.removeDeviceProfileCommunity(function () {
            this.mountTableBody();
        }.bind(this), id));
    }

    editDeviceProfileCommunity = (obj) => {
        this.props.store.dispatch(DeviceAuthProfileContainer.setDeviceProfileCommunity(obj));
    }

    mountTableBody = () => {
        let body = this.state.deviceProfileCommunityList.map(obj =>
            <DeviceProfileCommunityTR key={obj.id} obj={obj} onRemove={this.removeDeviceProfileCommunity}
                onEdit={this.editDeviceProfileCommunity} />
        );
        this.setState({ deviceProfileCommunityTableBody: body });
    }

    render() {
        return (
            <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                <FormPanelDefault>
                    <FormHeaderDefault label="Comunidades" />
                    <div className="panel-body">
                        <div className="panel-body">
                            <InputTextFormDefault value={this.state.deviceProfileCommunity.description} onChange={this.saveEntity.bind(this, 'description', "deviceProfileCommunity")}
                                label="Descrição*" id="device_community_description" />
                            <SwitchFormDefault value={this.state.deviceProfileCommunity.status} onChange={this.saveEntity.bind(this, 'status', "deviceProfileCommunity", !this.state.deviceProfileCommunity.status)}
                                id="status" offText="NÃO" onText="SIM" offColor="danger" onColor="success" label="Habilitado" />
                            <SaveFormDefault onSubmit={this.props.onSubmit} />
                            <div style={{ display: 'inline', marginLeft: 20 + 'px' }} >
                                <CancelFormDefault />
                            </div>
                            <TableDefault body={this.state.deviceProfileCommunityTableBody} head={this.state.deviceProfileCommunityTableHead} />
                        </div>
                    </div>
                </FormPanelDefault>
            </form>
        );
    }
    //////////////
    // BOILER-PLATE
    saveState = (fieldName, event) => {
        var stateField = {};
        stateField[fieldName] = event.target.value;
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
}

class DeviceProfileCommunityTR extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.status.name}</td>
                <td>
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'red' }} className="fa fa-trash-o fa-2x"
                        onClick={this.props.onRemove.bind(this,
                            this.props.obj.id
                        )} />
                    <i style={{ cursor: 'pointer', marginLeft: 5 + 'px', color: 'blue' }} className="fa fa-edit fa-2x"
                        onClick={this.props.onEdit.bind(this,
                            this.props.obj
                        )} />
                </td>
            </tr>
        )
    }
}