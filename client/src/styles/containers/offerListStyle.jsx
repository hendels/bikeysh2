const offerListStyle = {
    containerBackground :{
        marginRight: "auto",
        marginLeft: "auto",
        "@media (min-width: 576px)": {
          maxWidth: "100vw"
        },
        "@media (min-width: 768px)": {
          maxWidth: "90vw"
        },
        "@media (min-width: 992px)": {
          maxWidth: "80vw"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "72vw"
        },
        background: "#314455",
    }, 
    bikeyshBackground: {
      background: "#C96567",
      boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
    },
    container: {
      marginRight: "auto",
      marginLeft: "auto",
      width: "100%",
      "@media (min-width: 700px)": {
        maxWidth: "100vw"
      },
      "@media (min-width: 1200px)": {
        maxWidth: "1600px"
      },
      "@media (min-width: 1960px)": {
        maxWidth: "1800px"
      },
    },
  };
export default offerListStyle;