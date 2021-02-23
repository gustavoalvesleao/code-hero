import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

import characterService from '../../services/characterService';

import strings from '../../locales/home';

import { Character } from '../../interfaces/character';
import { CurrentPageContext } from '../../context/pageContext';
import { QueryContext, charactersLimit } from '../../context/queryContext';

import styles from './styles';

const KEY_ENTER = 'Enter';

const pageInfoInitialValues = {
  hasNextPage: false,
  hasPrevPage: false,
};

const Home = (props: SetLoadingType): JSX.Element => {
  const { setLoading } = props;
  const classes = styles();

  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { queryParams, setQueryParams } = useContext(QueryContext);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPrevPage: false,
  });

  const hasCharacters = useMemo(() => !!characters?.length, [characters]);

  const getCharacters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await characterService.getCharacters(queryParams);
      const { data: innerData } = data;
      const { results, total, count, offset } = innerData;

      const newPageInfo = { ...pageInfoInitialValues };

      // This indicates that there are more characters in the server
      if (count < total) {
        newPageInfo.hasNextPage = true;
      }

      // This indicates that the characters list is ending, e.g The default limit is set to 10 and only 3 returned,
      if (count < charactersLimit) {
        newPageInfo.hasNextPage = false;
      }

      // If the offset is 0, indicates that the current page is 1, so no previous page
      newPageInfo.hasPrevPage = offset !== 0;

      setPageInfo(newPageInfo);
      setCharacters(results);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      if (ex?.response?.status === 409) {
        toast.error(`${strings.error} ${ex}`);
      }
    }
  }, [queryParams, setLoading]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  const handlePageChange = async (paginateTo: string): Promise<void> => {
    const params = { ...queryParams };

    if (paginateTo === NEXT_PAGE_ACTION) {
      if (queryParams?.offset !== undefined) {
        params.offset = queryParams.offset + charactersLimit;
        setCurrentPage(currentPage + 1);
      }
    } else if (paginateTo === PREV_PAGE_ACTION) {
      if (queryParams?.offset !== undefined) {
        params.offset = queryParams.offset - charactersLimit;
        setCurrentPage(currentPage - 1);
      }
    }
    setQueryParams(params);
  };

  const handleNameQueryChange = (query: string): void =>
    setNameSearchQuery(query);

  const handleSearch = (key: string): void => {
    if (key === KEY_ENTER && !!nameSearchQuery) {
      setPageInfo(pageInfoInitialValues);
      setCurrentPage(1);

      setQueryParams({
        ...queryParams,
        offset: 0,
        nameStartsWith: nameSearchQuery,
      });
    }
  };

  const handleClearQuery = (): void => {
    setNameSearchQuery('');
    setPageInfo(pageInfoInitialValues);
    setCurrentPage(1);

    const params = { ...queryParams };
    params.offset = 0;
    delete params.nameStartsWith;
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
        <Pagination
          currentPage={currentPage}
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default withLoading(Home);
