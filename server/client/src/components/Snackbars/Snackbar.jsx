import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//mgt

const styles = theme => ({
    // anchorOriginBottomLeft: {
    //   backgroundColor: `#C96567`
    // },
    close: {
      padding: theme.spacing.unit / 2,
    },
  });

class SimpleSnackbar extends React.Component {
    state = {
      open: false,
    };
  
    handleClick = () => {
      this.setState({ open: true });
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ open: false });
    };
    handleUndo = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ open: false }, ()=> {
        this.setOfferVisibility();
      });
      
    };
    setOfferVisibility = async () => {
      console.log(`setting offer visibility`);
      await axios.get('/api/scoring/update/visibility/' + this.props.objOffer.id).then(response  => response.data).then(result => {
        this.props.reload();
      });
    }
    componentWillReceiveProps(){
        this.setState({open: this.props.open})
    }
    render() {
      const { classes } = this.props;
      const offerName = this.props.objOffer.trueName;
      return (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{`Offer [${offerName}] has been hidden.`}</span>}
            action={[
              <Button key="undo" size="small" onClick={this.handleUndo} style={{color: `#C96567`}}>
                UNHIDE
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
            
          />
        </div>
      );
    }
  }
  export default withStyles(styles)(SimpleSnackbar);