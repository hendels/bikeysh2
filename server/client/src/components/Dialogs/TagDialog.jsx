import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import blue from '@material-ui/core/colors/blue';
//app components
import TagChip from '../Chips/TagChip.jsx';
import Spinner from '../UI/Spinner.jsx';

const emails = ['username@gmail.com', 'user02@gmail.com', 'asd', 'qew', 'asd', 'qew', 'asd', 'qew', 'asd', 'qew', 'asd', 'qew'];
const styles = {
    root: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  };

class SimpleDialog extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false
      }
    }
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      //<<split data to array
      const titleWords = this.props.offer.title.split(" ");
      //>>
      
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="confirmation-dialog-title" maxWidth="xs"{...other}>
          <DialogTitle id="confirmation-dialog-title">Set tags for {this.props.category}</DialogTitle>
          <div className={classes.root}>
          <Grid container justify="center" spacing="0" >
              {titleWords.map(word => (
                <Grid key={word} item xs={6} >
                  <TagChip offerId={this.props.offer._id} word={word} tagUrl={this.props.tagUrl} offerOrigin="bikemarkt"/>
                </Grid>
              ))}
            </Grid>
          </div>
            <List>
              <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add tag" />
              </ListItem>
            </List>
          {/* </div> */}
          {/* <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
          </DialogActions> */}
        </Dialog>
      );
    }
}
  
SimpleDialog.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);