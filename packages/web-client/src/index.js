import React from 'react';
import ReactDOM from 'react-dom';
import Router from './app/Router';

import {CookiesProvider} from "react-cookie";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Router/>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);