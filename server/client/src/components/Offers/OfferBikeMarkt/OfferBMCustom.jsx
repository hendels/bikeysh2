import React from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
//mui core
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
//mui icons
import InfoIcon from '@material-ui/icons/Info';
import DesiredAdd from '@material-ui/icons/PlaylistAdd';
import AddComment from '@material-ui/icons/NoteAdd';
import Vendor from '@material-ui/icons/MonetizationOn';
import Face from '@material-ui/icons/Face';
import Delete from '@material-ui/icons/DeleteSweep';
import Viewed from '@material-ui/icons/Visibility';
import Link from '@material-ui/icons/Link';
import Block from '@material-ui/icons/Block';

//custom components
import Aux from '../../../hoc/Ax/Ax';
import FavoriteButton from '../../FavButton/FavButtonBikeMarkt';
import TagButton from '../../Buttons/TagButton';
//styles
import {
    bikeyshColor1,
    bikeyshColor2,
    bikeyshColor3,
    bikeyshColor4,
    bikeyshColor5,
    bikeyshColor6,
    bikeyshColor7,
} from "../../../styles/material-kit-react";

const styles = theme => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'nowrap',
    //   justifyContent: 'space-around',
    //   position: 'relative',
        width: 1000,
        height: 200,

    },
    gridElement: {
      width: 1000,
    //   height: 200,
    //   position: "relative",

    },
    gridElementTitle: {
        zIndex: 1,
        fontSize: "20px",
        color: "#fff",
        textShadow: `1px 1px ${bikeyshColor5}`,
        paddingLeft: `15px`,
    },
    gridElementDownbar: {
        //position: 'relative',
        zIndex: 0,
        minWidth: 1000,
        minHeight: 70,
        background: "#000",
        opacity: "0.63",
        color: "#fff",
        paddingLeft: `15px`,
        paddingRight: `15px`
        // textOverflow: "ellipsis",
        // !required for overflow!
        // whiteSpace: "nowrap",
        // overflow: "hidden"
    },
    gridElementUpbar: {
        zIndex: 0,
        minWidth: 1000,
        minHeight: 30,
        maxHeight: 30,
        background: `rgba(39,31,36,0.3)`,
    },
    gridElementInfo: {
        width: 250,
        height: 200,
        background: bikeyshColor6,

    },
    gridElementInfoActions:{
        minHeight: 50,
        maxHeight: 70,
        minWidth: 250,
        // background: "#000",
        // opacity: "0.63",
        paddingLeft: `15px`,
        paddingRight: `15px`,
        borderInlineStart: `2px dotted ${bikeyshColor4}`,
        writingMode: `vertical-rl`,
    },
    gridElementInfoTitle: {
        color: "#fff",
        fontSize: "15px",
        textShadow: `1px 1px ${bikeyshColor4}`,
        margin: `5px 5px 0px 5px`
    },
    gridElementInfoText:{
        color: "#fff",
        fontSize: "12px",
        textAlign: "left"
    },
    scores: {
        backgroundColor: `#C96567`,
        fontSize: `20px`,
        fontFamily: `Lobster`,
        textShadow: `1px 1px #314455`,
        right: `15px`,
        opacity: `1`,
        zIndex: 1,
        marginTop: `15px`,
    },
    badge: {
        top: 6,
        right: -15,
        width: `17px`,
        height: `17px`,
        backgroundColor: `#C96567`,
    },
  });


class OfferBMCustom extends React.Component{

state = {scoringData: {trueName: '', price: 0, currency: "currency", median: 0, countTotal: 0, scores: 0, itemState: ''},}
componentDidMount(){
    
    console.log(`mounting offer...`);
}
componentWillReceiveProps(){
    this.setState({scoringData: {scores: 0}});
    this.getScoringData();
}
getScoringData = async () => {
    await axios.get('/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
        if (result.scoring.length > 0) {
            var scoringData = {
                trueName: result.scoring[0].fullName,
                price: result.scoring[0].price,
                currency: result.scoring[0].currency,
                median: result.scoring[0].median,
                countTotal: result.scoring[0].countTotal,
                scores: result.scoring[0].scores,
                itemState: result.scoring[0].itemState,
            }
            this.setState({scoringData: scoringData}, () => {});
        }
  });
}
render(){
const {classes} = this.props;
console.log(`stateItem: ${this.state.scoringData.itemState}`);
return(
    <Grid container direction="row" justify="center" spacing={0}>
        {/* // main & statistics section */}
        <Grid item>
            <Grid container direction="column" justify="space-between" alignItems="flex-start" className={classes.root} 
            style={{
                background: `#000 url(${this.props.piclink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
            }}>
                <Grid container className={classes.gridElementUpbar} direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <span className={classes.gridElementTitle}>
                            {this.props.offer.title}
                        </span>
                    </Grid>
                    <Grid item>
                        {this.state.scoringData.scores !== 0 ? 
                            <Avatar aria-label="Recipe" className={classes.scores}>
                                {parseFloat(this.state.scoringData.scores).toFixed(1)}
                            </Avatar>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                <Grid container className={classes.gridElementDownbar} direction="column" justify="space-between" alignItems="stretch" >
                    <Grid item>
                        <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
                                    <Grid item>
                                        {this.props.offer.dealer === "Nein" ? <Face/> : <Vendor/>} 
                                    </Grid>
                                    <Grid item>
                                        {this.state.scoringData.urlActive !== null ?
                                            this.state.scoringData.urlActive ? <Link/> : <Block/> 
                                            : null
                                        } 
                                    </Grid>
                                    <Grid item>
                                        {this.props.offer.watchedTimes > 0 ?  
                                        <Badge badgeContent={this.props.offer.watchedTimes} classes={{ badge: classes.badge }} >
                                            <Viewed />
                                        </Badge>    
                                        : 
                                        null}
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            {/* <Grid item/> */}
                            <Grid item className={classes.gridElementInfoTitle}>
                                <b>{this.props.offer.price}</b>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {this.props.offer.description !== undefined ? 
                            this.props.offer.description.length > 255 ? 
                            this.props.offer.description.slice(0, 255) + "..." : this.props.offer.description
                        : null}
                    </Grid>
                    
                </Grid>
            </Grid>
                {/* date / price / trending - views / scores / tradesman / true name / stats for true name / href / fav / tags /used - new
                transated description - first 100 sign?
                hide from list 
                check for availability url - mark as unavailable / available
                3 top parameters per category : wheel size / 142 / frame size
                //description on below image bar - on hoover show 255 signs? train animation//
                //functions on the right side icons and actions// */}
        {/* </div> */}
        </Grid>
        {/* // details & action section */}
        <Grid item>
            <Grid container spacing={0} direction="row" justify="space-evenly" alignItems="flex-end" className={classes.gridElementInfo}>
                <Grid item xs={12} className={classes.gridElementInfoTitle}>
                    {this.state.scoringData.trueName !== `` ? this.state.scoringData.trueName + '- hoover, stats' : 'not defined'}
                </Grid>
                {/* core info */}
                <Grid item xs={12} className={classes.gridElementInfoText}>
                    {this.state.scoringData.itemState !== `` && this.state.scoringData.itemState !== undefined ?
                        this.state.scoringData.itemState : 'not defined'
                    }
                </Grid>
                {/* actions */}
                <Grid item>
                    <Grid container className={classes.gridElementInfoActions} direction="row" justify="space-evenly" alignItems="center">
                    
                        <Grid item xs={3} className={classes.actionItem}>
                            <FavoriteButton 
                                dataKey={this.props.offer._id} 
                                favorite={this.props.offer.favorite} 
                                fetchUrl={this.props.fetchUrl} 
                                model={this.props.model}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <IconButton onClick={this.setOfferVisibility}>
                                {/* [to do] erase tags, and make them ignored? */}
                                <Delete style={{color: bikeyshColor5}}/> 
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <TagButton offer={this.props.offer} tagUrl={this.props.tagUrl} color={bikeyshColor5}/>
                        </Grid>
                        <Grid item xs={3} className={classes.actionItem}>
                            <IconButton color="secondary" href={this.props.offer.productUrl} target={`_blank`}>
                                <InfoIcon style={{color: bikeyshColor5}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
)
}}
export default withStyles(styles)(OfferBMCustom);