import { Layout } from "../components/layout/Layout";
import { OrganigrameInfo } from "../components/organigramme/OrganigrameInfo";
import { ALL_ORGANIGRAMME } from "../context/Action";
import { useDataContexte } from "../context/DataContext";
import { useEffect } from "react";
import axios from "axios";

export const Organigram = () => {
  const { dispatch } = useDataContexte();

  useEffect(() => {
    const option = {};
    try {
      const axiosOrganigramme = async () => {
        const dataOrganigramme = await axios.get(
          `${process.env.REACT_APP_API}/post/organigramme`,
          option
        );
        if (dataOrganigramme.status === 200)
        dispatch({
          type: ALL_ORGANIGRAMME,
          payload: dataOrganigramme.data.post,
        });
      };
      axiosOrganigramme();
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
  return (
    <Layout>
      <OrganigrameInfo />
    </Layout>
  );
};
