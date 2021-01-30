import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import MediaCard from '../commons/MediaCard';

import {
  buildThumbnailUrl,
  getUniqueKey,
  getUrl,
} from '../../utils/characterHelper';
import { MediaResponse } from '../../interfaces/character';

import strings from '../../locales/mediaContainer';

import styles from './styles';

interface Props {
  media: MediaResponse;
  title: string;
}

const IMAGE_VARIANT = 'portrait_uncanny';
const URL_TYPE = 'detail';

const MediaContainer = ({ media, title }: Props): JSX.Element => {
  const classes = styles();

  const hasMedia = useMemo(() => !!media?.data?.data?.results?.length, [media]);

  // This Component renders a card with an image and a title. If a url to Marvel site is available,
  // a link to it will also be rendered
  return (
    <>
      <Typography variant="h4" className={classes.title}>
        {title.toUpperCase()}
      </Typography>
      {hasMedia ? (
        <div className={classes.container}>
          {media?.data?.data?.results.map((item, index) => (
            <MediaCard
              key={getUniqueKey(item.title, index)}
              imgURI={buildThumbnailUrl(item.thumbnail, IMAGE_VARIANT)}
              title={item.title}
              url={getUrl(item.urls, URL_TYPE)}
            />
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noMedia}>
          {strings.noMedia}
        </Typography>
      )}
    </>
  );
};

export default MediaContainer;
