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
      color: "white"
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
export default withStyles(styles)(TagChip);