import { useEffect } from "react";
import { useDataContexte } from "./DataContext";
import axios from "axios";
import {
  ALL_AGENDA,
  ALL_ARTICLES,
  ALL_FORMATION,
  ALL_IMAGE_DESCRIPT,
} from "./Action";

//Creation de fonction de useFonction
const useFonction = () => {
  const { dispatch } = useDataContexte();

  return useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    try {
      //Charger le contenu de l'Article
      const axiosArticle = async () => {
        const dataArticle = await axios.get(
          `${process.env.REACT_APP_API}/post/article`,
          option
        );
        if (dataArticle.status === 200)
          dispatch({ type: ALL_ARTICLES, payload: dataArticle.data.post });
      };

      //Charger le contenu de l'agenda
      const axiosAgenda = async () => {
        const dataAgenda = await axios.get(
          `${process.env.REACT_APP_API}/post/agenda`,
          option
        );
        if (dataAgenda.status === 200)
          dispatch({ type: ALL_AGENDA, payload: dataAgenda.data.post });
      };

      //Charger le contenu de l'Image
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

      //Charger le contenu de l'Formation
      const axiosFormation = async () => {
        const dataFormation = await axios.get(
          `${process.env.REACT_APP_API}/post/formation`,
          option
        );
        if (dataFormation.status === 200)
          dispatch({ type: ALL_FORMATION, payload: dataFormation.data.post });
      };

      //Execution de la fonction
      axiosArticle();
      axiosAgenda();
      axiosImageDescriptif();
      axiosFormation();
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
};

//Creation de fonction de coupage de texte
const textCourt = (texte) => {
  return texte?.slice(0, 300);
};

//Creation de fonction de validation Email
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

//Creation de fonction de validation Numero
const isValidPhoneNumber = (phoneNumber) => {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phoneNumber);
};

export { useFonction, textCourt, isValidEmail, isValidPhoneNumber };
