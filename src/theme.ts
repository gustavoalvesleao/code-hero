import { createMuiTheme } from '@material-ui/core/styles';

import colors from './config/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Marvel-Regular',
    fontSize: 24,
  },
  palette: {
    text: {
      primary: colors.darkSmoke,
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          border: 'none',
        },
      },
    },
  },
});

export default theme;
