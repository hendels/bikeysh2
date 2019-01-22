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
      textDecoration: `none`,
      filter: `grayscale(50%)`,
      boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
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
      textDecoration: `none`,
      paddingLeft: "170px",
    },
    title: {
      color: "#fff",
      fontFamily: `'Permanent Marker', cursive`,
      fontSize: `45px`,
      zIndex: 1,
      textDecoration: `none`,
    },
  });
  
  export default pageInfoStyle;
  