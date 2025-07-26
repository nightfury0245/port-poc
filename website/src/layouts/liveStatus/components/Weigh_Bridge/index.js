import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
} from "@mui/material";

const WeighBridge = () => {
  const [weighbridges, setWeighbridges] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeighbridges = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/weighbridges");
      setWeighbridges(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weighbridge data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeighbridges();
    const interval = setInterval(fetchWeighbridges, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ margin: 4, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weighbridge Status
        </Typography>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100px">
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>WB ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Truck ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Weight in KG</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Timestamp</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weighbridges.map((wb, index) => (
                <TableRow key={index}>
                  <TableCell>{wb.WB_ID}</TableCell>
                  <TableCell>{wb.Truck_ID}</TableCell>
                  <TableCell>{wb.Weight}</TableCell>
                  <TableCell>{wb.Status}</TableCell>
                  <TableCell>{wb.Timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WeighBridge;
