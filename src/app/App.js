import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
        />
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
          <TopNavBar />
          <MenuNavBar />
        </nav>
        <MainPage>
          {this.props.children}
        </MainPage>
      </div >
    );
  }
}

class MainPage extends Component {
  render() {
    return (
      <div id="page-wrapper">
        {this.props.children}
      </div>
    );
  }
}

class MenuNavBar extends Component {
  render() {
    return (
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
            <li>
              <Link to="/configuracoes"><i className="fa fa-cogs fa-fw"></i> Configurações </Link>
            </li>
            <li>
              <Link to="/"><i className="fa fa-dashboard fa-fw"></i> Início </Link>
            </li>
            <li>
              <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Sensores<span className="fa arrow"></span></a>
              <ul className="nav nav-second-level">
                <li>
                  <Link to="/"><i className="fa fa-dashboard fa-fw"></i> Sensores </Link>
                </li>
                <li>
                  <Link to="/dispositivos"><i className="fa fa-server fa-lg"></i> Dispositivos </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    );
  }
}

class TopNavBar extends Component {
  render() {
    return (
      <div>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">SB Admin v2.0</a>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
              </li>
              <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
              </li>
              <li className="divider"></li>
              <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}