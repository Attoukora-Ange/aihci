import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export const InfoNousEcrireDetail = () => {
  const [contact, setContact] = useState();
  const [change, setChange] = useState(false);
  const [message, setMessage] = useState();
  const [affichage, setAffichage] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const axiosContact = async () => {
        const dataContact = await axios.get(`${process.env.REACT_APP_API}/post/contact`, option);
        if (dataContact.status === 200) {
          setContact(dataContact.data.post);
          setChange(true);
        }
      };
      axiosContact().catch((err) => {
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
        `${process.env.REACT_APP_API}/post/contact/${id}`,
        option
      );
      if (dataSupprimer.status === 200){
        setAffichage(false);
        setChange(false);
      } 
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleVoirMessage = (id) => async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataGetMessage = await axios.get(
        `${process.env.REACT_APP_API}/post/contact/${id}`,
        option
      );
      if (dataGetMessage.status === 200) {
        setChange(false);
        setMessage(dataGetMessage.data.post);
        setAffichage(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
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
                Civilité
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Nom et prénoms
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Pays</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Téléphone
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Objet
              </TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
                Message
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contact?.map((row, index) => (
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
                  {row.civilite}
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
                  {row.objet}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 500, color: "yellowgreen" }}
                  component={Button}
                  size="small"
                  scope="row"
                  onClick={handleVoirMessage(row._id)}
                >
                  Voir msg
                </TableCell>
                <TableCell
                  sx={{ fontSize: 12, fontWeight: 500, color: "red" }}
                  component={Button}
                  size="small"
                  scope="row"
                  onClick={handleDelete(row._id)}
                >
                  Supprimer
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {affichage && (
        <Stack mt={2} p={1} gap={1} border="1px solid black" borderRadius={2} maxWidth={1000}>
          <Typography variant="body1" component={Box}>
            {message.civilite} {message.nom_prenoms}
          </Typography>
          <Typography variant="body2" component={Box} fontWeight={400} >
            Objet : {message.objet}
          </Typography>
          <Typography variant="body2" component={Box} fontWeight={300}>
            Message : {message.message}
          </Typography>
        </Stack>
      )}
    </>
  );
};
