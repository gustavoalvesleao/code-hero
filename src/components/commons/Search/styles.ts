import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  clearIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '11px 8px 8px 48px',
    paddingLeft: 0,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default styles;
