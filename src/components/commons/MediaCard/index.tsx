import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

interface Props {
  imgURI: string;
  title: string;
  url?: string;
}

const MediaCard = ({ imgURI, title, url }: Props): JSX.Element => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        {url ? (
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <img src={imgURI} alt="char-media" className={classes.image} />
          </a>
        ) : (
          <img src={imgURI} alt="char-media" className={classes.image} />
        )}
      </div>
      <Typography variant="subtitle2" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
};

export default MediaCard;
