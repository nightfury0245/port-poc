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

function Invoices({ data }) {
  Invoices.propTypes = {
    data: PropTypes.any,
  };
  console.log(data);
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Invoices
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small" onclick="openPopup()">
          view all
        </MDButton>
        <Card className="popup" id="popup">
          <h2>added</h2>
          <p>ya added it</p>
          <MDButton variant="outlined" color="info" size="small" onclick="closePopup()">
            OK
          </MDButton>
          <MDButton variant="outlined" color="info" size="small">
            edit
          </MDButton>
        </Card>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter />
        </MDBox>
      </MDBox>
    </Card>
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
