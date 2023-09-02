import {
  ALL_AGENDA,
  ALL_ARTICLES,
  ALL_FORMATION,
  ALL_IMAGE_DESCRIPT,
  ALL_ORGANIGRAMME,
  CONNEXION,
  ONE_ARTICLE,
} from "./Action";

//Creation des useReducer de data
const DataReducer = (state, action) => {
  switch (action.type) {
    case ALL_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case ALL_AGENDA:
      return {
        ...state,
        agendas: action.payload,
      };
    case ALL_IMAGE_DESCRIPT:
      return {
        ...state,
        image_descriptif: action.payload,
      };
    case ALL_FORMATION:
      return {
        ...state,
        formation: action.payload,
      };
    case ALL_ORGANIGRAMME:
      return {
        ...state,
        organigramme: action.payload,
      };
    case ONE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    default:
      return state;
  }
};

//Creation des useReducer de User
 const userReducer = (state, action) => {
  switch (action.type) {
    case CONNEXION:
      return {
        user: action.payload,
        error: null
      };

    default:
      return state;
  }
};

export {DataReducer, userReducer }
