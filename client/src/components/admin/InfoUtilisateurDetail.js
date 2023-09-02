import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { RegisterModification } from "../register/RegisterModification";

export const InfoUtilisateurDetail = () => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [change, setChange] = useState(false);
  const [affichage, setAffichage] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const axiosUser = async () => {
        const dataUsers = await axios.get(
          `${process.env.REACT_APP_API}/user`,
          option
        );
        if (dataUsers.status === 200) {
          setUsers(dataUsers.data.user);
          setChange(true);
        }
      };
      axiosUser().catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [change]);

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataSupprimer = await axios.delete(
        `${process.env.REACT_APP_API}/user/${id}`,
        option
      );
      if (dataSupprimer.status === 200) setChange(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleVoirUser = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataGetUser = await axios.get(
        `${process.env.REACT_APP_API}/user/${id}`,
        option
      );
      if (dataGetUser.status === 200) {
        setChange(false);
        setAffichage(true);
        setUser(dataGetUser.data.user);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Stack gap={3} justifyContent="center" alignItems="center">
      <TableContainer
        sx={{ maxWidth: 1000, maxHeight: "50vh" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650, maxWidth: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Id</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Profession
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Nom et prénoms
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Pays</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Numéro de tél
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Situation matrimoniale
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Logé</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Service actuel
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Structure d'accueil
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 500 }}
                  component="th"
                  scope="row"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.profession}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.nom_prenoms}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.pays}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.telephone}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.email}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.matrimoniale}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.loge}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.service}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 300 }}
                  component="th"
                  scope="row"
                >
                  {row.structure}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 500, color: "yellowgreen" }}
                  component={Button}
                  size="small"
                  scope="row"
                  onClick={handleVoirUser(row._id)}
                >
                  Modifier
                </TableCell>
                {!row.isAdmin && (
                  <TableCell
                    sx={{ fontSize: 12, fontWeight: 500, color: "red" }}
                    component={Button}
                    size="small"
                    scope="row"
                    onClick={handleDelete(row._id)}
                  >
                    Supprimer
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {affichage && <RegisterModification member={{ user, setAffichage }} />}
    </Stack>
  );
};
