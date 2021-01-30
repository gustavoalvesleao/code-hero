import React from 'react';
import Typography from '@material-ui/core/Typography';

import image from '../../assets/img/captain-marvel.jpg';
import strings from '../../locales/notFound';

import styles from './styles';

const NotFound = (): JSX.Element => (
  <div style={styles.container}>
    <div>
      <img style={styles.img} src={image} alt="capitan-marvel-404" />
    </div>
    <Typography variant="h5" style={styles.header}>
      {strings.notFound}
    </Typography>
  </div>
);

export default NotFound;
