//React import
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import Home from './routes/Home/Home';
import Records from './routes/Records/Records';
import Reports from './routes/Reports/Reports';
import Header from './components/Header/Header';
import RecordEditor from './routes/RecordEditor/RecordEditor';

ReactDOM.render((
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/records/" exact component={Records} />
        <Route path="/reports/" exact component={Reports} />
        <Route path="/records/add/" exact component={RecordEditor} />
        <Route path="/records/edit/:id" component={RecordEditor}/>
      </Switch>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
