import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import CharacterDetails from './components/CharacterDetails';
import NotFound from './components/NotFound';
import Header from './components/Header';

import url from './config/urls';
import { QueryParams } from './interfaces/character';
import {
  QueryContext,
  queryContextDefaultValues,
} from './context/queryContext';
import {
  CurrentPageContext,
  currentPageDefaultValues,
} from './context/pageContext';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const [queryParams, setQueryParams] = useState<QueryParams>(
    queryContextDefaultValues.queryParams,
  );
  const [currentPage, setCurrentPage] = useState(
    currentPageDefaultValues.currentPage,
  );

  return (
    <>
      <QueryContext.Provider value={{ queryParams, setQueryParams }}>
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
          <ToastContainer />
          <Header />
          <Switch>
            <Route path={url.home} component={Home} />
            <Route path={url.characterDetails} component={CharacterDetails} />
            <Route path={url.notFound} component={NotFound} />
            <Redirect from={url.root} to={url.home} />
            <Redirect to={url.notFound} />
          </Switch>
        </CurrentPageContext.Provider>
      </QueryContext.Provider>
    </>
  );
};

export default App;
