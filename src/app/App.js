import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { Nav, NavItem } from 'react-bootstrap';

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
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0, borderColor: 'black' }}>
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
          <ul className="nav myMenuNavBar" id="side-menu">
            <li>
              <Link to="/configuracoes"><i className="fa fa-cogs fa-fw"></i> Configurações </Link>
            </li>
            <li>
              <Link to="/perfis-de-dispositivos"><i className="fa fa-address-book-o fa-fw"></i> Perfis de dispositivos </Link>
            </li>
            <li>
              <Link to="/"><i className="fa fa-dashboard fa-fw"></i> Início </Link>
            </li>
            <li>
              <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            <li>
              <Link to="/dispositivos"><i className="fa fa-server fa-lg"></i> Dispositivos </Link>
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
        <Nav className="myTopNavBar" pullRight>
          <NavItem eventKey={1} href="#" style={{ display: 'inline-block' }}>
            <span className="fa-stack myTopNavBarItems">
              <i className="fa fa-tree fa-stack-1x"></i>
              <i className="fa fa-folder-o fa-stack-2x"></i>
            </span>
          </NavItem>
          <NavItem eventKey={2} href="#" style={{ display: 'inline-block' }}>
            <span className="fa-stack myTopNavBarItems">
              <i className="fa fa-user-circle-o fa-stack-2x"></i>
            </span>
          </NavItem>
        </Nav>
      </div>
    );
  }
}