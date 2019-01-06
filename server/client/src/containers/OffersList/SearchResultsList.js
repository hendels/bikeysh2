import React, {Component} from 'react';
import Aux from '../../hoc/Ax/Ax';
import axios from 'axios';
import OffersPageResult from '../../components/Offers/OfferBikeMarkt/OffersBMPageResult';
// import classes from './OffersList.css';
//material-ui core elements
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button/Button';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// # app components
import PageInfo from '../PageInfos/PageInfo';
import Pagination from '../../components/Pagination/OfferListPagination'
//styles
import containerStyle from '../../styles/components/offerListStyle';

let renderCount = 0;

class OffersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            offers: [],
            loadFavorites: false,
            loadWithoutTags: false,
            selectedItemId: null,
            error: null,
            fetchUrl: props.fetchUrl,
            hits: [],
            page: null,
            skip: 0,
            pageItems: props.pageLimit,
            totalResult: 0,
            reload: false,
            fullSearchResults: []
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({fullSearchResults: nextProps.fullSearchResults})
    }
    render(){
        // console.log('render offer list');
        const { classes } = this.props;
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];
        renderCount += 1;
        let offers = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error && this.state.hits !== null){
            let firstLevel = 0;
            for (var x in this.state.hits){
                firstLevel += 1;
            }
        }
        let pageInfo = null;
        // switch(this.props.category){
        //     case(`DHFRAMES`):
        pageInfo = <PageInfo 
                        imageUrl={this.props.imageUrls.bikeyshImage.url} 
                        pageInfoTitle={`Bikeysh`} 
                        tweak={this.props.imageUrls.bikeyshImage.tweak}
                    />
        return(
            <Aux>
                {pageInfo}
                <div className={classNames(classes.main, classes.mainRaised)} style={{background: containerStyle.bikeyshBackground.background}}>
                    <div className={classes.container}>
                        <Paper className={classes.containerBackground} elevation={1}>
                        <Grid container direction="column" justify="center" alignContent="center">
                            {/* //offer list */}
                            <Grid item>
                                <OffersPageResult
                                    offers={this.state.fullSearchResults}
                                    fetchUrl={this.state.fetchUrl}
                                    tagUrl={this.props.tagUrl}
                                    category={this.props.category}
                                    model={this.props.model}
                                    rerender={this.state.reload}
                                />
                            </Grid>
                        </Grid>
                        </Paper>   
                        <p>  &nbsp;</p>
                        <p>  &nbsp;</p>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default withStyles(containerStyle)(OffersList);