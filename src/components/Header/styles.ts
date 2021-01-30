import { makeStyles } from '@material-ui/core/styles';

import colors from '../../config/colors';

const styles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 24px',
    boxShadow: '0px 0px 5px #00000033',
  },
  logo: {
    width: '192px',
    height: '48px',
    [theme.breakpoints.down('sm')]: {
      width: '96px',
      height: '24px',
    },
  },
  link: {
    textDecoration: 'none',
    marginLeft: 'auto',
    fontFamily: 'Marvel-Black',
    color: colors.darkSmoke,
    fontSize: '32px',
  },
}));

export default styles;
