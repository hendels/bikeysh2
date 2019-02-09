import React from 'react';

//custom components
import Aux from '../hoc/Ax/Ax';
import Offer from '../components/Cards/Offer';

var listElements = null;
var dummyElements = null;

class OfferBikeMarkt extends React.Component{
constructor(props) {
    super(props);

    this.state = {
        scoringData: {
            trueName: '', 
            price: 0, 
            currency: "currency", 
            median: 0, 
            countTotal: 0, 
            scores: 0
        },
        loading: true,
        fullSearchResults: [],
        rerender: false,
    }
    const dummyOffer = {
        dealer: "Nein",
        title: "Loading...",
        _id: "dummyId",
    };
    const dummyArray = [`d0`,`d1`,`d2`,`d3`,`d4`,`d5`,`d6`,`d7`,`d8`,`d9`];
    dummyElements = dummyArray.map((dummyItem, index) => {
        return <Offer
                    key={dummyItem}
                    dummy
                    offer={dummyOffer}
                    mobileView={this.props.mobileView}
                    useLoader
                />
    });
}
rerender = () => {
    this.setState({rerender: !this.state.rerender}, ()=> {})
}
async componentWillReceiveProps(nextProps){
    if(!nextProps.searchPending || nextProps.searchPending === undefined){
        const {classes, model, offers, fullSearch} = nextProps;
        let fullSearchModel = ``;
        let fullSearchCategory = ``;
        
        listElements = await offers.map(offer => {
            let piclink = "";
            if(offer.pictures !== null || offer.pictures !== undefined){
                for (var x in offer.pictures){
                    const picUrl = offer.pictures[x];
                    if (picUrl !== null){
                        picUrl.length > 0? piclink = picUrl.replace(`large`, `medium`) : null;
                    }
                    break;
                }
            };
    
            if(fullSearch){
                switch (offer.category){
                    case "DHFrames":
                        fullSearchModel = model.dhframes
                        break;
                    case "Cranks":
                        fullSearchModel = model.cranks
                        break;
                    case "Hubs":
                        fullSearchModel = model.hubs
                        break;
                    case "EnduroFrames":
                        fullSearchModel = model.enduroframes
                        break;
                    case "Wheels":
                        fullSearchModel = model.wheels
                        break;
                    default:
                        fullSearchModel = offer.category;
                        break;
                }
                fullSearchCategory = offer.category;
            }
            return(
                <Offer 
                    key={offer._id}
                    dummy={false}
                    offer={offer} 
                    piclink={piclink} 
                    tagUrl={this.props.tagUrl} 
                    model={this.props.fullSearch ? fullSearchModel : this.props.model}
                    rerender={this.props.rerender}
                    category={this.props.fullSearch ? fullSearchCategory: this.props.category}
                    fullSearch={this.props.fullSearch}
                    searchPending={this.props.searchPending}
                    rerender={this.rerender}
                    mobileView={this.props.mobileView}
                />
            )
        }) ;
        await Promise.all(listElements).then(()=>{
            if (offers.length !== 0)
                this.setState({loading: false}, ()=>{})
        })
    }
}
shouldComponentUpdate(){
    if(!this.props.searchPending){
        return true;
    } else 
        return false;
}
render(){
    return (
        <Aux>
            {this.state.loading ? dummyElements : listElements}
        </Aux>)
    };
}
export default OfferBikeMarkt;