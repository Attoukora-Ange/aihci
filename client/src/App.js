import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { PublicRoute } from "./pages/PublicRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Organigram } from "./pages/Organigram";
import { Formation } from "./pages/Formation";
import { Contact } from "./pages/Contact";
import { Actuality } from "./pages/Actuality";
import { Admin } from "./pages/Admin";
import { ModifUser } from "./pages/ModifUser";
import { Soumission } from "./pages/Soumission";
import { ProtectedAdminRoute } from "./pages/ProtectedAdminRoute";
import { InfoSoumission } from "./components/admin/InfoSoumission";
import { InfoUtilisateur } from "./components/admin/InfoUtilisateur";
import { InfoNousEcrire } from "./components/admin/InfoNousEcrire";
import { Lecture } from "./pages/Lecture";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/utilisateur" element={<ModifUser />} />
          <Route path="/soumission" element={<Soumission />} />
          <Route path="/actualites/:id" element={<Lecture />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/administrateur" element={<ProtectedAdminRoute />}>
            <Route path="/administrateur" element={<Admin />} />
            <Route
              path="/administrateur/utilisateur"
              element={<InfoUtilisateur />}
            />
            <Route
              path="/administrateur/soumission"
              element={<InfoSoumission />}
            />
            <Route
              path="/administrateur/nous-ecrire"
              element={<InfoNousEcrire />}
            />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/organigramme" element={<Organigram />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/actualites" element={<Actuality />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
