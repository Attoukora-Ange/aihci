import { Stack, Container, Typography, styled, Box } from "@mui/material";
import { ContactDetail } from "./ContactDetail";
import { ContactForm } from "./ContactForm";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#099e4c",
  paddingTop: 1,
  marginLeft: 3,
  marginTop: 20,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    margin: 0,
    padding: "10px",
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

export const ContactInfo = () => {
  return (
    <>
      <StyledStack direction="column">
        <StyleBox flex={1}>
          <Container maxWidth="xl">
            <StyledTypography variant="h4" component="div">
              Contacts
            </StyledTypography>
            <ContactDetail />
            <StyledTypography variant="h4" component="div">
              Nous écrire
            </StyledTypography>
            <ContactForm />
          </Container>
        </StyleBox>
      </StyledStack>
    </>
  );
};
