import { makeStyles } from '@material-ui/core/styles';

import colors from '../../../config/colors';

const styles = makeStyles((theme) => ({
  cardContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: colors.white,
    borderRadius: '4px',
    width: '100%',
    height: '88px',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      height: '72px',
    },
    transition: '.3s',
    '&:hover': {
      boxShadow: '0px 0px 5px #00000033',
    },
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 300px',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    width: '45px',
    height: '45px',
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Marvel-Bold',
    fontSize: '18px',
    marginLeft: '24px',
  },
  contentContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    flex: '1 1 300px',
  },
  listItem: {
    fontSize: '16px',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
}));

export default styles;
