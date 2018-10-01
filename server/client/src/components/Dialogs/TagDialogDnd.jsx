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
import TagChip from '../Chips/TagChip';
import Spinner from '../UI/Spinner';
import Dnd from '../Dnd/dragDrop';

const styles = {
    root: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  };

class DialogDragAndDrop extends React.Component {
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
      let cleanTitle = this.props.offer.title.split('.').join(``).split(',').join(``);
      cleanTitle = cleanTitle.split('/').join(``).split(" ");
      cleanTitle = cleanTitle.filter(function(e) {return e});
      const titleWords = cleanTitle;
      console.log(titleWords);
      //>>
      
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="confirmation-dialog-title" maxWidth="xm"{...other}>
          <DialogTitle id="confirmation-dialog-title">Set tags for {this.props.category}</DialogTitle>
          <div className={classes.root}>
            <Dnd offerId={this.props.offer._id} titleWords={titleWords} tagUrl={this.props.tagUrl} 
                 offerOrigin="bikemarkt" category={this.props.category} offer={this.props.offer}/>
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
          <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
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