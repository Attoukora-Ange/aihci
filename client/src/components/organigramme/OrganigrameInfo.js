import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { OrganigrameDetail } from "./OrganigrameDetail";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#099e4c",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 10,
  marginBottom: 10,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    marginTop: 0,
    width: "100%",
  },
}));
const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
  minHeight:"60vh",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const StyleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));
export const OrganigrameInfo = () => {
  return (
    <>
      <StyledStack direction="column">
        <StyleBox flex={1}>
          <Container maxWidth="xl">
            <StyledTypography variant="h4" component="div">
              Organigramme AIHCI
            </StyledTypography>
            <OrganigrameDetail />
          </Container>
        </StyleBox>
      </StyledStack>
    </>
  );
};
