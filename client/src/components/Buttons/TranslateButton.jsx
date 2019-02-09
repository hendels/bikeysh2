import React from 'react';
//@mui
import {Button, Menu, MenuItem} from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import Translate from '@material-ui/icons/GTranslate';
import { MuiThemeProvider } from '@material-ui/core/styles';
//styles
import {menuTheme, buttonTheme} from '../../styles/components/Buttons/translateButtonStyle';

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
            <MuiThemeProvider theme={buttonTheme}>
                <Button variant="text" size="small" {...bindTrigger(popupState)}>
                    <Translate/>
                    Translate
                </Button>
            </MuiThemeProvider>
            <MuiThemeProvider theme={menuTheme}>
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