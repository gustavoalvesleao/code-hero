import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';

import strings from '../../../locales/search';

import styles from './styles';

interface Props {
  searchQuery: string;
  placeHolder: string;
  onChange(value: string): void;
  onKeyPress(key: string): void;
  onClearQuery(): void;
}

const AppSearch = ({
  searchQuery,
  placeHolder,
  onChange,
  onKeyPress,
  onClearQuery,
}: Props): JSX.Element => {
  const classes = styles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeHolder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e): void => onChange(e.currentTarget.value)}
        onKeyPress={(e): void => onKeyPress(e.key)}
      />
      {!!searchQuery && (
        <div className={classes.clearIcon}>
          <Tooltip title={strings.tooltip}>
            <ClearIcon onClick={onClearQuery} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default AppSearch;
