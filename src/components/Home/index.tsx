import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Pagination, {
  NEXT_PAGE_ACTION,
  PREV_PAGE_ACTION,
} from '../commons/Pagination';
import AppSearch from '../commons/Search';
import CharactersContainer from '../CharactersContainer';
import withLoading, { SetLoadingType } from '../commons/HOC/WithLoading';

import characterService, { Character } from '../../services/characterService';

import strings from '../../locales/home';

import styles from './styles';

interface QueryParams {
  name?: string;
  offset: number;
  limit: number;
}

interface PageInfo {
  currentPage: number;
  currentOffset: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// This interface is about the current state page information and queryParams
interface PaginationInfo {
  newPageInfo: PageInfo;
  params: QueryParams;
}

const KEY_ENTER = 'Enter';

const pageInfoInitialValues = {
  currentPage: 1,
  currentOffset: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const Home = (props: SetLoadingType): JSX.Element => {
  const { setLoading } = props;
  const classes = styles();

  const [characters, setCharacters] = useState<Character[]>([]);
  const charactersLimitArray = useState(10);
  const charactersLimit = charactersLimitArray[0];
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    currentOffset: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [queryParams, setQueryParams] = useState<QueryParams>({
    offset: 0,
    limit: charactersLimit,
  });

  const hasCharacters = useMemo(() => !!characters?.length, [characters]);

  const getCharacters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await characterService.getCharacters(queryParams);
      const { data: innerData } = data;
      const { results, total, count } = innerData;

      // This indicates that there are more characters in the server
      if (count < total) {
        const newPageInfo = { ...pageInfoInitialValues };
        newPageInfo.hasNextPage = true;
        setPageInfo(newPageInfo);
      }

      setCharacters(results);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      toast.error(`${strings.error} ${ex}`);
    }
  }, [queryParams, setLoading]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  // This function will get all the information necessary to navigate to the next/prev page
  const getUpdatedPaginationInfo = (paginateTo: string): PaginationInfo => {
    const newPageInfo = { ...pageInfo };
    const params = { ...queryParams };

    if (paginateTo === NEXT_PAGE_ACTION) {
      params.offset = pageInfo.currentOffset + charactersLimit;
      newPageInfo.currentPage += 1;
      newPageInfo.hasPrevPage = true;
    } else if (paginateTo === PREV_PAGE_ACTION) {
      params.offset = pageInfo.currentOffset - charactersLimit;
      newPageInfo.currentPage -= 1;
    }
    newPageInfo.currentOffset = params.offset;

    return { newPageInfo, params };
  };

  const handlePageChange = async (paginateTo: string): Promise<void> => {
    const { newPageInfo, params } = getUpdatedPaginationInfo(paginateTo);
    try {
      setLoading(true);
      const { data } = await characterService.getCharacters(params);
      const { data: innerData } = data;
      const { results, offset, count } = innerData;

      // This indicates that the characters list is ending, e.g The default limit is set to 10 and only 3 returned,
      if (count < charactersLimit) {
        newPageInfo.hasNextPage = false;
      }

      // If the offset is 0, indicates that the current page is 1, so no previous page
      if (offset === 0) {
        newPageInfo.hasPrevPage = false;
      }

      setCharacters(results);
      setPageInfo(newPageInfo);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      toast.error(`${strings.error} ${ex}`);
    }
  };

  const handleNameQueryChange = (query: string): void =>
    setNameSearchQuery(query);

  const handleSearch = (key: string): void => {
    if (key === KEY_ENTER && !!nameSearchQuery) {
      setPageInfo(pageInfoInitialValues);

      const params = { ...queryParams };
      params.offset = 0;
      params.name = nameSearchQuery;
      setQueryParams(params);

      // TODO: test
      // setQueryParams({
      //   ...queryParams,
      //   offset: 0,
      //   name: nameSearchQuery,
      // });
    }
  };

  const handleClearQuery = (): void => {
    setNameSearchQuery('');
    setPageInfo(pageInfoInitialValues);

    const params = { ...queryParams };
    params.offset = 0;
    delete params.name;
    setQueryParams(params);
  };

  return (
    <>
      <div className={classes.home}>
        <Container>
          <Typography variant="h2" className={classes.title}>
            {strings.title}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {strings.subtitle}
          </Typography>
          <div className={classes.search}>
            <AppSearch
              searchQuery={nameSearchQuery}
              placeHolder={strings.searchPlaceholder}
              onChange={handleNameQueryChange}
              onKeyPress={handleSearch}
              onClearQuery={handleClearQuery}
            />
          </div>
          {!hasCharacters && (
            <Typography className={classes.noChar} variant="h5">
              {strings.noCharacter}
            </Typography>
          )}
          {hasCharacters && <CharactersContainer characters={characters} />}
        </Container>
      </div>
      {hasCharacters && (
        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      )}
    </>
  );
};

export default withLoading(Home);
