import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';
import Offer from '../../components/Offers/OfferBikeMarkt/OfferBIkeMarkt';
import classes from './OffersList.css';

const applyUpdateResult = (result) => (prevState) => ({
    hits: [...prevState, ...result],
    // hits: [...result],
    page: result.page,
  });
  
  const applySetResult = (result) => (prevState) => ({
    hits: result,
    page: result.page,
  });
let renderCount = 0;
let pageLimit = 10;
class OffersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            offers: [],
            selectedItemId: null,
            error: null,
            hits: [],
            page: null,
            skip: 0,
            pageItems: pageLimit
        }
    }
    
    componentDidMount() {
        var config = {
            headers: {'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type'}
        };

        this.fetchData(this.state.skip, this.state.pageItems);
    }
    fetchData = (skip, pageLimit) => {
        axios.get('http://localhost:4000/api/bm/category/cranks/' + skip + '/' + pageLimit).then(
            response => response.data
        ).then(result => this.onSetResult(result, skip))
    }
    onSetResult = (result, skip) =>{
       this.setState(applySetResult(result, skip));
       console.log('setting hitz');
       console.log('skip state: ' + this.state.skip + '/page items: ' + this.state.pageLimit);
       console.log(result);
    }


    onPaginatedSearchNext = () => {
        const newSkip = this.state.skip + 10;
        this.setState({skip: newSkip}); 
        this.fetchData(this.state.skip + this.state.pageItems, this.state.pageItems);
        
        console.log('skip state: ' + this.state.skip + '/page items: ' + this.state.pageLimit);
    }
    onPaginatedSearchPrevious = () => {
        const newSkip = this.state.skip + 10;
        this.setState({skip: newSkip}); 
        this.fetchData(this.state.skip - this.state.pageItems, this.state.pageItems);
        
        console.log('skip state: ' + this.state.skip + '/page items: ' + this.state.pageLimit);
    }
        

    render(){
        console.log('RERENDER');
        renderCount += 1;
        let offers = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error && this.state.hits !== null){
            console.log(this.state.offers);
            console.log('hits arr:' + this.state.hits);
            let firstLevel = 0;
            for (var x in this.state.hits){
                firstLevel += 1;
                // console.log('element 1: ' + x);
                // for(var n in this.state.offers[x]){
                //     // console.log(this.state.offers[x][n]);
                //     console.log('element 2: ' + n);
                //     break;
                // }
            }
            console.log('first element count: ' + firstLevel);
            if (firstLevel === 1){
                offers = this.state.hits['hubs'].map(offer => {
                    return <Offer
                    key={offer._id}
                    title={offer.title}
                    link={offer.productUrl}/>
                })
            }
            else {
                offers = this.state.hits.map(offer => {
                    return <Offer
                    key={offer._id}
                    title={offer.title}
                    link={offer.productUrl}/>
                })

            }
        }
        const rendering = <div>render no {renderCount}</div>
        let nextPage = <button type="button" onClick={this.onPaginatedSearchNext} className={classes.interactions}>NEXT</button>
        let previousPage = <button type="button" onClick={this.onPaginatedSearchPrevious} className={classes.interactions}>PREVIOUS</button>
        return(
            <Aux>
                <section>
                    ===================
                    ===================
                    ===================
                    ===================
                    ===================
                    ===================
                    ===================
                    {rendering}
                    ===================
                    {offers}
                    {previousPage}
                    {nextPage}
                </section>
                
            </Aux>
        )
    }
}

export default OffersList;