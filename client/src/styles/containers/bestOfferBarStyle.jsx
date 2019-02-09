const bestOfferBarStyle = () => ({
    containerBackground: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
        "@media (min-width: 576px)": {
          maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
          maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
          maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "1600px"
        },
        background: "#314455",
    }
})

export default bestOfferBarStyle;