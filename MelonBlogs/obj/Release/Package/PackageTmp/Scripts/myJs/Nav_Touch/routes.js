import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
} from 'react-router-dom';

import App from './components/App';


/* global SERVER_RENDING */
const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

export default routes;
