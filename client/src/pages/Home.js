import { Layout } from "../components/layout/Layout";
import { HomeHeader } from "../components/home/HomeHeader";
import { HomeContent } from "../components/home/HomeContent";
import { useFonction } from "../context/useFonction";

export const Home = () => {
  useFonction();
  return (
    <Layout>
      <HomeHeader />
      <HomeContent />
    </Layout>
  );
};
