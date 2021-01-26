import React from 'react';
import Typography from '@material-ui/core/Typography';

import strings from '../../../locales/card';

import styles from './styles';

interface Props {
  imgURI: string;
  title: string;
  content1: Array<string>;
  content2: Array<string>;
}

const Card = ({ imgURI, title, content1, content2 }: Props): JSX.Element => {
  const classes = styles();

  const renderContent = (content: Array<string>): JSX.Element[] | string => {
    if (content?.length === 0) return strings.noData;
    return content.map((cont) => (
      <ul className={classes.list} key={cont}>
        <li className={classes.listItem} key={`${cont}-text`}>
          {cont}
        </li>
      </ul>
    ));
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.imgContainer}>
          <img src={imgURI} alt="char-img" />
        </div>
        <Typography variant="caption" className={classes.title}>
          {title}
        </Typography>
      </div>
      <div className={classes.contentContainer}>{renderContent(content1)}</div>
      <div className={classes.contentContainer}>{renderContent(content2)}</div>
    </div>
  );
};

export default Card;
