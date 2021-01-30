import { makeStyles } from '@material-ui/core/styles';

import colors from '../../config/colors';

const styles = makeStyles((theme) => ({
  mainContainer: {
    padding: '100px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 0',
    },
    backgroundColor: colors.smoothRed,
  },
  charInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  charImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    minWidth: '300px',
    minHeight: '450px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
      width: '300px',
      height: '450px',
    },
  },
  charName: {
    fontFamily: 'Marvel-Bold',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      textAlign: 'center',
      fontSize: '48px',
    },
  },
  charDescription: {
    color: colors.white,
    marginLeft: '70px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      textAlign: 'center',
      fontSize: '28px',
    },
  },
  moreInfoContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'baseline',
  },
  link: {
    textDecoration: 'none',
    color: colors.white,
    transition: '0.25s',
    '&:hover': {
      color: colors.black,
    },
    [theme.breakpoints.down('sm')]: {
      color: colors.black,
    },
  },
  mediaContainer: {
    marginTop: '50px',
  },
}));

export default styles;
