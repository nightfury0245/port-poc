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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// billing page components
import PaymentMethod from "layouts/about/components/PaymentMethod";
import Invoices from "layouts/about/components/Invoices";
import billingInformation from "layouts/about/components/BillingInformation";
import Transactions from "layouts/about/components/Transactions";
import { useState, useEffect } from "react";
import httpClient from "httpClient";
import Config from "../../config.json";

function About() {
  const [data, setData] = useState();

  const getData = async () => {
    const resp = await httpClient.get(Config.apiUrl + "/getAdvantages");
    console.log(resp.json());
    setData(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          {/* <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <Invoices data={data["Technical_Advantages"]} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices data={data["Economic_Advantages"]} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices data={data["Environmental_Advantages"]} />
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default About;
