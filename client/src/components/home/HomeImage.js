import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDataContexte } from "../../context/DataContext";
import { ALL_IMAGE_DESCRIPT } from "../../context/Action";
import { useUserContexte } from "../../context/UserContext";
import axios from "axios";

export const HomeImage = () => {
  const { state, dispatch } = useDataContexte();
  const { user } = useUserContexte();

  const handleClickDelete = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataSupprimer = await axios.delete(
        `${process.env.REACT_APP_API}/post/image/${id}`,
        option
      );
      if (dataSupprimer.status === 200) {
        const axiosImageDescriptif = async () => {
          const dataImageDescriptif = await axios.get(
            `${process.env.REACT_APP_API}/post/image`,
            option
          );
          if (dataImageDescriptif.status === 200)
            dispatch({
              type: ALL_IMAGE_DESCRIPT,
              payload: dataImageDescriptif.data.post,
            });
        };
        axiosImageDescriptif();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      {state.image_descriptif?.fichier && (
        <Card
          component={Link}
          target="_blank"
          to={state.image_descriptif?.fichier}
          elevation={0}
        >
          <CardContent>
            <Card sx={{ maxWidth: "100%" }}>
              <CardActionArea disableRipple>
                <CardMedia
                  component="img"
                  height="100%"
                  image={state.image_descriptif?.fichier}
                  alt={state.image_descriptif?.fichier}
                />
              </CardActionArea>
            </Card>
          </CardContent>
          {user?.isAdmin && (
            <Stack direction="row" gap={1} pb={2}>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={handleClickDelete(state.image_descriptif?._id)}
              >
                Supprimer
              </Button>
            </Stack>
          )}
        </Card>
      )}
    </>
  );
};
