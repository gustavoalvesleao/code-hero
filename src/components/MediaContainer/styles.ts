import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Marvel-Black',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  noMedia: {
    fontFamily: 'Marvel-Bold',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

export default styles;
