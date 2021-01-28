import React from 'react';
import Typography from '@material-ui/core/Typography';

import { getUniqueKey } from '../../../utils/characterHelper';
import strings from '../../../locales/card';

import styles from './styles';

interface Props {
  imgURI: string;
  title: string;
  content1: Array<string>;
  content2: Array<string>;
  onClick(): void;
}

const Card = ({
  imgURI,
  title,
  content1,
  content2,
  onClick,
}: Props): JSX.Element => {
  const classes = styles();

  const renderContent = (content: Array<string>): JSX.Element[] | string => {
    if (content?.length === 0) return strings.noData;
    return content.map((cont, index) => (
      <li className={classes.listItem} key={getUniqueKey(cont, index)}>
        {cont}
      </li>
    ));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={classes.cardContainer}
    >
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
