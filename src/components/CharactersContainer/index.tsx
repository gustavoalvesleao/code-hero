import React from 'react';
import Typography from '@material-ui/core/Typography';

import Card from '../commons/Card';

import {
  Character,
  CharacterMaterialItems,
  Thumbnail,
} from '../../services/characterService';

import strings from '../../locales/charactersContainer';

import styles from './styles';

interface Props {
  characters: Array<Character>;
}

const imageURIVariant = 'standard_small';

const CharactersContainer = ({ characters }: Props): JSX.Element => {
  const classes = styles();

  const getItems = (series: Array<CharacterMaterialItems>): Array<string> => {
    const itemsName: Array<string> = [];
    series.forEach((element, index) => {
      if (index < 3) {
        itemsName.push(element.name);
        return true;
      }
      return false;
    });
    return itemsName;
  };

  const urlToHttps = (url: string): string =>
    url.replace(/^http:\/\//i, 'https://');

  const buildThumbnailUrl = (thumbnail: Thumbnail): string =>
    `${urlToHttps(thumbnail.path)}/${imageURIVariant}.${thumbnail.extension}`;

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
          imgURI={buildThumbnailUrl(char.thumbnail)}
          title={char.name}
          content1={getItems(char.series.items)}
          content2={getItems(char.events.items)}
        />
      ))}
    </div>
  );
};

export default CharactersContainer;
