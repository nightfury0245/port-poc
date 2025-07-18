import React, { useState, useEffect } from "react";
import httpClient from "httpClient";
export default function StyledTable() {
  const [data, setData] = useState([
    [
      {
        Licence_Plate: "AR68O7079",
        Waybill: "3099801038",
        RFID: "481535910194941200",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "PT",
        Position: "Gate004",
        AssignFlag: "0",
        Type: "Drop",
      },
      {
        Licence_Plate: "KA34P2704",
        Waybill: "4847309015",
        RFID: "864732190001060990",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "WB",
        Position: "Gate003",
        AssignFlag: "0",
        Type: "Drop",
      },
      {
        Licence_Plate: "MN54T9390",
        Waybill: "3556951893",
        RFID: "385655403163116884",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "WB",
        Position: "Gate004",
        AssignFlag: "0",
        Type: "Pick",
      },
      {
        Licence_Plate: "JH80R2983",
        Waybill: "3570978092",
        RFID: "382152993841825909",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "PT",
        Position: "Gate005",
        AssignFlag: "0",
        Type: "Pick",
      },
      {
        Licence_Plate: "WB42H1453",
        Waybill: "4061945387",
        RFID: "696989552763800373",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "WB",
        Position: "Gate002",
        AssignFlag: "0",
        Type: "Pick",
      },
      {
        Licence_Plate: "NL45X5760",
        Waybill: "6631731207",
        RFID: "487496684110998775",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "WB",
        Position: "Gate002",
        AssignFlag: "0",
        Type: "Pick",
      },
      {
        Licence_Plate: "MN70Z1906",
        Waybill: "4541288676",
        RFID: "443954041298118062",
        LOG: '{"testlog":"testlog"}',
        OCR: '{"testocr":"testocr"}',
        Status: "WB",
        Position: "Gate002",
        AssignFlag: "0",
        Type: "Drop",
      },
    ],
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("http://127.0.0.1:5000/getTrucks", {
          crossdomain: true,
        });
        // const result = await response.json();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>License</th>
          <th style={tableHeaderStyle}>Waybill</th>
          <th style={tableHeaderStyle}>Type</th>
          <th style={tableHeaderStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
            <td style={tableCellStyle}>{item.Licence_Plate}</td>
            <td style={tableCellStyle}>{item.Waybill}</td>
            <td style={tableCellStyle}>{item.Type}</td>
            <td style={tableCellStyle}>{item.Status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const evenRowStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  border: "1px solid #ddd",
};

const oddRowStyle = {
  backgroundColor: "white",
  padding: "8px",
  border: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "8px",
  border: "1px solid #ddd",
};
