import React from 'react';
import PropTypes from 'prop-types';

import {DialogTitle, Dialog, DialogContentText, DialogContent, Grid, DialogActions, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

const styles = {
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    paper: {
      background: '#97AABD'
    },
    paperText: {
      color: '#314455'
    }
};

class DialogDragAndDrop extends React.Component {
      state = {
        loading: false
      }
    handleClose = () => {
      this.props.onClose();
    };
  
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      
      return (
        <Dialog 
          onClose={this.handleClose} 
          aria-labelledby="confirmation-dialog-title" 
          aria-describedby="alert-dialog-description"
          maxWidth="false" 
          PaperProps={{className: classes.paper, square: true}} 
          {...other}
        >
          <DialogTitle id="confirmation-dialog-title">Statistics for {this.props.category}</DialogTitle>
            <DialogContent>
              <Grid container justify='center' alignContent='center' spacing={8}>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Last crawling: ${0} - put in general table this info`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Offers in database: ${0}`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Scored offers: ${0} (ratio: ${0}%)`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Favorite offers: ${0} (ratio: ${0}%)`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Active offers: ${0} (ratio: ${0}%)`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`Untagged: ${0} (ratio: ${0}%)`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText className={classes.paperText}>
                    {`New/used: ${0}% / ${0}%`}
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