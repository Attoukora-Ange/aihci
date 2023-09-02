import axios from "axios";
import { Layout } from "../components/layout/Layout";
import { LectureInfo } from "../components/lecture/LectureInfo";
import { ONE_ARTICLE } from "../context/Action";
import { useEffect, useState } from "react";
import { useDataContexte } from "../context/DataContext";
import { useParams } from "react-router-dom";
import { useFonction } from "../context/useFonction";
import { Erreur } from "./Erreur";

export const Lecture = () => {
  const { dispatch } = useDataContexte();
  const [erreur, setErreur] = useState();
  const { id } = useParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const option = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const axiosLecture = async () => {
        const dataLecture = await axios.get(
          `${process.env.REACT_APP_API}/post/article/${id}`,
          option
        );
        if (dataLecture.status === 200)
          dispatch({
            type: ONE_ARTICLE,
            payload: dataLecture.data.post,
          });
        setErreur("");
      };
      axiosLecture().catch((err) => {
        localStorage.setItem("user", null);
        setErreur(err.response.data.error || err.response.data.token);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, id]);
  useFonction();
  return (
    <Layout>{erreur ? <Erreur texte={erreur} /> : <LectureInfo />}</Layout>
  );
};
