const pageInfoStyle = theme => ({
  container: {
    color: `#fff`,
    height: "45vh",
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    filter: `grayscale(50%)`,
    "@media (max-width: 425px)":{
      height: "25vh",
    },
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
    fontSize: `45px`,
    textAlign: "center",
    zIndex: 1,
    "@media (max-width: 425px)":{
      fontSize: "5vh",
    },
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
  