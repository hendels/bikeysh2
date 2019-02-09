import { createMuiTheme } from '@material-ui/core/styles';

export const menuTheme = createMuiTheme({
    overrides: {
        MuiMenu:{
            paper: {
                backgroundColor: "#21262b",
                margin: "0px 0px 0px 0px"
            }
        },
        MuiMenuItem:{
            root: {
                backgroundColor: "#21262b",
                borderBottom: `1px solid #041424`,
                color: '#fff',
                '&:hover':{
                    boxShadow:
                    "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
                    backgroundColor: "#343c44",
                    color: '#fff',
                }
            }
        }
    },
  });
export const buttonTheme = createMuiTheme({
    overrides: {
        MuiButton:{
            root:{
                color: "#4285F5",
                textTransform: "capitalize",
            },
        },
        MuiIconButton:{
            root:{
                color: "#4285F5",
            },
        },
    }    
});