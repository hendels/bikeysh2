import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Close';
import NoTag from '@material-ui/icons/AddCircle';

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
    constructor(props){
      super(props);
      this.state = {
        tagExist: false
      }
      this.handleSearchTag = this.handleSearchTag.bind(this);
    }
    componentWillReceiveProps(){
      console.log(this.props.existingTags);
      this.handleSearchTagx(this.props.existingTags);
    }
    componentDidMount(){
      this.handleSearchTagx(this.props.existingTags);
    }
    handleSearchTag = async (tagName) => {
        
      const tagInfo = await axios.get(this.props.tagUrl + 'findTag/' + tagName + `/` + this.props.offerId) 
        .then(response  => response.data)
        .then(result => {
          if (result){
              this.setState({tagExist: true});
              // console.log('TAG FOUND');
              this.forceUpdate();

          }
        });
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
          // console.log('TAG FOUND');
          this.forceUpdate();
          break;
        }
      }
    }
    handleDeleteTag = async () => {
        console.log('You clicked the delete icon.'); 
      }
      
    handleAddTag() {
      console.log('You clicked the Chip.'); 
    }
        
    render(){
        const { classes } = this.props;
        return(
            <Chip
            avatar={
              <Avatar>{this.props.word.charAt(0).toUpperCase()}</Avatar>
            }
            label={this.props.word}
            onDelete={this.handleDeleteTag}
            deleteIcon={this.state.tagExist ? <DeleteIcon /> : <NoTag/>}
            onClick={this.handleAddTag}
            className={classes.chip}
            color={this.state.tagExist ? "secondary" : "primary"}
            />
        )
    }
}
TagChip.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(TagChip);