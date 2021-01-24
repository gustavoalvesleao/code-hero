import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import Pagination, {
  NEXT_PAGE_ACTION,
  PREV_PAGE_ACTION,
} from '../commons/Pagination';

import characterService, { Character } from '../../services/characterService';

import strings from '../../locales/home';

interface QueryParams {
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

const Home = (): JSX.Element => {
  const [character, setCharacters] = useState<Character[]>([]);
  const charactersLimitArray = useState(10);
  const charactersLimit = charactersLimitArray[0];
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    currentOffset: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: charactersLimit,
  });

  const getCharacters = useCallback(async (): Promise<void> => {
    try {
      const { data } = await characterService.getCharacters(queryParams);
      const { data: innerData } = data;
      const { results, offset, total } = innerData;

      // This indicates that there are more characters in the server
      if (offset < total) {
        setPageInfo({
          currentPage: 1,
          currentOffset: 0,
          hasNextPage: true,
          hasPrevPage: false,
        });
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

  if (character?.length === 0)
    return <Typography variant="h4">{strings.noCharacter}</Typography>;

  return (
    <div style={styles.mainDiv}>
      {character.map((char) => (
        <div key={char.id} style={styles.card}>
          {char.name}
        </div>
      ))}
      <Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />
    </div>
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
} as const;

export default Home;
