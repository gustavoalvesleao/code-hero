import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import HeroDetails from './components/HeroDetails';
import NotFound from './components/NotFound';

import url from './config/urls';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => (
  <>
    <ToastContainer />
    <Switch>
      <Route path={url.home} component={Home} />
      <Route path={url.heroDetails} component={HeroDetails} />
      <Route path={url.notFound} component={NotFound} />
      <Redirect from={url.root} to={url.home} />
      <Redirect to={url.notFound} />
    </Switch>
  </>
);

export default App;