import { Card, CardContent, Typography, Box, styled } from "@mui/material";

const StyledTypography = styled(Typography)(({theme})=>({
  backgroundColor: "#f0f0f0",
  color: "#08813e",
  padding: 10,
  margin: 0,
  borderRadius: "5px 5px 0 0",
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
  },
}));

const StyledBox = styled(Box)({
  width: "100%",
  height: 250,
  overflow: "hidden",
});

export const HomeVideo = () => {
  return (
    <Card elevation={0}>
      <CardContent>
        <StyledTypography variant="h6" gutterBottom>
          Présentation de l'internat
        </StyledTypography>
        <StyledBox>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/MgSo56q_lDo"
            title="Abidjan City, Internat du CHU de COCODY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </StyledBox>
      </CardContent>
    </Card>
  );
};
