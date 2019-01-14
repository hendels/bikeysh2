import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import Translate from '@material-ui/icons/Translate';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

function TranslateButton(props) {
  const translate = (popupState, language) => {
    switch(language){
        case 'eng':
            props.eng();
            break;
        case 'de':
            props.de();
            break;
        case 'pl':
            props.pl();
            break;
        default:
            break;
    }
    popupState.close();
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <IconButton variant="contained" color="secondary" {...bindTrigger(popupState)}>
            <Translate/>
          </IconButton>
            <MuiThemeProvider theme={theme}>
                <Menu {...bindMenu(popupState)} PaperProps={{square: 'true'}}>
                    <MenuItem onClick={() => {translate(popupState, 'eng')}}>English</MenuItem>
                    <MenuItem onClick={() => {translate(popupState, 'pl')}}>Polish</MenuItem>
                    <MenuItem onClick={() => {translate(popupState, 'de')}}>German</MenuItem>
                </Menu>
            </MuiThemeProvider>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default TranslateButton;