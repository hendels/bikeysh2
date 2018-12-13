import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

//app components
import Dnd from '../Dnd/dragDrop';
const themeLeftButtons = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        background: '#9E5A63',
        // border: 0,
        color: 'white',
        minHeight: `50px`,
        minWidth: `50px`,
        fontSize: '16px',
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: '#d68b8c'
        },
      },
    },
  },
});
const themeRightButtons = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#314455',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0px 30px 0px 30px',
        '&:hover': {
            backgroundColor: '#838e99'
        },
      },
    },
  },
});
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
    },
  };

class DialogDragAndDrop extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        showIgnored: false,
        disableNewTagButton: true,
        newTagText: '',
        valueRadioNewTag: '',
      }
    }
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
    handleChange = name => event => {
      this.setState({ [name]: event.target.checked }, ()=> {
        console.log(`ignored = ${this.state.showIgnored}`);
      });
    };
    handleChangeNewTagText= ({target}) => {
      if (target.value !== '' && this.state.valueRadioNewTag !== ''){
        this.setState({disableNewTagButton: false});
        this.setState({newTagText: target.value}, () => {});
      } else {
        this.setState({disableNewTagButton: true});
        this.setState({newTagText: ''});
      }
    };
    handleChangeNewTagRadio = event => {
      this.setState({ valueRadioNewTag: event.target.value }, ()=> {
        if (this.state.newTagText !== '' && this.state.valueRadioNewTag !== ''){
          this.setState({disableNewTagButton: false});
        }
      });
    };
    handleAddNewTag = async (tagName, targetColumnName) => {
      // console.log(`column name react: ${targetColumnName}`);
      await axios.post(this.props.tagUrl + `update/${this.state.valueRadioNewTag}`, {
        id: this.props.offer._id,
        tagName: this.state.newTagText,
        offerId: this.props.offer._id,
        offerOrigin: "bikemarkt" ,
        active: true,
        category: this.props.category.toLowerCase(),
        price: this.props.offer.price,
        model: this.props.model
      }).then(response => response.data).then(async result => {
          if (result){
            // let newObj = {[result]: true};
            // let existingTags = this.state.existingTags;
            // let foundIndex = this.getByValue(existingTags, tagName, -1);
            // if (foundIndex !== null){
            //   existingTags[foundIndex] = true;
            // } else 
            //       existingTags.push(newObj);
            // this.setState({existingTags: existingTags}, ()=>{});
            // //await sleep(1000);
            // console.log(this.state.existingTags);
            // this.setState({rerenderChip: !this.state.rerenderChip}, ()=>{});
          }
      }); 
    }
    render() {
      const { classes, onClose, selectedValue, ...other } = this.props;
      //<<split data to array [todo << da sie to zrobić lepiej] 
      let cleanTitle = this.props.offer.title.split('.').join(``).split(',').join(``);
      cleanTitle = cleanTitle.split('/').join(``).split(" ");
      cleanTitle = cleanTitle.filter(function(e) {return e});
      const titleWords = cleanTitle;
      //console.log(titleWords);
      //>>
      
      return (
        // <Aux>
        <Dialog 
          onClose={this.handleClose} 
          maxWidth="xm"{...other} 
          PaperProps={{className: classes.tagContainer, square: "true"}}
        >
          {/* <DialogTitle className={classes.dialogTitle}>Set tags for {this.props.category}</DialogTitle> */}
          <div className={classes.root}>
            <Dnd 
              offerId={this.props.offer._id} 
              titleWords={titleWords} 
              tagUrl={this.props.tagUrl} 
              offerOrigin="bikemarkt" 
              category={this.props.category} 
              offer={this.props.offer}
              model={this.props.model}
              showIgnored={this.state.showIgnored}
            />
          </div>
          <DialogActions>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={8}>
                  <Grid item>
                    <Input
                      placeholder="Add new tag"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                      onChange={this.handleChangeNewTagText}
                    />
                  </Grid>
                  <Grid item>
                      <IconButton
                        variant="outlined"
                        disabled={this.state.disableNewTagButton}
                        onClick={this.handleAddNewTag}
                      >
                        {/* <MuiThemeProvider theme={themeLeftButtons}> */}
                          <AddBox/>
                        {/* </MuiThemeProvider> */}
                      </IconButton>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        value={this.state.valueRadioNewTag}
                        onChange={this.handleChangeNewTagRadio}
                        row
                      >
                        <FormControlLabel
                          value="Manufacturer"
                          control={<Radio color="secondary" />}
                          label="Manufacturer"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Model"
                          control={<Radio color="secondary" />}
                          label="Model"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Group"
                          control={<Radio color="secondary" />}
                          label="Group"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  
                  </Grid>
                  <Grid item>
                  {/* <MuiThemeProvider theme={themeLeftButtons}> */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.showIgnored}
                        onChange={this.handleChange('showIgnored')}
                        value="showIgnored"
                        color="secondary"
                      />
                    }
                    label="Show Ignored"
                  />
                  {/* </MuiThemeProvider> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <MuiThemeProvider theme={themeRightButtons}>
                  <Button onClick={this.handleCancel} variant="outlined" className={classes.actionsRightButtons}>
                    Cancel
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
        // </Aux>            
      );
    }
}
  
DialogDragAndDrop.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(styles)(DialogDragAndDrop);