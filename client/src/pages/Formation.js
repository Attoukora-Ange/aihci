import { Layout } from "../components/layout/Layout";
import { FormationInfo } from "../components/formation/FormationInfo";
import { useFonction } from "../context/useFonction";

export const Formation = () => {
  useFonction()
  return (
    <Layout>
      <FormationInfo />
    </Layout>
  );
};
