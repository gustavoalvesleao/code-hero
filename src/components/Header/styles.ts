import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 24px',
  },
  logo: {
    width: '192px',
    height: '48px',
    [theme.breakpoints.down('sm')]: {
      width: '96px',
      height: '24px',
    },
  },
  title: {
    marginLeft: 'auto',
    fontFamily: 'Marvel-Black',
  },
}));

export default styles;
