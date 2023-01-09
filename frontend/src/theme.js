import { createTheme } from '@mui/material/styles';
import { LinkBehavior } from './helpers/LinkBehavior';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    muted: '#999'
    /*primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },*/
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  }
});

export default theme;