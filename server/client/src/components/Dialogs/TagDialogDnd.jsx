import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import blue from '@material-ui/core/colors/blue';
//app components
import Dnd from '../Dnd/dragDrop';

const themeLeftButtons = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#9E5A63',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0px 30px 0px 30px',
        '&:hover': {
            backgroundColor: '#d68b8c'
        },
      },
    },
  },
});
const themeRightButtons = createMuiTheme({
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
const styles = {
    root: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    tagContainer: {
      // background: '#314455',
      background: `repeating-linear-gradient(
        -45deg,
        #697684,
        #697684 22px,
        #5a6671 22px,
        #5a6671 44px
      )`,
    },
  };

class DialogDragAndDrop extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        showIgnored: false
      }
    }
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
    handleChange = name => event => {
      this.setState({ [name]: event.target.checked }, ()=> {
        console.log(`ignored = ${this.state.showIgnored}`);
      });
    };
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      //<<split data to array [todo << da sie to zrobić lepiej] 
      let cleanTitle = this.props.offer.title.split('.').join(``).split(',').join(``);
      cleanTitle = cleanTitle.split('/').join(``).split(" ");
      cleanTitle = cleanTitle.filter(function(e) {return e});
      const titleWords = cleanTitle;
      //console.log(titleWords);
      //>>
      
      return (
        <Dialog 
          onClose={this.handleClose} 
          maxWidth="xm"{...other} 
          PaperProps={{className: classes.tagContainer, square: "true"}}
        >
          {/* <DialogTitle className={classes.dialogTitle}>Set tags for {this.props.category}</DialogTitle> */}
          <div className={classes.root}>
            <Dnd 
              offerId={this.props.offer._id} 
              titleWords={titleWords} 
              tagUrl={this.props.tagUrl} 
              offerOrigin="bikemarkt" 
              category={this.props.category} 
              offer={this.props.offer}
              model={this.props.model}
              showIgnored={this.state.showIgnored}
            />
          </div>
          <DialogActions>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={8}>
                  <Grid item>
                    <MuiThemeProvider theme={themeLeftButtons}>
                      <Button onClick={this.handleCancel} variant="outlined">
                        Add new tag
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                  {/* <Grid item>
                  <MuiThemeProvider theme={themeLeftButtons}>
                    <Button onClick={this.handleCancel} variant="outlined" className={classes.actionsLeftButtons}>
                      Show ignored
                    </Button>
                  </MuiThemeProvider>
                  </Grid> */}
                  <Grid item>
                  {/* <MuiThemeProvider theme={themeLeftButtons}> */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.showIgnored}
                        onChange={this.handleChange('showIgnored')}
                        value="showIgnored"
                        color="secondary"
                      />
                    }
                    label="Show Ignored"
                  />
                  {/* </MuiThemeProvider> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <MuiThemeProvider theme={themeRightButtons}>
                  <Button onClick={this.handleCancel} variant="outlined" className={classes.actionsRightButtons}>
                    Cancel
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      );
    }
}
  
DialogDragAndDrop.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(styles)(DialogDragAndDrop);