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
    color: "#3F51B5",
    fontFamily: "system-ui",
    fontSize: "70px",
    fontWeight: "bold",
  },
  image: {
    marginLeft: "15px",
  },
}));
