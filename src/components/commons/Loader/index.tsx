import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import animation from '../../../assets/animations/loader.json';

import styles from './styles';

const Loader = (): JSX.Element => (
  <div style={styles.container}>
    <div style={styles.loader}>
      <Player autoplay loop style={styles.customStyle} src={animation} />
    </div>
  </div>
);

export default Loader;
