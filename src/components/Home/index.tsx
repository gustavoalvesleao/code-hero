import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import Pagination, {
  NEXT_PAGE_ACTION,
  PREV_PAGE_ACTION,
} from '../commons/Pagination';

import characterService, { Character } from '../../services/characterService';

import strings from '../../locales/home';
import AppSearch from '../commons/Search';

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

const Home = (): JSX.Element => {
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

  const hasCharacters = !!characters?.length;

  const getCharacters = useCallback(async (): Promise<void> => {
    try {
      const { data } = await characterService.getCharacters(queryParams);
      const { data: innerData } = data;
      const { results, total, count } = innerData;

      const newPageInfo = { ...pageInfoInitialValues };

      // This indicates that there are more characters in the server
      if (count < total) {
        newPageInfo.hasNextPage = true;
        setPageInfo(newPageInfo);
      }

      setCharacters(results);
    } catch (ex) {
      toast.error(`${strings.error} ${ex}`);
    }
  }, [queryParams]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

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
      const { data } = await characterService.getCharacters(params);
      const { data: innerData } = data;
      const { results, offset, count } = innerData;

      // This indicates that the characters list is ending, e.g The default limit is set to 10 and only 3 returned,
      if (count < charactersLimit) {
        newPageInfo.hasNextPage = false;
      }

      if (offset === 0) {
        newPageInfo.hasPrevPage = false;
      }

      setCharacters(results);
      setPageInfo(newPageInfo);
    } catch (ex) {
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
    }
  };

  const handleClearQuery = (): void => {
    setNameSearchQuery('');
    setPageInfo(pageInfoInitialValues);

    const params = { ...queryParams };
    params.offset = 1;
    delete params.name;
    setQueryParams(params);
  };

  if (!hasCharacters)
    return <Typography variant="h4">{strings.noCharacter}</Typography>;

  return (
    <>
      <div style={styles.search}>
        <AppSearch
          searchQuery={nameSearchQuery}
          placeHolder={strings.searchPlaceholder}
          onChange={handleNameQueryChange}
          onKeyPress={handleSearch}
          onClearQuery={handleClearQuery}
        />
      </div>
      <div style={styles.mainDiv}>
        {characters.map((char) => (
          <div key={char.id} style={styles.card}>
            {char.name}
          </div>
        ))}
        <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

const styles = {
  mainDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
  },
  card: {
    padding: '100px',
    backgroundColor: 'tomato',
    width: '30%',
    height: '100px',
    marginBottom: '10px',
  },
  search: {
    marginBottom: '20px',
  },
} as const;

export default Home;
