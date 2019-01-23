import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
      flexGrow: 1,
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
      minWidth: `1000px`,
      minHeight: '750px',
      zIndex: 500
    },
  };
class NewTagDialog extends React.Component {
render(){
    //alert('asd');
    const { classes, onClose, ...other } = this.props;
    return(
        <Dialog PaperProps={{className: classes.tagContainer, square: "true"}}>
            <div className={classes.root}>
                <Button>asd</Button>
            </div>
        </Dialog>
    )
}
}

export default withStyles(styles)(NewTagDialog);