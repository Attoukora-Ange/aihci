import { useEffect, useState } from "react";
import { useUserContexte } from "../context/UserContext";
import { RegisterModification } from "../components/register/RegisterModification";
import axios from "axios";
import { Layout } from "../components/layout/Layout";

export const ModifUser = () => {
  const utilisateur = useUserContexte().user;
  const [user, setUser] = useState();
  const [change, setChange] = useState(false);
  const [affichage, setAffichage] = useState(true);

  useEffect(() => {
    const handleVoirUser = async (id) => {
      const token = JSON.parse(localStorage.getItem("token"));
      const option = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const dataGetUser = await axios.get(`${process.env.REACT_APP_API}/user/${id}`, option);
        if (dataGetUser.status === 200) {
          setAffichage(true);
          setUser(dataGetUser.data.user);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleVoirUser(utilisateur._id);
  }, [utilisateur._id, change]);
  return (
    <Layout>
      {affichage && (
        <RegisterModification member={{ user, setAffichage, setChange, change }} />
      )}
    </Layout>
  );
};
