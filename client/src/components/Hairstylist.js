import React from "react";
import { useNavigate } from "react-router-dom";

function Hairstylist({ hairstylist }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${hairstylist._id}`)}
    >
      <h1 className="card-title">
        {hairstylist.firstName} {hairstylist.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {hairstylist.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {hairstylist.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {hairstylist.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {hairstylist.timings[0]} - {hairstylist.timings[1]}
      </p>
    </div>
  );
}

export default Hairstylist;