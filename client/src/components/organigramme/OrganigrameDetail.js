import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useDataContexte } from "../../context/DataContext";
import { useUserContexte } from "../../context/UserContext";
import axios from "axios";
import { useState } from "react";
import { OrganigramModif } from "./OrganigramModif";

export const OrganigrameDetail = () => {
  const { state } = useDataContexte();
  const { user } = useUserContexte();
  const [affichage, setAffichage] = useState(false);
  const [organigramme, setOrganigramme] = useState();

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/post/organigramme/${id}`,
        option
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleVoirOrganigramme = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataGetOrganigramme = await axios.get(
        `${process.env.REACT_APP_API}/post/organigramme/${id}`,
        option
      );
      if (dataGetOrganigramme.status === 200) {
        setAffichage(true);
        setOrganigramme(dataGetOrganigramme.data.post);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Stack>
      <TableContainer
        sx={{ maxWidth: 650, maxHeight: "50vh" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 600, maxWidth: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontSize: 24, fontWeight: 500 }}>
                Fonction{" "}
              </TableCell>
              <TableCell sx={{ fontSize: 24, fontWeight: 500 }}>
                Responsable
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.organigramme?.map((organigram) => (
              <TableRow
                hover
                key={organigram._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontSize: 20, fontWeight: 400 }}
                  component="th"
                  scope="row"
                >
                  {organigram.fonction}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {organigram.responsable}
                </TableCell>
                {user?.isAdmin && (
                  <>
                    <TableCell
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "yellowgreen",
                      }}
                      component={Button}
                      size="small"
                      scope="row"
                      onClick={handleVoirOrganigramme(organigram._id)}
                    >
                      Modifier
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 12, fontWeight: 500, color: "red" }}
                      component={Button}
                      size="small"
                      scope="row"
                      onClick={handleDelete(organigram._id)}
                    >
                      Supprimer
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {affichage && <OrganigramModif organ={{ organigramme, setAffichage }} />}
    </Stack>
  );
};
