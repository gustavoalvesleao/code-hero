import React from 'react';
import { Link } from 'react-router-dom';

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
      <a
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/gustavoalvesleao/code-hero"
      >
        {strings.title}
      </a>
    </div>
  );
};

export default Header;
