import { category, location } from "../../utils/location";
import { ProfessionalModel } from "./professional.model";



const knownLocations = location.map((item)=>item.toLowerCase());
const knownProfessions = ['doc', 'hos','org'];
const categories = category.map((item)=>item.toLowerCase());


function extractData(inputText:string) {
  inputText=inputText.toLowerCase();
  // Improved regular expressions
  let locationMatch='' ;
  knownLocations.forEach((item)=>{
    if(inputText.includes(item)){
      locationMatch=item;
      console.log(item)
      return;
    }
  }); // Captures words after 'in'
  let professionMatch;
   knownProfessions.forEach((item)=>{
    if(inputText.includes(item)){
      professionMatch = item;
      console.log(professionMatch)
    }
})
  const bestMatch = /best/i.test(inputText); // Checks for the presence of 'best'
  let category;
  categories.forEach((item)=>{
    if(inputText.includes(item)){
      category=item
    }
  })

  return {
    location: locationMatch ? locationMatch.trim() : null, // Captures full location name
    profession: professionMatch==='doc' ? 'doctor' : 'organization',
    best: bestMatch,
    category
  };
}



// List of known locations and professions

async function extractEntities(text:string) {
  try {
    
    // Extract entities
    let location = null;
    let profession = null;
    const best = /best/i.test(text);
    let cat=null;

    // Fallback to regex for location detection
    if (!location) {
      const locationMatch = text.match(new RegExp(`\\b(${knownLocations.join('|')})\\b`, 'i'));
      location = locationMatch ? locationMatch[0] : null;
    }
    
    if (!cat) {
      const catMatch = text.match(new RegExp(`\\b(${categories.join('|')})\\b`, 'i'));
      location = catMatch ? catMatch[0] : null;
    }

    // Fallback for profession detection
    if (!profession) {
      const professionMatch = text.match(new RegExp(`\\b(${knownProfessions.join('|')})\\b`, 'i'));
      profession = professionMatch ? professionMatch[0] : null;
    }

    return { location, profession, best,category:cat };
  } catch (error) {
    console.error('Error extracting entities:', error);
    throw new Error('Failed to extract entities');
  }
}




const createProfessional = async (Professional: {prompt:string}): Promise<any | null> => {
  
  const { prompt } = Professional;
  // Make the prompt more specific
  const data =  extractData(prompt);
  const query:any = {$and:[]};
  if(data.location){
    query['$and'].push({
      $or:[
        {zone: {$elemMatch:{ $regex: data.location, $options: "i" } }},
        {branch: {$elemMatch:{ $regex: data.location, $options: "i" }}}
      ]
    })
  }
  if(data.category){
    query['$and'].push({sub_category: {$elemMatch:{ $regex: data.category, $options: "i" }} })
  }
  if(data.profession){
    query['$and'].push({
      type: {$regex:data.profession,$options:"i"}
    })
  }
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (data.best) {
    sortCondition['rating'] =  "desc";
  }

  const result  = await ProfessionalModel.find(query)
  .sort(sortCondition)
  .select("type org_id business name ranking photo category sub_category rating total_appointment zone branch area")
  .limit(2)
  .exec()

  console.log(query,sortCondition)
    
  return result;
};



export const ProfessionalService = {
  createProfessional
};
