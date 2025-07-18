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
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { useState, useEffect } from "react";
import Truck from "./components/Truck";
import WeighBridge from "./components/Weigh_Bridge";
import Dock from "./components/Dock";

function Live() {
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
  const tabData = [
    { label: "Truck Data", value: "0", icon: "local_shipping" },
    { label: "Weigh Bridge", value: "1", icon: "scale" },
    { label: "Dock", value: "2", icon: "precision_manufacturing_outlined" },
  ];
  const [tabValue, setTabValue] = useState("0");

  const handleChange = (value) => {
    console.log(value);
    setTabValue(value);
  };

  useEffect(() => {}, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <Tabs value={tabValue} centered>
          {tabData.map((item) => (
            <Tab
              key={item.value}
              label={item.label}
              value={item.value}
              onClick={() => handleChange(item.value)}
            />
          ))}
        </Tabs>
        {tabValue === "0" && <Truck />}
        {tabValue === "1" && <WeighBridge />}
        {tabValue === "2" && <Dock />}
      </MDBox>
    </DashboardLayout>
  );
}

export default Live;
