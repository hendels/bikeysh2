import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import TagDialogDnd from '../Dialogs/TagDialogDnd';
import Aux from '../../hoc/Ax/Ax';

const styles = theme => ({
  badge: {
    top: 6,
    right: -15,
    width: `17px`,
    height: `17px`,
    backgroundColor: `#C96567`,
  },
  icon: {
    outline: "none",
    color: "#fff",
    opacity: "0.8",
  },
  iconDisabled: {
    outline: "none",
    color: "#fff",
    opacity: "0.3",
  }
});



class TagBadge extends React.Component {
  state = {
      openTagDialog: false,
      tagCount: 0,
      reloadDialogDnd: false
  }

  componentWillMount(){
    this.countAddedTags();
  }
  
  handleClickOpenTagDialog = () => {
    this.setState({
        openTagDialog: true,
        reloadDialogDnd: !this.state.reloadDialogDnd
    }, ()=> {
      if (this.props.parentStatistics)
        this.props.disableStatistics(true);
    });
  };
  handleCloseTagDialog = async (withReload) => {
      await this.setState({ 
          openTagDialog: false 
      }, () => {
        if (this.props.parentStatistics)
          this.props.disableStatistics(false)
      });
      if (!withReload)
        this.countAddedTags();
      else {
        await this.setState({ 
            openTagDialog: true 
        }, ()=> {
          if (this.props.parentStatistics)
            this.props.disableStatistics(true);
        });
      }
  };
  handleReload = () => {
    this.setState({reloadDialogDnd: !this.state.reloadDialogDnd}, () => {});
  }
  countAddedTags = async () => {
    if (!this.props.dummy)
      await axios.get(this.props.tagUrl + 'tagCount/' + this.props.offer._id).then(response  => response.data).then(result => {
        this.setState({tagCount: result}, () => {});
      });
  }
  render(){
    const { classes, mobileView, offerDetails } = this.props;
    
    return (
      <Aux>
        <IconButton aria-label="Cart" onClick={this.handleClickOpenTagDialog} disabled={mobileView}>
          <Badge badgeContent={this.state.tagCount[Object.keys(this.state.tagCount)[0]]} color="primary" classes={{ badge: classes.badge }} >
            <LibraryAdd className={!offerDetails ? mobileView ? classes.iconDisabled : classes.icon : null}/>
          </Badge>
        </IconButton>
        <TagDialogDnd
          dummy={this.props.dummy}
          open={this.state.openTagDialog}
          onClose={this.handleCloseTagDialog}
          reloadDialogDnd={this.state.reloadDialogDnd}
          reloadDialog={this.handleReload}
          category={this.props.category}
          model={this.props.model}
          offer={this.props.offer}
          tagUrl={this.props.tagUrl}
        />
      </Aux>
    );
  }
}

TagBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagBadge);
