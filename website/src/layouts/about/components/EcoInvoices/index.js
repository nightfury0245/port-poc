/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// billing page components
import Invoice from "layouts/about/components/Invoice";
import PropTypes from "prop-types";

import ScrollDialog from "examples/Dialog";
import { useState } from "react";
import "./style.css";

function EcoInvoices({ data }) {
  EcoInvoices.propTypes = {
    data: PropTypes.any,
  };
  console.log(data);
  console.log(Object.keys(data));
  const headings = Object.keys(data);
  const [open, setOpen] = useState(false);

  function handleclick() {
    setOpen(true);
  }
  return (
    <>
      <Card sx={{ height: "100%" }}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Economic Advantages
          </MDTypography>
          <MDButton variant="outlined" color="info" size="small" onClick={handleclick}>
            view all
          </MDButton>
          {/* <Card className="popup" id="popup">
          <h2>added</h2>
          <p>ya added it</p>
          <MDButton variant="outlined" color="info" size="small" onclick="closePopup()">
            OK
          </MDButton>
          <MDButton variant="outlined" color="info" size="small">
            edit
          </MDButton>
        </Card> */}
        </MDBox>
        <MDBox p={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            <Invoice date="Reduced Environmental Costs" id="" price="" />
            <Invoice date="Improved Efficiency" id="" price="" />
            <Invoice date="Increased Throughput" id="" price="" noGutter />
            <Invoice date="Job Creation" id="" price="" />
            <Invoice date="Reduced Downtime" id="" price="" />

            {/* {headings.map((heading, i) => {
            // <Invoice date={heading.toString()} id={i.toString()} price="$250" />;
            <Invoice date="dummy heading" id="id" price="$250" />;
          })} */}
          </MDBox>
        </MDBox>
      </Card>
      {open === true && <ScrollDialog openflag={open} setOpenflag={setOpen} data={data} />}
    </>
  );
}

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}

export default EcoInvoices;
