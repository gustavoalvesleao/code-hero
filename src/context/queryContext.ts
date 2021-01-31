import { createContext } from 'react';

import { QueryParams } from '../interfaces/character';

export const charactersLimit = 10;

interface QueryContextState {
  queryParams: QueryParams;
  setQueryParams: (queryParams: QueryParams) => void;
}

export const queryContextDefaultValues: QueryContextState = {
  queryParams: {
    offset: 0,
    limit: charactersLimit,
  },
  setQueryParams: () => {
    //
  },
};

export const QueryContext = createContext<QueryContextState>(
  queryContextDefaultValues,
);
