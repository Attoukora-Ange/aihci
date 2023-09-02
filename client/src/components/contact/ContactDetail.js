import { Typography, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 500,
  fontFamily: "Montserrat",
  color: "#0f0f0f",
  paddingTop: 1,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    margin: 50,
    padding: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
  },
}));

const StyledTypographyAdress = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Montserrat",
  color: "#0f0f0f",
  paddingTop: 1,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 5,
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    margin: 50,
    padding: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
  },
}));

const StyledTypographySpan = styled(Link)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  fontFamily: "Montserrat",
  color: "#0f0f0f",
  paddingTop: 1,
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 5,
  textDecoration:"none",
  transition:"color .3s ease-in-out",
  "&:hover":{
    color: "#099e4c",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    margin: 50,
    padding: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
  },
}));

export const ContactDetail = () => {
  return (
    <>
      <StyledTypography component="div">
        Merci de nous contacter dépuis votre boîte mail perso via ces adresses
        ou utiliser le formulaire :
      </StyledTypography>
      <StyledTypographyAdress component="div">
        Adresse géographique :{" "}
        <StyledTypographySpan component="span" sx={{"&:hover":{color:"inherit"}}}>
          AIHCI (ANGRE-COCODY-TREICHIVLLE-YOPOUGON)
        </StyledTypographySpan>
      </StyledTypographyAdress>
      <StyledTypographyAdress component="div">
        Téléphone :{" "}
        <StyledTypographySpan component="span" sx={{"&:hover":{color:"inherit"}}}>
          (+225) 07 08 54 88 16
        </StyledTypographySpan>
      </StyledTypographyAdress>
      <StyledTypographyAdress component="div">
        Email :{" "}
        <StyledTypographySpan component={Link} to="mailto:aihci50@gmail.com" target="_blank" >
          aihci50@gmail.com
        </StyledTypographySpan>
      </StyledTypographyAdress>
    </>
  );
};
