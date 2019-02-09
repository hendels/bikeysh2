const imageStepperStyle = () => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      justifyContent: "flex-end",
      alignItems: 'center',
      height: 50,
    },
    img: {
      height: 255,
      display: 'block',
      maxWidth: 400,
      overflow: 'hidden',
      width: '100%',
    },
    mobileStepper:{
      background: "#fff",
      opacity: "0.5",
    },
  });
  export default imageStepperStyle;