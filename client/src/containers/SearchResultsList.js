import React, {Component} from 'react';
//@mui
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper} from '@material-ui/core';
// # app components
import PageInfo from './PageInfos/PageInfo';
import Aux from '../hoc/Ax/Ax';
import OffersPageResult from '../../components/Offers/OfferBikeMarkt/OffersPageResult';
//styles
import containerStyle from '../styles/containers/offerListStyle';

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
    render(){
        const { classes } = this.props;
        const totalArray = this.state.totalResult[Object.keys(this.state.totalResult)[0]];

        let pageInfo = null;
        pageInfo = <PageInfo 
                        imageUrl={this.props.imageUrls.bikeyshImage.url} 
                        pageInfoTitle={`Bikeysh`} 
                        tweak={this.props.imageUrls.bikeyshImage.tweak}
                    />
        return(
            <Aux>
                {pageInfo}
                <div className={classes.bikeyshBackground}>
                    <div className={classes.container}>
                        <Paper className={classes.containerBackground} elevation={1}>
                        <Grid container direction="column" justify="center" alignContent="center">
                            {/* //offer list */}
                            <Grid item>
                                {this.state.fullSearchResults.length > 0 ? 
                                    <OffersPageResult
                                        fullSearch
                                        offers={this.state.fullSearchResults}
                                        fetchUrl={this.state.fetchUrl}
                                        tagUrl={this.props.tagUrl}
                                        models={this.props.models}
                                        rerender={this.state.reload}
                                        searchPending={this.props.searchPending}
                                    />
                                : null}
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