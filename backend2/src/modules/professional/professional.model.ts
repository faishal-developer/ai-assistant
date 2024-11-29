import { Schema, model } from "mongoose";
import { IProfessionalModel, IProfessional } from "./professional.interface";

const ProfessionalSchema = new Schema<IProfessional, object>(
  {

    type:{
      type:String,
    },
    org_id:{
      type:String,
    },
    business:{
      type:String,
    },
    name:{
      type:String,
    },
    ranking:{
      type:Number,
    },
    photo:{
      type:String,
    },
    category:{
      type:String,
    },
    sub_category:{
      type:[String],
    },
    rating:{
      type:Number,
    },
    total_appointment:{
      type:Number,
    },
    zone:{
      type:[String],
    },
    branch:{
      type:[String],
    },
    area:{
      type:String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ProfessionalModel = model<IProfessional, IProfessionalModel>("Professional", ProfessionalSchema);
