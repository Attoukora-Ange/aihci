import { Stack, Container, styled, Box } from "@mui/material";
import { LectureDetail } from "./LectureDetail";
import { BasComposant } from "../../context/BasComposant";

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
export const LectureInfo = () => {
  return (
    <>
      <Container
        sx={{
          mt: 1,
        }}
        maxWidth="xxl"
      >
        <StyledStack direction="row" justifyContent="space-between">
          <Box
            flex={3}
            sx={{
              display: { sm: "flex", justifyContent: "center" },
            }}
          >
            <Container maxWidth="xl">
              <LectureDetail />
            </Container>
          </Box>
          <BasComposant />
        </StyledStack>
      </Container>
    </>
  );
};
