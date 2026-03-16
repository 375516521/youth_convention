import React, { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // fixed import

const Badge = forwardRef(({ youth }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "350px",
        height: "200px",
        backgroundColor: "#87CEEB", // skyblue
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#fff" }}>{youth.fullName}</h3>
        <p style={{ margin: 0, color: "#fff" }}>{youth.congregation}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <QRCodeCanvas value={youth._id} size={80} bgColor="#fff" fgColor="#000" />
        <div style={{ fontSize: "12px", color: "#fff", textAlign: "right" }}>
          <div>Phone: {youth.phone}</div>
          <div>Talent: {youth.talent}</div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "10px", color: "#fff", marginTop: "5px" }}>
        Developed by Pianist Charles Wambua | Contact: 0745939344
      </div>
    </div>
  );
});

export default Badge;