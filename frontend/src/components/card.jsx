import React from 'react';

const DoctorCard = ({doctor}) => {
  

  return (
    <div className="doctor-card">
        {console.log("doctor",doctor)}
      {/* <img src={doctor.photo} alt={doctor.name} className="doctor-photo" /> */}
      <h2>{doctor.name}</h2>
      <p><strong></strong> {doctor.type}</p>
      <p><strong>Specialties:</strong> {doctor.sub_category?.join(", ")}</p>
      <p><strong>Rating:</strong> ⭐ {doctor.rating} / 5</p>
      <p><strong>Ranking:</strong> {doctor.ranking}</p>
      <p><strong>Total Appointments:</strong> {doctor.total_appointment}</p>
      {/* <p><strong>Service Area:</strong> {doctor.serviceArea}</p> */}
      <div className="zones">
        <strong>Available Zones:</strong>
        <ul>
          {doctor.zone?.map((zone, index) => <li key={index}>{zone}</li>)}
        </ul>
      </div>
      <div className="branches">
        <strong>Branches:</strong>
        <ul>
          {doctor.branch?.map((branch, index) => <li key={index}>{branch}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default DoctorCard;
