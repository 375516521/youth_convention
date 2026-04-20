import { useState } from "react";
import { QrReader } from "react-qr-reader";
import api from "../api";

export default function ScanCheckin({ adminKey }) {

  const handleScan = async (result) => {

    if(result){

      const id = result?.text;

      try{

        await api.patch(`/${id}/checkin`,null,{
          headers:{ "x-admin-key":adminKey }
        });

        alert("Youth Checked In");

      }catch{
        alert("Check in failed");
      }

    }

  };

  return(

    <div>

      <h2>Scan QR Code</h2>

      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result)=>handleScan(result)}
      />

    </div>

  );

}