import { createMuiTheme } from '@material-ui/core/styles';

const boW = 228;

const snackbarStyle = theme => ({
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
      minWidth: boW,

      textAlign: "left",
      "@media (max-width: 1024px)": {
        minWidth: "152px",
      },
      "@media (max-width: 768px)": {
        minWidth: "100px",
      },
      "@media (max-width: 425px)": {
        minWidth: "162px",
      },
      "@media (max-width: 375px)": {
        minWidth: "162px",
      },
  },
  statsContainer: {
    backgroundColor: "rgba(151, 170, 189, 0.9)",
    padding: "10px 0px 10px 5px",
    fontSize: "14px",
    "@media (max-width: 1024px)": {
      fontSize: "10px",
    },
  },
});
export const themeCancelButton = createMuiTheme({
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

export default snackbarStyle;