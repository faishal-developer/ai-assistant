import { Model, Types } from "mongoose";


export type IProfessional = {
  type:string,
  org_id:string,
  business:string,
  name:string,
  ranking:number,
  photo:string,
  category:string,
  sub_category:string[],
  rating:number,
  total_appointment:number,
  zone:string[],
  branch:string[],
  area:string,
};

export type IProfessionalModel = Model<IProfessional, Record<string, unknown>>;

