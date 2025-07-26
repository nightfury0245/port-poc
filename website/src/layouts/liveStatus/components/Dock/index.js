import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

const DockStatus = () => {
  const [docks, setDocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/docks");
      setDocks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dock data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocks();
    const interval = setInterval(fetchDocks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: 4, padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Dock Live Status
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Dock ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Dock Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Port ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docks.map((dock, index) => (
                <TableRow key={index}>
                  <TableCell>{dock.Dock_ID}</TableCell>
                  <TableCell>{dock.Dock_Name}</TableCell>
                  <TableCell>{dock.Port_ID}</TableCell>
                  <TableCell>{dock.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default DockStatus;
