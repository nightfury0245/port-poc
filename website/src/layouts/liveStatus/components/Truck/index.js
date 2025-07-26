import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MDBox from "components/MDBox";
import httpClient from "httpClient";

function Truck() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get("http://127.0.0.1:5000/getTrucks", {
          crossdomain: true,
        });
        console.log("Truck Data Response:", response.data);

        // Try to extract the array safely
        const extracted = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data[0])
          ? response.data[0]
          : [];

        setData(extracted);
      } catch (error) {
        console.error("Error fetching truck data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MDBox>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            Live Truck Data
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>License</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Waybill</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={`${item.Licence_Plate}-${index}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    }}
                  >
                    <TableCell>{item.Licence_Plate}</TableCell>
                    <TableCell>{item.Waybill}</TableCell>
                    <TableCell>{item.Type}</TableCell>
                    <TableCell>{item.Status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </MDBox>
  );
}

export default Truck;
