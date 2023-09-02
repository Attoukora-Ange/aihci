import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 400,
  fontFamily: "Montserrat",
  backgroundColor: "#099e4c",
  color: "white",
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
  textDecoration: "none",
  display:"block",
  padding: 10,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    fontSize: 20,
  },
}));

export const HomeSoumission = () => {
  return (
    <StyledTypography variant="h6" component={Link} to="/soumission">
      Soumission
    </StyledTypography>
  );
};
