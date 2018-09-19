import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });


class TagChip extends React.Component{
    handleDeleteTag() {
        console.log('You clicked the delete icon.'); 
      }
      
      handleAddTag() {
        console.log('You clicked the Chip.'); 
      }
        
      handleIgnoreTag() {
        console.log('You ignored the Chip.'); 
      }
    render(){
        const { classes } = this.props;
        return(
            <Chip
            avatar={
              <Avatar>C</Avatar>
            }
            label={this.props.word}
            onDelete={this.handleDeleteTag}
            deleteIcon={<DoneIcon />}
            onClick={this.handleAddTag}
            className={classes.chip}
            color="action"
            />
        )
    }
}
TagChip.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(TagChip);