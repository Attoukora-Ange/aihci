// import { useEffect, useState } from "react";
// import { useUserContexte } from "../context/UserContext";
// import { RegisterModification } from "../components/register/RegisterModification";
// import axios from "axios";
// import { Layout } from "../components/layout/Layout";
// import { useDataContexte } from "../context/DataContext";

// export const ModifOrganigram = () => {
//   //   const utilisateur = useUserContexte().user;
//   const { state } = useDataContexte();
//   const [organigram, setOrganigram] = useState();
//   const [change, setChange] = useState(false);
//   const [affichage, setAffichage] = useState(true);

//   useEffect(() => {
//     const handleVoirOrganigram = async (id) => {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const option = {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       };
//       try {
//         const dataGetOrganigram = await axios.get(
//           `${process.env.REACT_APP_API}/post/organigramme/${id}`,
//           option
//         );
//         if (dataGetOrganigram.status === 200) {
//           setAffichage(true);
//           setOrganigram(dataGetOrganigram.data.post);
//         }
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     handleVoirOrganigram(state.organigram?._id);
//   }, [state.organigram?._id, change]);
//   return (
//     <Layout>
//       {affichage && (
//         <RegisterModification
//           organ={{
//             modOrganigram: state.organigram,
//             setAffichage,
//             setChange,
//             change,
//           }}
//         />
//       )}
//     </Layout>
//   );
// };

import React from 'react'

export const ModifOrganigram = () => {
  return (
    <div>ModifOrganigram</div>
  )
}

