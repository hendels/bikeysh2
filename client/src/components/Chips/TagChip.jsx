import React from 'react';
import PropTypes from 'prop-types';
//@mui
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Close';

//styles
import tagChipStyle from '../../styles/components/Chips/tagChipStyle'


class TagChip extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        tagExist: false,
        reloadDialogDnd: this.props.reloadDialogDnd,
        tagName: '',
      }
    }
    componentWillReceiveProps(){
      this.handleSearchTagx(this.props.existingTags);
      this.setState({reloadDialogDnd: this.props.reloadDialogDnd}, () => {
        this.forceUpdate();
      });
    }
    componentDidMount(){
      this.handleSearchTagx(this.props.existingTags);
    }
    handleSearchTagx = async (tagList) => {
      for(var i=0; i<tagList.length; i++){
        var obj = tagList[i];
        let currentKey = null;
        let currentValue = null;
        Object.keys(obj).forEach((key,index)=>{
          currentKey = key;
        })
        for(var getTag in obj){
          currentValue = obj[getTag];
        }
        if(this.props.word === currentKey && currentValue === true){
          this.setState({tagExist: true});
          this.forceUpdate();
          break;
        }
      }
    }
    handleDeleteTag = async () => {
      this.props.deleteTag('', this.props.offerId, this.props.word);
    }
        
    render(){
        const { classes } = this.props;
        return(
            <Chip
              label={this.props.word}
              onDelete={this.state.tagExist ? this.handleDeleteTag: null}
              deleteIcon={this.state.tagExist ? <DeleteIcon /> : null}
              onClick={this.handleAddTag}
              className={classes.chip}
              style={{backgroundColor: this.state.tagExist ? "#C96567" : "#314455"}}
              variant="outlined"
            />
        )
    }
}
TagChip.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(tagChipStyle)(TagChip);