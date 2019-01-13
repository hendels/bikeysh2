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
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogTitle from '@material-ui/core/DialogTitle';
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
      outline: "none",
    },
  };
function mergeArrays(array1, array2) {
    const result_array = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while(len--) {
        const item = arr[len];

        if(!assoc[item]) 
        { 
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}


class DialogDragAndDrop extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        showIgnored: false,
        disableNewTagButton: true,
        disableNewTagRadioButtons: true,
        newTagText: '',
        valueRadioNewTag: '',
        tagArray: [],
        reloadDialogDnd: this.props.reloadDialogDnd
      }
      this.handleGetTagsForOffer();
    }
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
    handleChange = name => event => {
      this.setState({ [name]: event.target.checked }, ()=> {});
    };
    handleChangeNewTagText= ({target}) => {
      switch (true){
        case target.value !== '' && this.state.valueRadioNewTag !== '':
          this.setState({
            disableNewTagButton: false,
            newTagText: target.value
          }, () => {});
          break;
        case target.value !== '':
          this.setState({
            disableNewTagButton: true,
            disableNewTagRadioButtons: false,
            newTagText: target.value,
          }, () => {})  ;
          break;
        default:
          this.setState({
            disableNewTagButton: true,
            newTagText: ''
          }, () => {});
          break;
      }
    };
    handleChangeNewTagRadio = event => {
      this.setState({ valueRadioNewTag: event.target.value }, ()=> {
        if (this.state.newTagText !== '' && this.state.valueRadioNewTag !== ''){
          this.setState({disableNewTagButton: false}, () => {});
        }
      });
    };
    handleAddNewTag = async () => {
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
        await this.handleGetTagsForOffer();
        await this.props.reloadDialog();

      }); 
    }
    handleDeleteTag = async (tagId, offerId, tagName) => {
      await axios.post(this.props.tagUrl + `deleteTag`, {
        tagId: tagId,
        tagName: tagName,
        offerId: this.props.offer._id,
      }).then(response => response.data).then(async result => {
        await this.handleGetTagsForOffer();
        await this.props.reloadDialog();

      }); 
    }
    handleGetTagsForOffer = async () => {
      if (!this.props.dummy){
        let title = this.props.offer.title;
        //[todo - rewrite]
        let titleArray = title.split('.').join(``).split(',').join(``);
        titleArray = titleArray.split('/').join(``).split(" ");
        titleArray = titleArray.filter(function(e) {return e});
        //
        await axios.get(this.props.tagUrl + `getTags/${this.props.offer._id}`).then(response  => response.data)
        .then(result => {
          let tagArray = [];
          for (var i = 0; i < result.tagArray.length; i++){
            tagArray.push(result.tagArray[i].tagName);
          }
          const mergedArrays = mergeArrays(titleArray, tagArray);
          this.setState({tagArray: mergedArrays}, () => {})
        });
      }
    }
    
    handleCloseDialog = () => {
      this.props.onClose(false);
    }
    handleCancel = () => {
      this.props.onClose(false);
    };
    componentWillReceiveProps() {
      this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
        // console.log(`dnd received props reload MAIN DND state = ${this.state.reloadDialogDnd}`);
        if (this.props.reloadDialogDnd !== this.state.reloadDialogDnd){
          // console.log('GET TAGS WHILE RECEIVE PROPS');
          this.handleGetTagsForOffer();
        }
        this.forceUpdate();
      });
    }
    render()  {
      const { classes, onClose, selectedValue, ...other } = this.props;
      //<<split data to array [todo << da sie to zrobić lepiej] 
      // let title = this.props.offer.title;
      // let titleArray = title.split('.').join(``).split(',').join(``);
      // titleArray = titleArray.split('/').join(``).split(" ");
      // titleArray = titleArray.filter(function(e) {return e});
      
      

      //<< get tags from db

      //>>
      //const titleWords = cleanTitle;
      //console.log(titleWords);
      //>>
      
      return (
        // <Aux>
        <Dialog 
          onClose={this.handleCloseDialog} 
          maxWidth="xm"{...other} 
          PaperProps={{className: classes.tagContainer, square: "true"}}
        >
          <DialogTitle className={classes.dialogTitle}>{this.props.offer.title}</DialogTitle>
          <div className={classes.root}>
            <Dnd 
              offerId={this.props.offer._id} 
              tagArray={this.state.tagArray} 
              tagUrl={this.props.tagUrl} 
              offerOrigin="bikemarkt" 
              category={this.props.category} 
              offer={this.props.offer}
              model={this.props.model}
              showIgnored={this.state.showIgnored}
              reloadDialogDnd={this.props.reloadDialogDnd}
              deleteTag={this.handleDeleteTag}
              // tagArray={this.state.tagArray}
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
                        <AddBox/>
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
                          disabled={this.state.disableNewTagRadioButtons}
                          control={<Radio color="secondary" />}
                          label="Manufacturer"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Model"
                          disabled={this.state.disableNewTagRadioButtons}
                          control={<Radio color="secondary" />}
                          label="Model"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Group"
                          disabled={this.state.disableNewTagRadioButtons}
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