import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ImageStepper from '../ImageStepper/ImageStepper.js';
import blue from '@material-ui/core/colors/blue';

const styles = {
    root: {
      // minWidth: '500px',
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    paper: {
      // minWidth: 500,
      background: '#97AABD'
    },
    paperText: {
      color: '#314455'
    }

};

class DialogDragAndDrop extends React.Component {
      state = {
        loading: false,
        description: this.props.offer.description,

      }
    handleClose = () => {
      this.props.close();
    };
    handleTranslate = async (toTranslate, language) => {
      await axios.post(`/api/translate`, {
        toTranslate: toTranslate,
        language: language,
      }).then(response => response.data).then(async result => {
        console.log(result);
        this.setState({description: result}, ()=> {
          console.log(this.state.description);
          this.forceUpdate()
        });
      }); 
    };
    handleClickTranslationButton = (toTranslate, language) => {
      this.handleTranslate(this.props.offer.description, 'eng');
    };
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      console.log('rerender');
      return (
        <Dialog 
          onClose={this.handleClose} 
          aria-labelledby="confirmation-dialog-title" 
          aria-describedby="alert-dialog-description"
          maxWidth="false" 
          PaperProps={{className: classes.paper, square: true}} 
          {...other}
        >
          <DialogTitle id="offerDetails">{this.props.offer.title}</DialogTitle>
            <DialogContent>
              <Grid container justify='center' alignContent='center' spacing={8}>
                <Grid item xs={8}>
                  <ImageStepper
                    offer={this.props.offer}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={this.handleClickTranslationButton}>translate</Button>
                  <DialogContentText className={classes.paperText}>
                    {`Offers in database: ${0}`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText className={classes.paperText}>
                    {`Description: ${this.state.description}`}
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
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