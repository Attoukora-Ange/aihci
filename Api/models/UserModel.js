import mongoose from "mongoose";

const Schema = mongoose.Schema;
const options = {
  timestamps: true,
};

const UserSchema = new Schema(
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
      minLength: [3, "Minimum 3 caratères"],
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
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Minimum 4 caratères"],
      trim: true,
    },
    matrimoniale: {
      type: String,
    },
    loge: {
      type: String,
    },
    service: {
      type: String,
      trim: true,
    },
    structure: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  options
);

export default mongoose.model("User", UserSchema);
