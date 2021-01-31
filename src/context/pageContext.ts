import { createContext } from 'react';

export interface CurrentPage {
  currentPage: number;
}

interface CurrentPageContextState {
  currentPage: number;
  setCurrentPage: (pageInfo: number) => void;
}

export const currentPageDefaultValues: CurrentPageContextState = {
  currentPage: 1,
  setCurrentPage: () => {
    //
  },
};

export const CurrentPageContext = createContext<CurrentPageContextState>(
  currentPageDefaultValues,
);
