import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.css';
import NotFound from './components/NotFound/NotFound';
import MapPage from './pages/MapPage/MapPage';
import LandindPage from './pages/LandingPage/LandindPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/map" component={MapPage} />
            <Route path="/" component={LandindPage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
