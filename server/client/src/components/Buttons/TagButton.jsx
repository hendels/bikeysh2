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
    });
  };
  handleCloseTagDialog = async (withReload) => {
      await this.setState({ 
          openTagDialog: false 
      });
      if (!withReload)
        this.countAddedTags();
      else
      {
        await this.setState({ 
            openTagDialog: true 
        });
      }
  };
  countAddedTags = async () => {
    //console.log(`tags count / offer id: ${this.props.offer._id} tag url: ${this.props.tagUrl}`);
    await axios.get(this.props.tagUrl + 'tagCount/' + this.props.offer._id).then(response  => response.data).then(result => {
      //console.log(`tags count: ${result[Object.keys(this.state.tagCount)[0]]} for offer id: ${this.props.offer._id}`);
      this.setState({tagCount: result}, () => {});
    });
  }
  render(){
    const { classes } = this.props;
    
    return (
      <Aux>
        <IconButton aria-label="Cart" onClick={this.handleClickOpenTagDialog}>
          <Badge badgeContent={this.state.tagCount[Object.keys(this.state.tagCount)[0]]} color="primary" classes={{ badge: classes.badge }} >
            <LibraryAdd style={{color: this.props.color}}/>
          </Badge>
        </IconButton>
        <TagDialogDnd
          open={this.state.openTagDialog}
          onClose={this.handleCloseTagDialog}
          // handleCloseTagDialog={this.handleCloseTagDialog}
          reloadDialogDnd={this.state.reloadDialogDnd}
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
