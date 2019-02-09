import { createMuiTheme } from '@material-ui/core/styles';

export const themeRightButtons = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          background: '#314455',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 30,
          padding: '0px 30px 0px 30px',
          '&:hover': {
              backgroundColor: '#838e99'
          },
        },
      },
    },
  });
  const tagDialogDndStyle = {
    root: {
    flexGrow: 1,
    },
    tagContainer: {
    background: `repeating-linear-gradient(
        -45deg,
        #697684,
        #697684 22px,
        #5a6671 22px,
        #5a6671 44px
    )`,
    outline: "none",
    },
};

export default tagDialogDndStyle;