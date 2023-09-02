import { Typography, styled, Box } from "@mui/material";
import { HomeVideo } from "../components/home/HomeVideo";
import { HomeImage } from "../components/home/HomeImage";
import { HomeSoumission } from "../components/home/HomeSoumission";
import { HomeAgenda } from "../components/home/HomeAganda";
import { HomeArticleSelection } from "../components/home/HomeArticleSelection";
import { useDataContexte } from "./DataContext";

const StyledTypographyTitre = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 400,
  fontFamily: "Montserrat",
  color: "#099e4c",
  backgroundColor: "#f0f0f0",
  borderRadius: 10,
  marginTop: 20,
  textAlign: "left",
  padding: 10,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
    textAlign: "center",
  },
}));

export const BasComposant = () => {
  const { state } = useDataContexte();
  const quatrePremier = state.agendas?.slice(0, 4);

  return (
    <Box flex={1}>
      <HomeVideo />
      <HomeImage />
      <HomeSoumission />
      <StyledTypographyTitre variant="h6" component="div">
        Agenda
      </StyledTypographyTitre>
      {quatrePremier?.map((agenda) => (
        <Box key={agenda?._id}>
          <HomeAgenda agend={agenda} />
        </Box>
      ))}
      <HomeArticleSelection />
    </Box>
  );
};
