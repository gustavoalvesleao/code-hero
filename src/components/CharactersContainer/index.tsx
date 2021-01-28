import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Card from '../commons/Card';

import {
  Character,
  CharacterMaterialItems,
  Thumbnail,
} from '../../services/characterService';
import { urlToHttps } from '../../utils/characterHelper';

import strings from '../../locales/charactersContainer';
import urls from '../../config/urls';

import styles from './styles';

interface Props {
  characters: Array<Character>;
}

const imageURIVariant = 'standard_small';

// Only three items (max) will be displayed for each category
const getItems = (
  items: Array<CharacterMaterialItems>,
  numberOfItems: number,
): Array<string> => {
  const itemsName: Array<string> = [];
  items.forEach((element, index) => {
    if (index < numberOfItems) {
      itemsName.push(element.name);
      return true;
    }
    return false;
  });
  return itemsName;
};

// This function builds the url to get a given thumbnail
const buildThumbnailUrl = (thumbnail: Thumbnail, imageURI: string): string =>
  `${urlToHttps(thumbnail.path)}/${imageURI}.${thumbnail.extension}`;

const CharactersContainer = ({ characters }: Props): JSX.Element => {
  const classes = styles();
  const history = useHistory();

  const handleCardClicked = useCallback(
    (id) => history.push(`${urls.characters}/${id}`),
    [history],
  );

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography
          variant="caption"
          className={`${classes.title} ${classes.charNameTitle}`}
        >
          {strings.charName}
        </Typography>
        <Typography
          variant="caption"
          className={`${classes.title} ${classes.otherTitle}`}
        >
          {strings.series}
        </Typography>
        <Typography
          variant="caption"
          className={`${classes.title} ${classes.otherTitle}`}
        >
          {strings.events}
        </Typography>
      </div>
      {characters.map((char) => (
        <Card
          key={char.id}
          imgURI={buildThumbnailUrl(char.thumbnail, imageURIVariant)}
          title={char.name}
          content1={getItems(char.series.items, 3)}
          content2={getItems(char.events.items, 3)}
          onClick={(): void => handleCardClicked(char.id)}
        />
      ))}
    </div>
  );
};

export default CharactersContainer;
