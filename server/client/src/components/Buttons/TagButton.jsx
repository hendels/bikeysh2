import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import TagDialog from '../Dialogs/TagDialog';
import Aux from '../../hoc/Ax/Ax';

const styles = theme => ({
  badge: {
    top: 6,
    right: -15,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});



class TagBadge extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        openTagDialog: false
    }
  }
  handleClickOpenTagDialog = () => {
    this.setState({
        openTagDialog: true
    });
  };

  handleCloseTagDialog = async (value) => {
      await this.setState({ 
          openTagDialog: false 
      });
  };
  render(){
    const { classes } = this.props;

    return (
      <Aux>
        <IconButton aria-label="Cart" onClick={this.handleClickOpenTagDialog}>
          <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
            <LibraryAdd />
          </Badge>
        </IconButton>
        <TagDialog
          open={this.state.openTagDialog}
          onClose={this.handleCloseTagDialog}
          category={this.props.category}
          offer={this.props.offer}
        />
      </Aux>
    );
  }
}

TagBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagBadge);
