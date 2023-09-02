import mongoose from "mongoose";

const Schema = mongoose.Schema;
const options = {
  timestamps: true,
};

const ArticleSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    fichier: {
      type: String,
      required: true,
    },
    lu: {
      type: Number,
      default: 0,
    },
  },
  options
);
const ImageSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fichier: {
      type: String,
      required: true,
    },
  },
  options
);
const OrganigrammeSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fonction: {
      type: String,
      trim: true,
      required: true,
    },
    responsable: {
      type: String,
      required: true,
      trim: true,
    },
  },
  options
);
const FormationSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    fichier: {
      type: String,
      required: true,
    },
  },
  options
);
const AgendaSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    date: {
      type: String,
      required: true,
    },
  },
  options
);
const SoumisionSchema = new Schema(
  {
    profession: {
      type: String,
      required: true,
      enum: [
        "Interne en pharmacie",
        "Interne en médecine",
        "Etudiant en pharmacie",
        "Etudiant en médecine",
      ],
    },
    nom_prenoms: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Minimum 3 caratères"],
    },
    pays: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fichier: {
      type: String,
      required: true,
    },
  },
  options
);
const ContactSchema = new Schema(
  {
    civilite: {
      type: String,
      required: true,
      enum: ["Monsieur", "Mademoiselle", "Madame"],
    },
    nom_prenoms: {
      type: String,
      required: true,
      minLength: [3, "Minimum 3 caratères"],
      trim: true,
      uppercase: true,
    },
    pays: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    objet: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  options
);
export const ArticleModel = mongoose.model("Article", ArticleSchema);
export const ImageModel = mongoose.model("Image", ImageSchema);
export const OrganigrammeModel = mongoose.model(
  "Organigramme",
  OrganigrammeSchema
);
export const FormationModel = mongoose.model("Formation", FormationSchema);
export const AgendaModel = mongoose.model("Agenda", AgendaSchema);
export const SoumissionModel = mongoose.model("Soumission", SoumisionSchema);
export const ContactModel = mongoose.model("Contact", ContactSchema);
