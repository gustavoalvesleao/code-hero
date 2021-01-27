import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import urls from '../../config/urls';
import objectiveLogo from '../../assets/img/logo-objective.png';
import strings from '../../locales/header';

import styles from './styles';

const Header = (): JSX.Element => {
  const classes = styles();

  return (
    <div className={classes.header}>
      <Link to={urls.home}>
        <img
          className={classes.logo}
          src={objectiveLogo}
          alt="objective-logo"
        />
      </Link>
      <Typography variant="subtitle1" className={classes.title}>
        {strings.title}
      </Typography>
    </div>
  );
};

export default Header;
