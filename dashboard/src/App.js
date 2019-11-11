import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import Header from './components/pages/Header';
import ScanResults from './components/pages/ScanResults';
import Findings from './components/pages/Findings';

Sentry.init({ dns: process.env.REACT_APP_SENTRY_DSN });

function App() {
  return (
    <Router>
      <Header />

      <div className="container mx-auto pt-8">
        <Switch>
          <Route path="/create">

          </Route>

          <Route path="/scan-results/:scanResultId/findings">
            <Findings />
          </Route>

          <Route path="/">
            <ScanResults />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
