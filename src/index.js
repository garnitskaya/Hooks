import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppСopy';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <App startMoney={1000} />,
    document.getElementById('root')
);