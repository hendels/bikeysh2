import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//@mui
import {Dialog, DialogActions, Button, Grid, FormControlLabel, Switch, Input, IconButton, Radio, 
  FormControl, RadioGroup, DialogTitle} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
//app components
import Dnd from '../DragAndDrop/dragDrop';
import {themeRightButtons} from '../../styles/components/Dialogs/tagDialogDndStyle';
import tagDialogDndStyle from '../../styles/components/Dialogs/tagDialogDndStyle';

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
    componentWillReceiveProps(nextProps) {
      this.setState({reloadDialogDnd: nextProps.reloadDialogDnd}, () => {
        if (nextProps.reloadDialogDnd !== this.state.reloadDialogDnd){
          this.handleGetTagsForOffer();
        }
      });
    }
    render()  {
      const { classes, onClose, selectedValue, ...other } = this.props;
      
      return (
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
      );
    }
}
  
DialogDragAndDrop.propTypes = {
classes: PropTypes.object.isRequired,
onClose: PropTypes.func,
selectedValue: PropTypes.string,
};

export default withStyles(tagDialogDndStyle)(DialogDragAndDrop);