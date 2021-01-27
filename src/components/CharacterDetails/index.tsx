import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

const CharacterDetails = (props: Props): JSX.Element => {
  const { match } = props;
  const { params } = match;
  const { id: characterId } = params;

  return <div>{characterId}</div>;
};

export default CharacterDetails;
