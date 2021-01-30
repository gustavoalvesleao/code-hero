import { makeStyles } from '@material-ui/core/styles';

import colors from '../../../config/colors';

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px',
    marginRight: '22px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
    },
  },
  imageContainer: {
    width: '224px',
    height: '336px',
    boxShadow: '0 3px 12px #00000033',
    transition: '.3s',
    '&:hover': {
      boxShadow: '0 6px 24px rgba(31, 31, 31, 0.5)',
    },
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    marginTop: '10px',
    fontSize: '16px',
    fontFamily: 'Marvel-Bold',
    width: '200px',
    wordWrap: 'break-word',
    color: colors.darkBlack,
  },
}));

export default styles;
