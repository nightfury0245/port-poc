// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// billing page components
import Invoice from "layouts/about/components/Invoice";
import PropTypes from "prop-types";

import "./style.css";
import ScrollDialog from "examples/Dialog";
import { useState } from "react";

function Invoices({ data }) {
  Invoices.propTypes = {
    data: PropTypes.any,
  };

  const [open, setOpen] = useState(false);
  console.log(data);
  console.log(Object.keys(data));
  const headings = Object.keys(data);

  function handleclick() {
    setOpen(true);
  }
  return (
    <>
      <Card sx={{ height: "100%" }}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Technical Advantages
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
            <Invoice date="Traffic Control" id="" price="" />
            <Invoice date="Automation" id="" price="" />
            <Invoice date="Predictive Analytics" id="" price="" />
            <Invoice date="Real-time Monitoring" id="" price="" />
            <Invoice date="Improved Efficiency" id="" price="" noGutter />
            {headings.map((heading, i) => {
              // <Invoice date={heading.toString()} id={i.toString()} price="$250" />;
              <Invoice date="dummy heading" id="id" price="$250" />;
            })}
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

export default Invoices;
