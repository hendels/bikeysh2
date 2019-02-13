import React from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
//mui core
import {Grid, IconButton, Tooltip, Avatar, Badge, Zoom, CircularProgress} from '@material-ui/core';
//mui icons
import InfoIcon from '@material-ui/icons/Info';
import HttpIcon from '@material-ui/icons/Http';
import Vendor from '@material-ui/icons/MonetizationOn';
import {Face, Link, Block} from '@material-ui/icons/';
import Viewed from '@material-ui/icons/Visibility';
//custom components
import Aux from '../../hoc/Ax/Ax';
import FavoriteButton from '../Buttons/FavoriteButton';
import TagButton from '../Buttons/TagButton';
import OfferDetailsDialog from '../Dialogs/OfferDetailsDialog';
//common
import {getOfferAttributes, getDayDifferencesFromToday} from '../../common/common';
//styles
import offerStyle from '../../styles/components/Cards/offerStyle';
import {bikeyshColor5} from "../../styles/material-kit-react";

class Offer extends React.Component{

state = {
    scoringData: {
        offerId: 0, trueName: '', price: 0,
        currency: "", median: 0,
        countTotal: 0, scores: 0, itemState: '',
        yearTitle: 0, yearDescription: 0,
        manufacturerSetId: 0, modelSetId: 0,
        urlActive: null,
    },
    showOfferDetails: false,
    favorite: this.props.offer.favorite,
    attributes: [],
}
handleShowOfferDetailsDialog = () => {
    this.setState({showOfferDetails: true}, () => {});
};
handleCloseOfferDetailsDialog = () => {
    this.setState({showOfferDetails: false});
};
handleSetFavorite = (setAs) => {
    this.setState({favorite: setAs}, ()=> {});
}
getOfferAttributes = (category) => {
    const attributes = getOfferAttributes(category, this.props.offer);
    this.setState({attributes: attributes}, () =>{});
}
getScoringData = async () => {
    if (!this.props.dummy){
        await axios.get('/scoring/' + this.props.offer._id).then(response  => response.data).then(result => {
            if (result !== undefined){
                if (result.scoring.length > 0) {
                    var scoringData = {
                        offerId: result.scoring[0].offerId,
                        trueName: result.scoring[0].fullName,
                        price: result.scoring[0].price,
                        currency: result.scoring[0].currency,
                        median: result.scoring[0].median,
                        countTotal: result.scoring[0].countTotal,
                        scores: parseFloat(result.scoring[0].scores),
                        itemState: result.scoring[0].itemState,
                        yearTitle: result.scoring[0].yearTitle,
                        yearDescription: result.scoring[0].yearDescription,
                        manufacturerSetId: parseInt(result.scoring[0].manufacturerSetId, 10),
                        modelSetId: parseInt(result.scoring[0].modelSetId, 10),
                        urlActive: result.scoring[0].urlActive
                    }
                    this.setState({scoringData: scoringData}, () => {});
                }
        }
        });
    }
}
componentWillMount(){
    this.getScoringData();
    if (this.props.category !== undefined){
        this.getOfferAttributes(this.props.category);
    } 
}
componentWillReceiveProps(nextProps){
    if(!nextProps.searchPending){
        this.setState({scoringData: {
            offerId: 0, trueName: '', price: 0,
            currency: "", median: 0,
            countTotal: 0, scores: 0, itemState: '',
            yearTitle: 0,
            yearDescription: "",
            manufacturerSetId: 0,
            modelSetId: 0,
            attributes: [],
            },
        }, () => {
            this.getScoringData();
            this.forceUpdate();
        });
    }
}
render(){

const {classes, mobileView} = this.props;
let dealerTip = `null`;
let linkTip = `null`;
this.props.offer.dealer === "Nein" ? dealerTip = `Regular offer` : dealerTip = `Dealer`;
let offerAvailable = undefined;

let diffDays = null;
let offerDate = null;
let titleCutter = mobileView ? 35 : 48;

if (!this.props.dummy){

    const countDate = getDayDifferencesFromToday(this.props.offer.publishDate);
    diffDays = countDate.diffDays;
    offerDate = countDate.date;
    
    if(this.state.scoringData.urlActive !== undefined && this.state.scoringData.urlActive !== null){
        if(JSON.parse(this.state.scoringData.urlActive)){
            offerAvailable = true
        } else {
            offerAvailable = false 
        }
    };
    if(offerAvailable !== undefined){
        offerAvailable ?  linkTip = 'Offer available' : linkTip = `Offer not available`;
    };
}
return(
    <Aux>
    <Grid 
        container 
        direction="row" 
        justify="center" 
        spacing={0} 
        style={{
            padding: "5px", 
        }}
    >
        {/* // main & statistics section */}
        <Grid 
            item 
            style={{
                boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
            }}
        >   
            <Grid container direction="column" justify="space-between" alignItems="flex-start" className={classes.root} 
            style={{
                background: `rgba(0, 0, 0, 0.7) url(${this.props.piclink})`,
                backgroundSize: 'cover',
                backgroundRepeat: `no-repeat`,
                backgroundPosition: 'center',
            }} >
                {/* upperbar */}
                <Grid container className={classes.gridElementUpbar} direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={11}>
                        <span className={classes.gridElementTitleCategory}>{this.props.fullSearch ? `[${this.props.offer.category}]` : null}</span>
                        <span className={classes.gridElementTitle} onClick={this.handleShowOfferDetailsDialog}>
                            {this.state.scoringData.trueName !== `` ? 
                            `[${this.state.scoringData.trueName}] ${this.props.offer.title.length > titleCutter ? 
                                this.props.offer.title.slice(0, titleCutter) + "..." : this.props.offer.title}` :
                            this.props.offer.title.length > titleCutter ? this.props.offer.title.slice(0, titleCutter) + "..." : this.props.offer.title }
                        </span>
                    </Grid>
                    <Grid item xs={1} className={classes.scoreItem}>
                        {this.state.scoringData.scores !== 0 ? 
                            <Avatar aria-label="Recipe" className={classes.scores}>
                                {parseFloat(this.state.scoringData.scores).toFixed(1)}
                            </Avatar>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                {this.props.useLoader ? 
                <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center">
                    <Grid item xs={4}/>
                    <Grid item xs={4} className={classes.spinner}>
                        <CircularProgress/>
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
                :null}
                {/* downbar */}
                <Grid 
                    container 
                    className={classes.gridElementDownbar} 
                    direction="column" 
                    justify="space-between" 
                    alignItems="stretch" 
                    onClick={this.handleShowOfferDetailsDialog}
                >
                    <Grid item>
                        <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Grid container className={classes.gridElementDownbarIcons} spacing={16} direction="row" justify="flex-start" alignItems="center">
                                    <Tooltip TransitionComponent={Zoom} title={dealerTip} placement="top-start">
                                        <Grid item >
                                            {this.props.offer.dealer === "Nein" ? 
                                            <Face/> :
                                            <Vendor/>} 
                                        </Grid>
                                    </Tooltip>
                                    {offerAvailable !== undefined ?
                                    <Tooltip TransitionComponent={Zoom} title={linkTip} placement="top-start">
                                        <Grid item>
                                            {offerAvailable ? <Link/> : <Block/>} 
                                        </Grid>
                                    </Tooltip>
                                    :
                                    null}
                                    {this.props.offer.watchedTimes > 0 ?  
                                    <Tooltip TransitionComponent={Zoom} title={`watched ${this.props.offer.watchedTimes} times`} placement="top-start">
                                    <Grid item>
                                        <Badge badgeContent={this.props.offer.watchedTimes} classes={{ badge: classes.badge }} >
                                            <Viewed />
                                        </Badge>    
                                    </Grid>
                                    </Tooltip>
                                    : 
                                    <Grid item/>}
                                </Grid>
                            </Grid>
                            
                            <Grid item className={classes.gridElementInfoTitle}>
                                {`${offerDate} `}
                                {this.state.scoringData.itemState !== `` && this.state.scoringData.itemState !== undefined ?
                                `${this.state.scoringData.itemState} - ` : null}
                                <b>{this.props.offer.price}</b>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {this.props.offer.description !== undefined ? 
                            this.props.offer.description.length > 130 ? 
                            this.props.offer.description.slice(0, 130) + "..." : this.props.offer.description
                        : null}
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
        {/* // details & action section */}
        {!this.props.mobileView ? 
            <Grid 
                item
                style={{
                    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
                }}
            >
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="flex-start" className={classes.gridElementInfo}>
                    <Grid item className={classes.gridElementInfoTitle}>
                        Details
                    </Grid>
                    {/* core info */}
                    <Grid item className={classes.gridElementInfoText}>
                        {`Days on market: ${diffDays !== undefined ? diffDays : `unknown`}`}
                    </Grid>
                    <Grid item className={classes.gridElementInfoText}>

                        <Grid container justify="space-between" alignItems="flex-start">
                            {this.state.attributes.map((attribute) => {
                                if (attribute.value !== null && attribute.value !== undefined){
                                    let attributeText = `${attribute.label} ${attribute.value}`;
                                    attributeText = attributeText.length > 32 ? attributeText.slice(0, 32) + "..." : attributeText;
                                    return (<Grid item xs={6}>{attributeText}</Grid>);
                                } else 
                                    return (<Grid item xs={6} style={{opacity: "0"}}>----------------</Grid>)
                            })}
                        </Grid>
                    </Grid>
                    {/* actions */}
                    <Grid item>
                        <Grid container className={classes.gridElementInfoActions} direction="row" justify="space-evenly" alignItems="center">
                            <Grid item xs={3} className={classes.actionItem}>
                                <FavoriteButton 
                                    dummy={this.props.dummy}
                                    dataKey={this.props.offer._id} 
                                    favorite={this.state.favorite} 
                                    setFavorite={this.handleSetFavorite}
                                    fetchUrl={this.props.fetchUrl} 
                                    model={this.props.model}
                                />
                            </Grid>
                            <Grid item xs={3} className={classes.actionItem}>
                                <TagButton 
                                    dummy={this.props.dummy}    
                                    offer={this.props.offer} 
                                    tagUrl={this.props.tagUrl} 
                                    color={bikeyshColor5} 
                                    category={this.props.category}
                                    model={this.props.model}/>
                            </Grid>
                            <Grid item xs={3} className={classes.actionItem}>
                                <IconButton
                                    onClick={this.handleShowOfferDetailsDialog}
                                >
                                    <InfoIcon 
                                        style={{color: bikeyshColor5}}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item xs={3} className={classes.actionItem}>
                                <IconButton 
                                    href={this.props.offer.productUrl} 
                                    target={`_blank`} 
                                    style={{color: bikeyshColor5, outline: "none",}}
                                >
                                    <HttpIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        : null}
    </Grid>
    <OfferDetailsDialog
        open={this.state.showOfferDetails}
        close={this.handleCloseOfferDetailsDialog}
        //base info
        offer={this.props.offer} 
        favorite={this.state.favorite} 
        setFavorite={this.handleSetFavorite}
        category={this.props.category} 
        model={this.props.model}
        tagUrl={this.props.tagUrl}
        //attributes
        attributes={this.state.attributes}
        //statistics
        itemCondition={this.state.scoringData.itemState}
        offerAvailable={offerAvailable}
        manufacturerSetId={this.state.scoringData.manufacturerSetId}
        modelSetId={this.state.scoringData.modelSetId}
        price={this.state.scoringData.price}
        scores={this.state.scoringData.scores}
        searchPending={this.props.searchPending}
        mobileView={this.props.mobileView}
    />
    </Aux>
)
}};
export default withStyles(offerStyle)(Offer);