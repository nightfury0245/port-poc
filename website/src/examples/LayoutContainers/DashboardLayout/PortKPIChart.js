import React, { useState } from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Select from "react-select";
import "chart.js";
import colors from "assets/theme/base/colors";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

const PortKPIChart = () => {
  const data = [
    {
      year: 2020,
      cargo_throughput_tons: 1250000,
      container_throughput_TEU: 600000,
      vessel_calls: 3500,
      berth_occupancy_rate: 80,
      turnaround_time_hours: 16,
      dwell_time_days: 2.5,
      container_yard_utilization: 85,
      productivity_per_crane: 30,
      port_operating_expenses_million_usd: 40,
      revenue_per_ton_usd: 60,
      profit_margin: 20,
      safety_incidents: 8,
      environmental_impact: {
        emissions_tons: 25000,
        waste_management_score: 75,
      },
      customs_clearance_time_hours: 6,
      customer_satisfaction_score: 85,
      supply_chain_connectivity_score: 90,
      infrastructure_investment_million_usd: 10,
      market_share_percent: 30,
      container_dwell_fees_million_usd: 2,
      breakbulk_cargo_handling_efficiency: 80,
      regulatory_compliance_score: 95,
    },
    {
      year: 2021,
      cargo_throughput_tons: 1300000,
      container_throughput_TEU: 620000,
      vessel_calls: 3600,
      berth_occupancy_rate: 85,
      turnaround_time_hours: 15,
      dwell_time_days: 2.3,
      container_yard_utilization: 87,
      productivity_per_crane: 32,
      port_operating_expenses_million_usd: 45,
      revenue_per_ton_usd: 58,
      profit_margin: 22,
      safety_incidents: 7,
      environmental_impact: {
        emissions_tons: 24000,
        waste_management_score: 78,
      },
      customs_clearance_time_hours: 5.5,
      customer_satisfaction_score: 87,
      supply_chain_connectivity_score: 92,
      infrastructure_investment_million_usd: 12,
      market_share_percent: 32,
      container_dwell_fees_million_usd: 2.2,
      breakbulk_cargo_handling_efficiency: 82,
      regulatory_compliance_score: 96,
    },
    {
      year: 2022,
      cargo_throughput_tons: 1350000,
      container_throughput_TEU: 640000,
      vessel_calls: 3700,
      berth_occupancy_rate: 87,
      turnaround_time_hours: 14,
      dwell_time_days: 2.1,
      container_yard_utilization: 88,
      productivity_per_crane: 34,
      port_operating_expenses_million_usd: 50,
      revenue_per_ton_usd: 55,
      profit_margin: 25,
      safety_incidents: 6,
      environmental_impact: {
        emissions_tons: 23000,
        waste_management_score: 80,
      },
      customs_clearance_time_hours: 5,
      customer_satisfaction_score: 89,
      supply_chain_connectivity_score: 94,
      infrastructure_investment_million_usd: 15,
      market_share_percent: 34,
      container_dwell_fees_million_usd: 2.4,
      breakbulk_cargo_handling_efficiency: 84,
      regulatory_compliance_score: 97,
    },
    {
      year: 2023,
      cargo_throughput_tons: 1400000,
      container_throughput_TEU: 660000,
      vessel_calls: 3800,
      berth_occupancy_rate: 88,
      turnaround_time_hours: 13,
      dwell_time_days: 2.0,
      container_yard_utilization: 90,
      productivity_per_crane: 36,
      port_operating_expenses_million_usd: 55,
      revenue_per_ton_usd: 52,
      profit_margin: 28,
      safety_incidents: 5,
      environmental_impact: {
        emissions_tons: 22000,
        waste_management_score: 85,
      },
      customs_clearance_time_hours: 4.5,
      customer_satisfaction_score: 91,
      supply_chain_connectivity_score: 96,
      infrastructure_investment_million_usd: 18,
      market_share_percent: 36,
      container_dwell_fees_million_usd: 2.6,
      breakbulk_cargo_handling_efficiency: 86,
      regulatory_compliance_score: 98,
    },
  ];

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  const years = data.map((entry) => entry.year);
  const vesselCalls = data.map((entry) => entry.vessel_calls);
  const berthOccupancyRate = data.map((entry) => entry.berth_occupancy_rate);
  const turnaroundTimeHours = data.map((entry) => entry.turnaround_time_hours);

  // Extract data for environmental analysis
  const emissionsTons = data.map((entry) => entry.environmental_impact.emissions_tons);
  const wasteManagementScore = data.map(
    (entry) => entry.environmental_impact.waste_management_score
  );

  // Extract data for economic analysis
  const portExpenses = data.map((entry) => entry.port_operating_expenses_million_usd);
  const revenuePerTon = data.map((entry) => entry.revenue_per_ton_usd);
  const profitMargin = data.map((entry) => entry.profit_margin);

  // Define options for the multi-select dropdowns
  const technicalOptions = [
    { label: "Vessel Calls", value: "vessel_calls" },
    { label: "Berth Occupancy Rate", value: "berth_occupancy_rate" },
    { label: "Turnaround Time (Hours)", value: "turnaround_time_hours" },
  ];

  const environmentalOptions = [
    { label: "Emissions (Tons)", value: "emissions_tons" },
    { label: "Waste Management Score", value: "waste_management_score" },
  ];

  const economicOptions = [
    { label: "Operating Expenses (Million USD)", value: "port_operating_expenses_million_usd" },
    { label: "Revenue per Ton (USD)", value: "revenue_per_ton_usd" },
    { label: "Profit Margin", value: "profit_margin" },
  ];

  const [selectedTechnicalOptions, setSelectedTechnicalOptions] = useState(technicalOptions);
  const [selectedEnvironmentalOptions, setSelectedEnvironmentalOptions] =
    useState(environmentalOptions);
  const [selectedEconomicOptions, setSelectedEconomicOptions] = useState(economicOptions);

  const icolors = [];

  const generateRandomColors = (options) => {
    for (let i = 0; i < options.length; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      icolors.push(color);
    }
    return icolors;
  };
  // Create state variables to manage the color palettes for each chart
  // Initialize separate state variables for colors
  const [technicalColors, setTechnicalColors] = useState(
    generateRandomColors(selectedTechnicalOptions)
  );
  const [environmentalColors, setEnvironmentalColors] = useState(
    generateRandomColors(selectedEnvironmentalOptions)
  );
  const [economicColors, setEconomicColors] = useState(
    generateRandomColors(selectedEconomicOptions)
  );

  // Create functions to handle option selection for each chart
  const handleTechnicalOptionsChange = (selectedOptions) => {
    setSelectedTechnicalOptions(selectedOptions);
  };

  const handleEnvironmentalOptionsChange = (selectedOptions) => {
    setSelectedEnvironmentalOptions(selectedOptions);
  };

  const handleEconomicOptionsChange = (selectedOptions) => {
    setSelectedEconomicOptions(selectedOptions);
  };

  // Create functions to generate chart data based on selected options with random colors
  const generateTechnicalChartData = () => {
    const colors = generateRandomColors(selectedTechnicalOptions);
    return {
      labels: years,
      datasets: selectedTechnicalOptions.map((option, index) => ({
        label: option.label,
        data: data.map((entry) => entry[option.value]),
        backgroundColor: colors[index],
      })),
    };
  };

  const generateEnvironmentalChartData = () => {
    const colors = generateRandomColors(selectedEnvironmentalOptions);
    return {
      labels: years,
      datasets: selectedEnvironmentalOptions.map((option, index) => ({
        label: option.label,
        data: data.map((entry) => entry.environmental_impact[option.value]),
        backgroundColor: colors[index],
      })),
    };
  };

  const generateEconomicChartData = () => {
    const colors = generateRandomColors(selectedEconomicOptions);
    return {
      labels: years,
      datasets: selectedEconomicOptions.map((option, index) => ({
        label: option.label,
        data: data.map((entry) => entry[option.value]),
        backgroundColor: colors[index],
      })),
    };
  };

  // Generate chart data based on selected options with random colors
  const technicalChartData = generateTechnicalChartData();
  const environmentalChartData = generateEnvironmentalChartData();
  const economicChartData = generateEconomicChartData();

  const generateNewTechnicalColors = () => {
    setTechnicalColors(generateRandomColors(selectedTechnicalOptions));
  };

  const generateNewEnvironmentalColors = () => {
    setEnvironmentalColors(generateRandomColors(selectedEnvironmentalOptions));
  };

  const generateNewEconomicColors = () => {
    setEconomicColors(generateRandomColors(selectedEconomicOptions));
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <MDBox mt={8}>
          <h2>Shipping Port Traffic and Congestion Management</h2>
          <div>
            <h2>Technical Analysis</h2>
            <Select
              isMulti
              options={technicalOptions}
              onChange={handleTechnicalOptionsChange}
              value={selectedTechnicalOptions}
            />
            <button onClick={generateNewTechnicalColors}>Generate New Palette</button>
            <Bar data={generateTechnicalChartData()} />

            <h2>Environmental Analysis</h2>
            <Select
              isMulti
              options={environmentalOptions}
              onChange={handleEnvironmentalOptionsChange}
              value={selectedEnvironmentalOptions}
            />
            <button onClick={generateNewEnvironmentalColors}>Generate New Palette</button>
            <Bar data={generateEnvironmentalChartData()} />

            <h2>Economic Analysis</h2>
            <Select
              isMulti
              options={economicOptions}
              onChange={handleEconomicOptionsChange}
              value={selectedEconomicOptions}
            />
            <button onClick={generateNewEconomicColors}>Generate New Palette</button>
            <Bar data={generateEconomicChartData()} />
          </div>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default PortKPIChart;
