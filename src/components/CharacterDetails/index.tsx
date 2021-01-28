import React, { useCallback, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import withLoading, { SetLoadingType } from '../commons/HOC/WithLoading';

import characterService, { Character } from '../../services/characterService';
import urls from '../../config/urls';

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams> & SetLoadingType;

const CharacterDetails = (props: Props): JSX.Element => {
  const { match, setLoading, history } = props;
  const { params } = match;
  const { id: characterId } = params;

  const [character, setCharacter] = useState<Character>({} as Character);

  const getCharacter = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await characterService.getCharacter(characterId);
      const { data: innerData } = data;
      const { results } = innerData;
      setCharacter(results[0]);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      if (ex.response?.status === 404) {
        history.replace(urls.notFound);
      }
    }
  }, [setLoading, characterId, history]);

  useEffect(() => {
    getCharacter();
  }, [getCharacter]);

  return <div>{JSON.stringify(character)}</div>;
};

export default withLoading(CharacterDetails);
