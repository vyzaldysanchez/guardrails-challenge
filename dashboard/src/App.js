import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/page/Header';
import List from './components/scan-results/List';

function App() {
  return (
    <Router>
      <Header />

      <div className="container mx-auto pt-8">
        <Switch>
          <Route path="/create">

          </Route>

          <Route path="/scan-results/:id/findings">
          </Route>

          <Route path="/">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
