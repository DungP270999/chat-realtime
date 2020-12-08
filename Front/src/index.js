import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import * as serviceWorker from './serviceWorker';
import i18n from './i18n';

import "./Utils/Prototype/ArrayPrototype";
import "./Utils/Prototype/StringPrototype";
import "./Utils/Prototype/NumberPrototype";
import "./Utils/Prototype/ObjectPrototype";

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <App/>
    </I18nextProvider>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
