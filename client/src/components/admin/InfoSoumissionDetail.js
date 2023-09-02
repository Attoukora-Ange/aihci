import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import axios from "axios";

export const InfoSoumissionDetail = () => {
  const [soumission, setSoumission] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const axiosSoumission = async () => {
        const dataSoumission = await axios.get(
          `${process.env.REACT_APP_API}/post/soummission`,
          option
        );
        if (dataSoumission.status === 200) {
          setSoumission(dataSoumission.data.post);
          setChange(true);
        }
      };
      axiosSoumission().catch((err) => {
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
        `${process.env.REACT_APP_API}/post/soummission/${id}`,
        option
      );
      if (dataSupprimer.status === 200) setChange(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TableContainer
      sx={{ maxWidth: 1000, maxHeight: "50vh" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650, maxWidth: "100%" }} aria-label="simple table">
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
            <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Email</TableCell>
            <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>
              Fichier
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {soumission?.map((row, index) => (
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
                component={Link}
                to={"http://localhost:5000/" + row.fichier}
                target="_blank"
                scope="row"
              >
                {row.fichier}
              </TableCell>
              <TableCell
                sx={{ fontSize: 12, fontWeight: 500, color: "yellowgreen" }}
                component={Button}
                size="small"
                scope="row"
              >
                Modifier
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
  );
};
