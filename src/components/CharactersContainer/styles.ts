import { makeStyles } from '@material-ui/core/styles';

import colors from '../../config/colors';

const styles = makeStyles((theme) => ({
  container: {
    minHeight: '50vh',
    paddingBottom: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      minHeight: '35vh',
    },
  },
  titleContainer: {
    width: '100%',
    padding: '0 24px',
    marginBottom: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.smoke,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 200px',
  },
  charNameTitle: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '70px',
    },
  },
  otherTitle: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default styles;
