import { TopNavigation } from "../navigation/TopNavigation";
import { Navigation } from "../navigation/Navigation";
import { Footer } from "../footer/Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <TopNavigation />
      <Navigation />
      {children}
      <Footer />
    </>
  );
};
