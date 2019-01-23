import {
    defaultFont,
  } from "../material-kit-react";

  
  const pageInfoStyle = theme => ({
    container: {
      background: `#000 url(https://testy.bikeboard.pl/images/biblioteka/slider-d8683q_sender_testing_nice_canyon_greber_3nvv.jpg)`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `0px -70px`,  
      backgroundAttachment: `fixed`,
      color: `#fff`,
      height: `420px`,
      width: `100%`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      position: `relative`,
      filter: `grayscale(50%)`,
      // filter: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale")`,
    },
    colorOverlay: {
      width: `100%`,
      height: `100%`,
      opacity: `.7`,
      position: `absolute`,
      background: `linear-gradient(to bottom, #133160 0%,#c96567 100%)`
    },
    list: {
      zIndex: 1,
      listStyleType: `none`,
    },
    title: {
      fontFamily: `'Permanent Marker', cursive`,
      color: `#fff`,
      /* font-family: 'Pacifico', cursive; */
      fontSize: `45px`,
      zIndex: 1,
    },
    iconFavorite: {
      fontSize: `38px`,
      color: "#c96567"
    },
    iconTags: {
      fontSize: `38px`,
      color: "#000",
      opacity: `.45`,
    }
  });
  
  export default pageInfoStyle;
  