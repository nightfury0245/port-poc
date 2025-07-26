import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Icon from "@mui/material/Icon";
import { useState } from "react";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Truck from "./components/Truck";
import WeighBridge from "./components/Weigh_Bridge";
import Dock from "./components/Dock";

function Live() {
  const tabData = [
    { label: "Truck Data", value: "0", icon: "local_shipping" },
    { label: "Weigh Bridge", value: "1", icon: "scale" },
    { label: "Dock", value: "2", icon: "precision_manufacturing" },
  ];
  const [tabValue, setTabValue] = useState("0");

  const handleChange = (_, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabData.map((tab) => (
                <Tab
                  key={tab.value}
                  label={
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <Icon>{tab.icon}</Icon>
                      {tab.label}
                    </MDBox>
                  }
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <MDBox mt={3}>
          {tabValue === "0" && <Truck />}
          {tabValue === "1" && <WeighBridge />}
          {tabValue === "2" && <Dock />}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Live;
