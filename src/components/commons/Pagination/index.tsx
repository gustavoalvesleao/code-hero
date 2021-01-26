import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import strings from '../../../locales/pagination';

import styles from './styles';

interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Props {
  pageInfo: PageInfo;
  onPageChange(ACTION: string): void;
}

const Pagination = ({ pageInfo, onPageChange }: Props): JSX.Element => {
  const { currentPage, hasNextPage, hasPrevPage } = pageInfo;
  const classes = styles();
  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1" className={classes.item}>
        {`${strings.page} ${currentPage}`}
      </Typography>
      <Button
        variant="contained"
        size="small"
        disabled={!hasPrevPage}
        onClick={(): void => onPageChange(PREV_PAGE_ACTION)}
        className={classes.item}
      >
        {strings.prev}
      </Button>
      <Button
        variant="contained"
        size="small"
        disabled={!hasNextPage}
        onClick={(): void => onPageChange(NEXT_PAGE_ACTION)}
        className={classes.item}
      >
        {strings.next}
      </Button>
    </Container>
  );
};

export const NEXT_PAGE_ACTION = 'nextPage';
export const PREV_PAGE_ACTION = 'prevPage';

export default Pagination;
