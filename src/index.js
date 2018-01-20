import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import App from './app/App';
import Home from './app/home/Home';
import DevicePresentational from './app/device/DevicePresentational';

import reducer from './_reducer';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/dispositivos/:id?' render={(props) => (
                    <DevicePresentational {...props} store={store} />
                )} />
            </Switch>
        </App>
    </Router>
), document.getElementById('root'));
registerServiceWorker();