import { makeStyles } from '@material-ui/core/styles';

import colors from '../../../config/colors';

const styles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    borderRadius: '4px',
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      width: '33%',
    },
  },
  searchIconContainer: {
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    color: colors.darkGray,
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  clearIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: colors.darkGray,
  },
  inputRoot: {
    color: 'inherit',
    width: '70%',
    paddingBottom: '5px',
    fontSize: '22px',
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
