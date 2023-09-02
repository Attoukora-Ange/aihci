import { Layout } from "../components/layout/Layout";
import { ActualArticle } from "../components/actualite/ActualArticle";
import { useFonction } from "../context/useFonction";

export const Actuality = () => {
  useFonction();
  return (
    <Layout>
      <ActualArticle />
    </Layout>
  );
};
