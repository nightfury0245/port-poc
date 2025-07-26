import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Select from "react-select";
import "chart.js/auto";
import MDBox from "components/MDBox";
import { FormControlLabel, Switch, styled } from "@mui/material";

// Styled Switch matching the image
const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#42a5f5", // blue when ON
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#f4f4f4",
    width: 26,
    height: 26,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    backgroundColor: "#9e9e9e", // grey when OFF
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PortKPIChart = () => {
  // Year data...
  const year2021 = {
    Total_Container_Traffic: 511794,
    Average_Turn_Round_Time_days: 1.29,
    Average_CO2_emmition_by_ships: 7,
    Average_stay_at_berth_days: 1.19,
    Average_working_time_days: 1.07,
    Average_Pre_berthing_time_Port_Ac_Days: 0.04,
    Average_Preberthing_time_Port_Ac__HRs: 0.91,
    Average_nonworking_time_days: 0.12,
    Number_of_cargo_ships: 274,
    Yearly_Exports_in_tonnes: 4982760,
    Yearly_Imports_in_tonnes: 3600041,
  };

  const year2020 = {
    Total_Container_Traffic: 481072,
    Average_Turn_Round_Time_days: 1.07,
    Average_CO2_emmition_by_ships: 6,
    Average_stay_at_berth_days: 0.95,
    Average_working_time_days: 0.84,
    Average_Pre_berthing_time_Port_Ac_Days: 0.05,
    Average_Preberthing_time_Port_Ac__HRs: 1.23,
    Average_nonworking_time_days: 0.11,
    Number_of_cargo_ships: 309,
    Yearly_Exports_in_tonnes: 4942264,
    Yearly_Imports_in_tonnes: 3236186,
  };

  const computeEmissions = (yearData) => {
    yearData.Average_CO2_emmition_by_a_ship_in_KG =
      yearData.Average_Turn_Round_Time_days * yearData.Average_CO2_emmition_by_ships * 24;
    yearData.Average_CO2_emmition_by_a_ship_in_berth_in_KG =
      yearData.Average_stay_at_berth_days * yearData.Average_CO2_emmition_by_ships * 24;
    yearData.Average_CO2_emmition_by_a_ship_in_working_time_in_KG =
      yearData.Average_working_time_days * yearData.Average_CO2_emmition_by_ships * 24;
    yearData.Average_CO2_emmition_by_a_ship_Pre_berthing_time_Port_Ac_in_days_in_KG =
      yearData.Average_Pre_berthing_time_Port_Ac_Days * yearData.Average_CO2_emmition_by_ships * 24;
    yearData.Average_CO2_emmition_by_a_ship_Preberthing_time_Port_Ac__HRs_in_KG =
      yearData.Average_Preberthing_time_Port_Ac__HRs * yearData.Average_CO2_emmition_by_ships;
    yearData.Average_CO2_emmition_by_a_ship_nonworking_time_days_in_KG =
      yearData.Average_nonworking_time_days * yearData.Average_CO2_emmition_by_ships * 24;
    yearData.Total_emmition_by_ship =
      yearData.Average_CO2_emmition_by_a_ship_in_KG * yearData.Number_of_cargo_ships;
    return yearData;
  };

  computeEmissions(year2021);
  computeEmissions(year2020);

  const data = [
    { year: "2021", ...year2021 },
    { year: "2020", ...year2020 },
  ];

  const technicalOptions = [
    { label: "Total Container Traffic", value: "Total_Container_Traffic" },
    { label: "Average Turn-Round Time (days)", value: "Average_Turn_Round_Time_days" },
  ];

  const environmentalOptions = [
    { label: "Avg CO2 Emission by a ship (/day)", value: "Average_CO2_emmition_by_a_ship_in_KG" },
    { label: "Avg CO2 in berth", value: "Average_CO2_emmition_by_a_ship_in_berth_in_KG" },
    { label: "Total CO2 emitted by ships", value: "Total_emmition_by_ship" },
  ];

  const economicOptions = [
    { label: "Yearly Exports (tonnes)", value: "Yearly_Exports_in_tonnes" },
    { label: "Yearly Imports (tonnes)", value: "Yearly_Imports_in_tonnes" },
  ];

  const [selectedTechnicalOptions, setSelectedTechnicalOptions] = useState(technicalOptions);
  const [selectedEnvironmentalOptions, setSelectedEnvironmentalOptions] =
    useState(environmentalOptions);
  const [selectedEconomicOptions, setSelectedEconomicOptions] = useState(economicOptions);
  const [isNormalized, setIsNormalized] = useState(true);

  const generateRandomColors = (options) =>
    options.map(
      () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, 0.6)`
    );

  const generateChartData = (options) => {
    const colors = generateRandomColors(options);
    return {
      labels: data.map((entry) => entry.year),
      datasets: options.map((option, index) => {
        const values = data.map((entry) => entry[option.value]);
        const max = Math.max(...values);
        const chartData = isNormalized ? values.map((v) => v / max) : values;

        return {
          label: option.label,
          data: chartData,
          backgroundColor: colors[index],
          actualData: values,
        };
      }),
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const actual = context.dataset.actualData[context.dataIndex];
            return `${context.dataset.label}: ${actual.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return isNormalized ? value : value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={6} px={3}>
        <h2>Shipping Port KPI Dashboard</h2>

        <FormControlLabel
          control={
            <CustomSwitch checked={!isNormalized} onChange={() => setIsNormalized(!isNormalized)} />
          }
          label={isNormalized ? "Showing Normalized Values" : "Showing Actual Values"}
          sx={{ mb: 2 }}
        />

        <h3>Technical KPIs</h3>
        <Select
          isMulti
          options={technicalOptions}
          onChange={setSelectedTechnicalOptions}
          value={selectedTechnicalOptions}
        />
        <Bar data={generateChartData(selectedTechnicalOptions)} options={chartOptions} />

        <h3>Environmental KPIs</h3>
        <Select
          isMulti
          options={environmentalOptions}
          onChange={setSelectedEnvironmentalOptions}
          value={selectedEnvironmentalOptions}
        />
        <Bar data={generateChartData(selectedEnvironmentalOptions)} options={chartOptions} />

        <h3>Economic KPIs</h3>
        <Select
          isMulti
          options={economicOptions}
          onChange={setSelectedEconomicOptions}
          value={selectedEconomicOptions}
        />
        <Bar data={generateChartData(selectedEconomicOptions)} options={chartOptions} />
      </MDBox>
    </DashboardLayout>
  );
};

export default PortKPIChart;
