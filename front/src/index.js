//React import
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import Login from './routes/Login/Login';
import Records from './routes/Records/Records';
import RecordsAddNew from './routes/RecordsAddNew/RecordsAddNew';
import Reports from './routes/Reports/Reports';
import Header from './components/Header/Header';

ReactDOM.render((
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/records/" exact component={Records} />
        <Route path="/records/add-new/" exact component={RecordsAddNew} />
        <Route path="/reports/" exact component={Reports} />
      </Switch>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
