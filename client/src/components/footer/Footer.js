import { Box, Container, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
  color: "#f0f0f0",
  display: "block",
  textTransform: "capitalize",
  textDecoration: "none",
  fontWeight: 300,
  fontSize: 13,
  fontFamily: "Roboto",
  transition:"color .3s ease",
  "&:hover": {
    color: "#099e4c",
  },
}));

export const Footer = () => {
  return (
    <Container maxWidth="xl" sx={{ background: "#0f0f0f", p: 3, mt:3 }}>
      <Stack direction="row" justifyContent="center" alignItems="start" sx={{display:{xs:"block", md:"flex"}}}>
        <Box sx={{color: "#f0f0f0"}} flex={1}>
          <Typography
            variant="Body1"
            component="div"
            sx={{ mb: 1, color: "#099e4c" }}
          >
            Plan du site
          </Typography>
          <StyledTypography variant="body1" component={Link} to="/">
            Accueil
          </StyledTypography>
          <StyledTypography variant="body1" component={Link} to="/actualites">
            Actualités
          </StyledTypography>
          <StyledTypography variant="body1" component={Link} to="/formation">
            Formations
          </StyledTypography>
          <StyledTypography variant="body1" component={Link} to="/organigramme">
            Organigramme
          </StyledTypography>
          <StyledTypography variant="body1" component={Link} to="/contact">
            Contact
          </StyledTypography>
        </Box>
        <Box flex={1}>
          <Box sx={{color: "#f0f0f0"}}flex={1}>
            <Typography
              variant="Body1"
              component="div"
              sx={{ mb: 1, color: "#099e4c" }}
            >
              Promoteur
            </Typography>
            <StyledTypography variant="body1" component={Link} to="https://univ-fhb.edu.ci/" target="_blank">
              UFHBA
            </StyledTypography>
            <StyledTypography variant="body1" component={Link} to="https://www.ufrspb.ci/" target="_blank">
              UFRSPB
            </StyledTypography>
            <StyledTypography variant="body1" component={Link} to="http://www.ufrsma.org/" target="_blank">
              UFRSMA
            </StyledTypography>
            <StyledTypography variant="body1" component={Link} to="https://centre-hospitalier-universitaire-de-cocody-00.checkout.webselfsite.net/" target="_blank">
              CHU COCODY
            </StyledTypography>
            <StyledTypography variant="body1" component={Link} to="https://chuangre.ci/" target="_blank">
              CHU ANGRE
            </StyledTypography>
          </Box>
        </Box>
        <Box flex={1}>
          <Box sx={{color: "#f0f0f0"}} flex={1}>
            <Typography
              variant="Body1"
              component="div"
              sx={{ mb: 1, color: "#099e4c" }}
            >
              Contact
            </Typography>
            <StyledTypography variant="body1" component={Link} to="/admin">
              tel: (+225) 07 07 96 57 44
            </StyledTypography>
            <StyledTypography variant="body1" component={Link} to="/admin">
              Email: attoukoraange@gmail.com
            </StyledTypography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
