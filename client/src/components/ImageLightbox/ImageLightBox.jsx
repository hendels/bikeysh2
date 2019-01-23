import React, { Component } from 'react';
import Lightbox from 'react-images';
 
export default class Sample extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }
//   componentWillReceiveProps(nextProps){
//       if(nextProps.open !== this.state.isOpen)
//         this.setState({isOpen: nextProps.open})
//   }
  gotoNext = () => {
      this.setState({photoIndex: this.state.photoIndex + 1}, () => {});
  }
  gotoPrevious = () => {
      this.setState({photoIndex: this.state.photoIndex - 1}, () => {});
  }
  closeLightbox = () => {
      this.props.close(false);
  }
  render() {
    return (
      <Lightbox
        images={this.props.picArray}
        isOpen={this.props.open}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
        currentImage={this.state.photoIndex}
        backdropClosesModal={true}
        preloadNextImage={true}
      />
    );
  }
}