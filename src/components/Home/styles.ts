import { makeStyles } from '@material-ui/core/styles';

import colors from '../../config/colors';

const styles = makeStyles((theme) => ({
  title: {
    paddingTop: '40px',
    fontFamily: 'Marvel-Bold',
    fontSize: 60,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      textAlign: 'center',
    },
  },
  subtitle: {
    marginTop: '24px',
    fontFamily: 'Marvel-Bold',
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      marginTop: '16px',
      fontSize: 16,
      textAlign: 'center',
    },
  },
  home: {
    backgroundColor: colors.gray,
  },
  search: {
    marginTop: '8px',
    paddingBottom: '50px',
  },
  noChar: {
    paddingBottom: '20px',
  },
}));

export default styles;
