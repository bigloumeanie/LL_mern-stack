import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 5,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#8D377C",
    fontFamily: "SignPainter",
    fontSize: "70px",
  },
  image: {
    marginLeft: "15px",
  },
}));
