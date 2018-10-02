import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/DeleteSweep';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//app components
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt.jsx';
import TagButton from '../../Buttons/TagButton';
import TagDialog from '../../Dialogs/TagDialog.jsx';
//hoc components


const styles = theme => ({
    card: {
      minWidth: 400,
      maxWidth: 400,
      minHeight: 400,
    //   maxHeight: 500
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
});

class BestOffer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            offerCount: this.props.offerCount,
            expanded: false,
            grade: 'S',
            openTagDialog: false,
            trueName: ``,
        }
    }
    componentWillMount(){
        this.getDeductedName();
        console.log(`mounting best offer...`);
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleClickOpenTagDialog = () => {
        this.setState({
            openTagDialog: true
        });
      };
    
    handleCloseTagDialog = () => {
        this.setState({ 
            openTagDialog: false 
        });
    };
    getDeductedName = async () => {
        await axios.get('/api/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
            this.setState({trueName: result.scoring[0].fullName}, () => {});
            // console.log(`scoring name: ${result[Object.keys(this.state.trueName)[0]]} for offer id: ${this.props.offer._id}`);
            // console.log(result[Object.keys(this.state.trueName)[0]]);
            console.log(result.scoring[0].fullName);
      });
    }
    render(){
        const { classes } = this.props;
        let piclink = <a>No image at all.</a>;
        if(this.props.offer.pictures !== null || this.props.offer.pictures !== undefined){
            for (var x in this.props.offer.pictures){
                // piclink = <img src={this.props.offer.pictures[x]} alt={"No Image for: " + this.props.offer._id}/>
                piclink = this.props.offer.pictures[x];
                break;
            }
        }
        
        return(
            
            <Card className={classes.card}>
                <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                    {this.state.grade}
                    </Avatar>
                }
                action={
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                }
                title={this.props.offer.price + " to PLN"}
                subheader={this.props.offer.publishDate}
                
                />
                <CardMedia
                className={classes.media}
                image={piclink}
                title={this.props.offer.price}
                />
                <CardContent>
                <Typography component="h3">
                    {this.state.trueName}
                    <p>  &nbsp;</p>
                </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <FavoriteButton dataKey={this.props.offer._id} favorite={this.props.offer.favorite} fetchUrl={this.props.fetchUrl}/>
                    <TagButton onClick={this.handleClickOpenTagDialog} category={this.props.category} offer={this.props.offer} tagUrl={this.props.tagUrl}/>
                    {/* <TagDialog
                        open={this.state.openTagDialog}
                        onClose={this.handleClose}
                    /> */}
                    {/* delete from best offers + [todo] add modal popup */}
                    <Delete/>
                    <IconButton
                        className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                    <ExpandMoreIcon />
                </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph variant="body2">
                    Method:
                    </Typography>
                    <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    </Typography>
                    <Typography paragraph>
                    Based on: 453 similar offers with tag ratio: 
                    </Typography>
                    <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    </Typography>
                    <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
                </Collapse>
            </Card>
        )
    }
}

BestOffer.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(BestOffer);