import React from "react";
export default function StyledTable() {
  const data = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
    { id: 3, name: "Bob Johnson", age: 35, city: "Chicago" },
    { id: 4, name: "Alice Brown", age: 28, city: "San Francisco" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>ID</th>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Age</th>
          <th style={tableHeaderStyle}>City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
            <td style={tableCellStyle}>{item.id}</td>
            <td style={tableCellStyle}>{item.name}</td>
            <td style={tableCellStyle}>{item.age}</td>
            <td style={tableCellStyle}>{item.city}</td>
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
