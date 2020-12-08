import React, {Component} from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import 'react-toastify/dist/ReactToastify.css';

import './Assets/scss/_app.scss';

import Routes from "./Routes/Routes";

import {ToastContainer} from "react-toastify";

import {Provider} from "react-redux";

import store from "./Redux/Store";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <ToastContainer/>
                <Routes/>
            </Provider>
        );
    }
}

export default App;
