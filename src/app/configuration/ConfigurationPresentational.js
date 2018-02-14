import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { toast } from 'react-toastify';
import { Button, Tab, Tabs, Table } from 'react-bootstrap';

import ConfigurationContainer from './ConfigurationContainer';

import SifCollector from '../../entity/SifCollector';

import FormHeaderDefault from '../../component/_root/FormHeaderDefault';
import FormPanelDefault from '../../component/_root/FormPanelDefault';
import FormRowDefault from '../../component/_root/FormRowDefault';
import PageHeaderDefault from '../../component/_root/PageHeaderDefault';

import InputTextFormDefault from '../../component/input/InputTextFormDefault';
import InputPasswordFormDefault from '../../component/input/InputPasswordFormDefault';
import SwitchFormDefault from '../../component/input/SwitchFormDefault';

import CancelAddDefault from '../../component/button/CancelAddDefault';
import AddButtonFormDefault from '../../component/button/AddButtonFormDefault';


export default class ConfigurationPresentational extends Component {
    render() {
        return (
            <div>
                <div className="panel-body">
                    <PageHeaderDefault label="Configurações" />
                    <Tabs defaultActiveKey={1} id="configurationTab">
                        <Tab eventKey={1} title="Aplicação">
                            <div className="tab-content" style={{ marginTop: 20 + 'px' }}>
                                <GeneralConfiguration store={this.props.store} />
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Coletor - SIF">
                            <div className="tab-content" style={{ marginTop: 20 + 'px' }}>
                                <SifConfiguration store={this.props.store} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div >
        );
    }
}

class SifConfiguration extends Component {
    constructor() {
        super();
        this.state = {
            sifCollector: new SifCollector(), sifCollectorList: []
        };
    }

    componentDidMount() {
        this.props.store.dispatch(ConfigurationContainer.fetchAllSifCollector());
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ sifCollector: this.props.store.getState().configurationReducer.sifCollector });
        });
        this.props.store.subscribe(() => {
            this.setState({ sifCollectorList: this.props.store.getState().configurationReducer.sifCollectorList });
        });
    }

    removeSifCollector = (id) => {
        this.props.store.dispatch(ConfigurationContainer.removeSifCollector(id));
    }

    editSifCollector = (obj) => {
        this.props.store.dispatch(ConfigurationContainer.setSifCollector(obj));
    }

    resetSifCollector = () => {
        this.props.store.dispatch(ConfigurationContainer.resetSifCollector());
    }

    saveCollector = (e) => {
        e.preventDefault();
        PubSub.publish("clean-validation-error", {});
        toast.dismiss();
        this.props.store.dispatch(ConfigurationContainer.saveCollector(this.state.sifCollector));
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                        <FormPanelDefault>
                            <FormHeaderDefault label="Cadastro de coletores" />
                            <div className="panel-body">
                                <InputTextFormDefault value={this.state.sifCollector.identifier} onChange={this.saveEntity.bind(this, 'identifier', 'sifCollector')}
                                    label="Identificador" id="identifier" >
                                </InputTextFormDefault>

                                <InputTextFormDefault value={this.state.sifCollector.description} onChange={this.saveEntity.bind(this, 'description', 'sifCollector')}
                                    label="Descrição" id="description" >
                                </InputTextFormDefault>

                                <InputTextFormDefault value={this.state.sifCollector.databaseUrl} onChange={this.saveEntity.bind(this, 'databaseUrl', "sifCollector")}
                                    label="URL do banco de dados" id="databaseUrl" >
                                </InputTextFormDefault>

                                <SwitchFormDefault value={this.state.sifCollector.status} onChange={this.saveEntity.bind(this, 'status', "sifCollector", !this.state.sifCollector.status)}
                                    id="status" offText="NÃO" onText="SIM" offColor="danger" onColor="success" label="Habilitado" />

                                <FormRowDefault>
                                    <div className="col-md-3 col-sm-3 col-xs-6" />
                                    <AddButtonFormDefault onClick={this.saveCollector} />
                                    <CancelAddDefault onClick={this.resetSifCollector} />
                                </FormRowDefault>
                                <SifCollectorTable data={this.state.sifCollectorList} onEdit={this.editSifCollector} onRemove={this.removeSifCollector} />
                            </div>
                        </FormPanelDefault>
                    </form>
                </div>
            </div>
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

class SifCollectorTable extends Component {
    render() {
        let body = this.props.data.map(obj =>
            <SifCollectorTR key={obj.id} obj={obj} onRemove={this.props.onRemove} onEdit={this.props.onEdit} />
        );

        return (
            <Table bordered responsive
                hover striped style={{ marginTop: 20 + 'px' }}>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Identificador</th>
                        <th>URL do banco de dados</th>
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

class SifCollectorTR extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.identifier}</td>
                <td>{this.props.obj.databaseUrl}</td>
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

class GeneralConfiguration extends Component {
    constructor() {
        super();
        this.state = {
            applicationName: '', resourcePath: '',
            datasourceUrl: '', datasourceUsername: '', app_password: ''
        };
    }

    componentDidMount() {
        this.props.store.dispatch(ConfigurationContainer.fetchConfiguration());
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({ applicationName: this.props.store.getState().configurationReducer.applicationName });
        });
        this.props.store.subscribe(() => {
            this.setState({ resourcePath: this.props.store.getState().configurationReducer.resourcePath });
        });
        this.props.store.subscribe(() => {
            this.setState({ datasourceUrl: this.props.store.getState().configurationReducer.datasourceUrl });
        });
        this.props.store.subscribe(() => {
            this.setState({ datasourceUsername: this.props.store.getState().configurationReducer.datasourceUsername });
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                            <FormPanelDefault>
                                <FormHeaderDefault label="Configurações Gerais" />
                                <div className="panel-body">
                                    <InputTextFormDefault value={this.state.applicationName} onChange={this.saveState.bind(this, 'applicationName')}
                                        label="Nome da aplicação" id="applicationName" >
                                        <Button bsStyle="info">
                                            <i className="fa fa-pencil" /> Atualizar
                                </Button>
                                    </InputTextFormDefault>

                                    <InputTextFormDefault value={this.state.resourcePath} onChange={this.saveState.bind(this, 'resourcePath')}
                                        label="Diretório de recursos" id="resourcePath" >
                                        <Button bsStyle="info">
                                            <i className="fa fa-pencil" /> Atualizar
                                </Button>
                                    </InputTextFormDefault>
                                </div>
                            </FormPanelDefault>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.submitForm} method="post" autoComplete="off" >
                            <FormPanelDefault>
                                <FormHeaderDefault label="Base de dados da aplicação" />
                                <div className="panel-body">
                                    <InputTextFormDefault value={this.state.datasourceUrl} onChange={this.saveState.bind(this, 'datasourceUrl')}
                                        label="Origem" id="datasourceUrl" >
                                        <Button bsStyle="info">
                                            <i className="fa fa-pencil" /> Atualizar
                                </Button>
                                    </InputTextFormDefault>

                                    <InputTextFormDefault value={this.state.datasourceUsername} onChange={this.saveState.bind(this, 'datasourceUsername')}
                                        label="Usuário" id="datasourceUsername" >
                                        <Button bsStyle="info">
                                            <i className="fa fa-pencil" /> Atualizar
                                </Button>
                                    </InputTextFormDefault>

                                    <InputPasswordFormDefault value={this.state.app_password} onChange={this.saveState.bind(this, 'app_password')}
                                        label="Senha" id="app_password" placeholder="******" >
                                        <Button bsStyle="info">
                                            <i className="fa fa-pencil" /> Atualizar
                                </Button>
                                    </InputPasswordFormDefault>
                                </div>
                            </FormPanelDefault>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    //////////////
    // BOILER-PLATE
    saveState = (fieldName, event) => {
        var stateField = {};
        stateField[fieldName] = event.target.value;
        this.setState(stateField);
    }
}