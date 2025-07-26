import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import "./truck-styles.css"; // Import custom styles
const Truck = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getTrucks");
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching truck data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader
        title="Live Truck Data"
        titleTypographyProps={{
          variant: "h6",
          fontWeight: "bold",
          color: "#1A237E",
        }}
      />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : data.length === 0 ? (
          <Typography>No live truck data available.</Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small" sx={{ minWidth: 650 }}>
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
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.Licence_Plate}</TableCell>
                        <TableCell>{row.Waybill}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.Type}
                            color={row.Type === "Pick" ? "success" : "secondary"}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label={row.Status} variant="outlined" size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography variant="body2">
                {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, data.length)} of ${
                  data.length
                }`}
              </Typography>
              <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[rowsPerPage]}
                labelDisplayedRows={() => null}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Truck;
