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

function About() {
  const Technical_Advantages = {
    "Improved Efficiency":
      "The system can optimize the flow of ships, cargo, and personnel within the port, reducing congestion and improving overall operational efficiency.",
    "Real-time Monitoring":
      "It enables real-time monitoring of ship movements, cargo handling, and terminal operations, allowing for better decision-making and resource allocation.",
    "Traffic Control":
      "The system can control and regulate ship movements, berthing schedules, and traffic within the port, reducing the risk of accidents and collisions.",
    "Predictive Analytics":
      "Advanced analytics and forecasting tools can help predict congestion and plan for future capacity needs, ensuring smoother operations.",
    Automation:
      "Automation technologies can be integrated to streamline cargo handling, container stacking, and other processes, reducing the reliance on manual labor and minimizing errors.",
  };
  const Economic_Advantages = {
    "Increased Throughput":
      "By reducing congestion and optimizing operations, the port can handle a higher volume of cargo, leading to increased revenue for the port authority and businesses operating within the port.",
    "Reduced Downtime":
      "Less congestion means shorter wait times for ships, leading to reduced fuel costs, fewer demurrage charges, and lower overall operating costs for shipping companies.",
    "Improved Competitiveness":
      "Ports with efficient traffic management systems can attract more shipping lines and businesses, enhancing the competitiveness of the region and boosting the local economy.",
    "Job Creation":
      "While automation can reduce the need for manual labor, it can also create jobs in areas such as system maintenance, data analysis, and technology development.",
    "Reduced Environmental Costs":
      "By optimizing operations and reducing delays, the system can help reduce the environmental impact of shipping, including lower emissions from idling vessels.",
  };
  const Environmental_Advantages = {
    "Reduced Emissions":
      "Smoother traffic flow and shorter waiting times can lead to reduced emissions of greenhouse gases and air pollutants from ships and port equipment.",
    "Noise Reduction":
      "Efficient traffic management can minimize noise pollution in and around the port, improving the quality of life for nearby residents.",
    "Conservation of Natural Resources":
      "Improved efficiency can reduce the need for additional port infrastructure and expansion, potentially preserving natural habitats and reducing the environmental footprint of port development.",
    "Compliance with Regulations":
      "Many regions have stringent environmental regulations for ports, and a well-managed port traffic system can help ports meet these requirements.",
    "Sustainability Initiatives":
      "Ports that invest in congestion management systems can position themselves as leaders in sustainability and environmental responsibility, attracting environmentally conscious shipping companies and customers.",
  };
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              {/* <Grid container spacing={3}> */}
              {/* <Grid item xs={12} lg={4}> */}
              {/* <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" /> */}
              <Invoices data={Technical_Advantages} />
              {/* </Grid> */}
              {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid> */}
              {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid> */}
              {/* </Grid> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices data={Economic_Advantages} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices data={Environmental_Advantages} />
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <billingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default About;
