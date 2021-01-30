import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import withLoading, { SetLoadingType } from '../commons/HOC/WithLoading';

import {
  Character,
  MediaResponse,
  PromiseSettled,
} from '../../interfaces/character';

import characterService from '../../services/characterService';
import urls from '../../config/urls';
import strings from '../../locales/characterDetails';
import { buildThumbnailUrl } from '../../utils/characterHelper';

import styles from './styles';

interface MatchParams {
  id: string;
}

interface QueryParams {
  limit: number;
}

type Props = RouteComponentProps<MatchParams> & SetLoadingType;

const IMAGE_VARIANT = 'portrait_uncanny';
const medias = { COMICS: 'comics', SERIES: 'series', EVENTS: 'events' };
const queryParams: QueryParams = { limit: 5 };

const CharacterDetails = (props: Props): JSX.Element => {
  const classes = styles();
  const { match, setLoading, history } = props;
  const { params } = match;
  const { id: characterId } = params;

  const [character, setCharacter] = useState<Character>({} as Character);
  const [comics, setComics] = useState<MediaResponse>({} as MediaResponse);
  const [series, setSeries] = useState<MediaResponse>({} as MediaResponse);
  const [events, setEvents] = useState<MediaResponse>({} as MediaResponse);

  const hasCharacter = useMemo(() => {
    if (character) {
      return !!Object?.keys(character)?.length;
    }
    return false;
  }, [character]);

  const getCharacter = useCallback(async () => {
    try {
      const { data } = await characterService.getCharacter(characterId);
      const { data: innerData } = data;
      const { results } = innerData;
      setCharacter(results[0]);
    } catch (ex) {
      if (ex.response?.status === 404) {
        history.replace(urls.notFound);
      }
    }
  }, [characterId, history]);

  const getCharacterMedias = useCallback(async () => {
    try {
      const response = await Promise.allSettled([
        characterService.getCharacterMedia(
          characterId,
          medias.COMICS,
          queryParams,
        ),
        characterService.getCharacterMedia(
          characterId,
          medias.SERIES,
          queryParams,
        ),
        characterService.getCharacterMedia(
          characterId,
          medias.EVENTS,
          queryParams,
        ),
      ]);

      const comicsResponse = response[0] as PromiseSettled<MediaResponse>;
      setComics(comicsResponse.value);

      const seriesResponse = response[1] as PromiseSettled<MediaResponse>;
      setSeries(seriesResponse.value);

      const eventsResponse = response[2] as PromiseSettled<MediaResponse>;
      setEvents(eventsResponse.value);
    } catch (ex) {
      if (ex?.response?.status === 409) {
        toast.error(`${strings.error} ${ex}`);
      }
    }
  }, [characterId]);

  useEffect(() => {
    setLoading(true);

    getCharacter().then(() => setLoading(false));
    getCharacterMedias().then(() => setLoading(false));

    return (): void => setLoading(false);
  }, [setLoading, getCharacter, getCharacterMedias]);

  if (!hasCharacter)
    return <Typography variant="h5">{strings.noCharInfo}</Typography>;

  return (
    <>
      <div>{JSON.stringify(character)}</div>
      <div>{JSON.stringify(character)}</div>
      <div>{JSON.stringify(character)}</div>
      <div>{JSON.stringify(character)}</div>)
    </>
  );
};

export default withLoading(CharacterDetails);
