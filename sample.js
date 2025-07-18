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
      Year2021: {
        Total_Container_Traffic: 511794,
        best_shipment_in_day: { no_of_shipment: 42, date: "24.04.2021" },
        best_shipment_in_month: { no_of_shipment: 887, data: "april-2021" },
        output_per_ship_berthday_OSBD_in_Tonnes: 26578,
        Average_Per_Berthing_Detention_PBD_in_days: 0.04,
        Average_Turn_around_time_TRT_in_days: 1.29,
        Average_Per_Berthing_Detention_PBD_port_ac_in_hrs: 0.91,
        Yearly_Export_in_tonnes: 4982760,
        Yearly_Imports_in_tonnes: 3600041,
        Costal_Export: 205160,
        Oversea_Export: 4777600,
        Costal_Import: 224929,
        Oversea_Import: 3375112,
        Total_Costal_exp_n_imp: 430089,
        Total_Oversea_Trafic_exp_n_imp: 8152712,
        Total_import_and_export: 8582801,
        Number_of_cargo_ships: 274,
        Cargo_handled_tonnes: 8633665,
        Average_Turn_Round_Time_days: 1.29,
        Average_stay_at_berth_days: 1.19,
        Average_working_time_days: 1.07,
        Average_Pre_berthing_time_Port_Ac_Days: 0.04,
        Average_Preberthing_time_Port_Ac__HRs: 0.91,
        Average_nonworking_time_days: 0.12,
        Average_parcel_size_Tonnes: 31510,
        Average_output_per_ship_berth_day_tonnes: 26578,
        Percentage_of_nonworking_time_at_berth: 10,
        Preberthing_delay_early_arrival: 88,
        Preberthing_delay_Others: 160,
        Preberthing_delay_Total: 248,
        Port_accountin_hours_AwaitingShiftingsailing_due_to_earlier_movements: 44,
        Port_accountin_hours_Others: 1,
        Port_accountin_hours_Total: 56,
        NonPort_Accountin_hours_Pre_commence_ment_delays_of_survey_initial_arrange_ments_etc: 336,
        NonPort_Accountin_hours_Want_of_cargo_including_cargo_collection_from_hatch_wings: 3,
        NonPort_Accountin_hours_Post_completion_delays_of_survey_etc: 372,
        NonPort_Accountin_hours_Others: 4,
        NonPort_Accountin_hours_Total: 715,
        Average_CO2_emmition_by_ships_per_hour: 6,
        Average_CO2_emmition_by_a_ship_in_KG: 185.76,
        Average_CO2_emmition_by_a_ship_in_berth_in_KG: 171.36,
        Average_CO2_emmition_by_a_ship_in_working_time_in_KG: 154.08,
        Average_CO2_emmition_by_a_ship_Pre_berthing_time_Port_Ac_in_days_in_KG: 5.76,
        Average_CO2_emmition_by_a_ship_Preberthing_time_Port_Ac_HRs_in_KG: 5.46,
        Average_CO2_emmition_by_a_ship_nonworking_time_days_in_KG: 17.28,
        Total_emmition_by_ship: 50898.24,
      },
      Year2020: {
        Total_Container_Traffic: 481072,
        best_shipment_in_day: { no_of_shipment: 41, date: "18.02.2021" },
        best_shipment_in_month: { no_of_shipment: 1083, date: "Mar_2021" },
        output_per_ship_berthday_OSBD_in_Tonnes: 27793,
        Average_Per_Berthing_Detention_PBD_in_days: 0.05,
        Average_Turn_around_time_TRT_in_days: 1.07,
        Average_Per_Berthing_Detention_PBD_port_ac_in_hrs: 1.23,
        Yearly_Export_in_tonnes: 4942264,
        Yearly_Imports_in_tonnes: 3236186,
        Costal_Export: 119496,
        Oversea_Export: 4822768,
        Costal_Import: 187422,
        Oversea_Import: 3048764,
        Total_Costal_exp_n_imp: 306918,
        Total_Oversea_Trafic_exp_n_imp: 7871532,
        Total_import_and_export: 8178450,
        Number_of_cargo_ships: 309,
        Cargo_handled_tonnes: 8159654,
        Average_Turn_Round_Time_days: 1.07,
        Average_stay_at_berth_days: 0.95,
        Average_working_time_days: 0.84,
        Average_Pre_berthing_time_Port_Ac_Days: 0.05,
        Average_Preberthing_time_Port_Ac__HRs: 1.23,
        Average_nonworking_time_days: 0.11,
        Average_parcel_size_Tonnes: 26407,
        Average_output_per_ship_berth_day_tonnes: 27793,
        Percentage_of_nonworking_time_at_berth: 12,
        Preberthing_delay_early_arrival: 127,
        Preberthing_delay_Others: 252,
        Preberthing_delay_Total: 379,
        Port_accountin_hours_AwaitingShiftingsailing_due_to_earlier_movements: 47,
        Port_accountin_hours_Others: 2,
        Port_accountin_hours_Total: 49,
        NonPort_Accountin_hours_Pre_commence_ment_delays_of_survey_initial_arrange_ments_etc: 364,
        NonPort_Accountin_hours_Want_of_cargo_including_cargo_collection_from_hatch_wings: 3,
        NonPort_Accountin_hours_Post_completion_delays_of_survey_etc: 394,
        NonPort_Accountin_hours_Others: 20,
        NonPort_Accountin_hours_Total: 801,
        Average_CO2_emmition_by_ships_per_hour: 7,
        Average_CO2_emmition_by_a_ship_in_KG: 179.76,
        Average_CO2_emmition_by_a_ship_in_berth_in_KG: 159.6,
        Average_CO2_emmition_by_a_ship_in_working_time_in_KG: 141.12,
        Average_CO2_emmition_by_a_ship_Pre_berthing_time_Port_Ac_in_days_in_KG: 8.4,
        Average_CO2_emmition_by_a_ship_Preberthing_time_Port_Ac_HRs_in_KG: 8.61,
        Average_CO2_emmition_by_a_ship_nonworking_time_days_in_KG: 18.48,
        Total_emmition_by_ship: 55545.84,
      },
    },
  ];

//   data.map((item) => {
//     item["Average_CO2_emmition_by_a_ship_in_KG"] =
//       item["Average_Turn_Round_Time_days"] * item["Average_CO2_emmition_by_ships"] * 24;
//   });

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  const years = data.map((entry) => entry.year);
  const vesselCalls = data.map((entry) => entry.vessel_calls);
  const berthOccupancyRate = data.map((entry) => entry.berth_occupancy_rate);
  const turnaroundTimeHours = data.map((entry) => entry.turnaround_time_hours);

  // Extract data for environmental analysis
  // const emissionsTons = data.map((entry) => entry.Total_emmition_by_ship);
  // const wasteManagementScore = data.map(
  //   (entry) => entry.environmental_impact.waste_management_score
  // );

  // Extract data for economic analysis
  const portExpenses = data.map((entry) => entry.port_operating_expenses_million_usd);
  const revenuePerTon = data.map((entry) => entry.revenue_per_ton_usd);
  const profitMargin = data.map((entry) => entry.profit_margin);

  // Define options for the multi-select dropdowns
  const technicalOptions = [
    { label: "Total Container Traffic", value: "Total_Container_Traffic" },
    { label: "Best Shipment in Day", value: "best_shipment_in_day" },
    { label: "Best Shipment in Month", value: "best_shipment_in_month" },
    {
      label: "Output Per Ship Berthday OSBD (in Tonnes)",
      value: "output_per_ship_berthday_OSBD_in_Tonnes",
    },
    {
      label: "Average Per Berthing Detention (PBD) (in days)",
      value: "Average_Per_Berthing_Detention_PBD_in_days",
    },
    {
      label: "Average Turnaround Time (TRT) (in days)",
      value: "Average_Turn_around_time_TRT_in_days",
    },
    {
      label: "Average Per Berthing Detention (PBD) (port a/c) (in hrs.)",
      value: "Average_Per_Berthing_Detention_PBD_port_ac_in_hrs",
    },
    { label: "Number of cargo ships", value: "Yearly_Imports_in_tonnes" },
    { label: "Cargo handled (tonnes)", value: "Costal_Export" },
    { label: "Average Turn-Round Time (days)", value: "Oversea_Export" },
    { label: "Average stay at berth (days)", value: "Costal_Import" },
    { label: "Average working time (days)", value: "Oversea_Import" },
    { label: "Average Pre-berthing time Port A/c - Days", value: "Total_Costal_exp_n_imp" },
    { label: "Average Pre-berthing time Port A/c - HRs", value: "Total_Oversea_Trafic_exp_n_imp" },
    { label: "Average non-working time (days)", value: "Total_import_and_export" },
    { label: "Average parcel size (Tonnes)", value: "Number_of_cargo_ships" },
    { label: "Average output per ship berth day (tonnes)", value: "Cargo_handled_tonnes" },
    { label: "Percentage of non-working time at berth", value: "Average_Turn_Round_Time_days" },
    { label: "Pre-berthing delay: early arrival", value: "Average_stay_at_berth_days" },
    { label: "Pre-berthing delay: Others", value: "Average_working_time_days" },
    { label: "Pre-berthing delay: Total", value: "Average_Pre_berthing_time_Port_Ac_Days" },
    {
      label: "Port account (in hours): Awaiting/Shifting/sailing due to earlier movements",
      value: "Average_Preberthing_time_Port_Ac__HRs",
    },
    { label: "Port account (in hours): Others", value: "Average_nonworking_time_days" },
    { label: "Port account (in hours): Total", value: "Average_parcel_size_Tonnes" },
    {
      label:
        "Non-Port Account (in hours): Pre-commencement delays of survey, initial arrangements, etc.",
      value: "Average_output_per_ship_berth_day_tonnes",
    },
    {
      label:
        "Non-Port Account (in hours): Want of cargo including cargo collection from hatch wings",
      value: "Percentage_of_nonworking_time_at_berth",
    },
    {
      label: "Non-Port Account (in hours): Post completion delays of survey, etc.",
      value: "Preberthing_delay_early_arrival",
    },
    { label: "Non-Port Account (in hours): Others", value: "Preberthing_delay_Others" },
    { label: "Non-Port Account (in hours): Total", value: "Preberthing_delay_Total" },
  ];

  const environmentalOptions = [
    { label: "Avg CO2 emmited by a ship/Hr", value: "Average_CO2_emmition_by_ships_per_hour" },
    { label: "Avg CO2 emmited by a ship/day", value: "Average_CO2_emmition_by_a_ship_in_KG" },
    {
      label: "Avg CO2 emmited by a ship in berth",
      value: "Average_CO2_emmition_by_a_ship_in_berth_in_KG",
    },
    {
      label: "Avg CO2 emmited by a ship while cargo loading",
      value: "Average_CO2_emmition_by_a_ship_in_working_time_in_KG",
    },
    {
      label: "Avg CO2 emmited by a ship while Pre-Berting(/day)",
      value: "Average_CO2_emmition_by_a_ship_Pre_berthing_time_Port_Ac_in_days_in_KG",
    },
    {
      label: "Avg CO2 emmited by a ship while Pre-Berting(/Hour)",
      value: "Average_CO2_emmition_by_a_ship_Preberthing_time_Port_Ac_HRs_in_KG",
    },
    {
      label: "Avg CO2 emmited by a ship while Non-Working Ship",
      value: "Average_CO2_emmition_by_a_ship_nonworking_time_days_in_KG",
    },
    { label: "Total CO2 emmited by the ships", value: "Total_emmition_by_ship" },
    { label: "Waste Management Score", value: "waste_management_score" }, // I dont know how to do it yet
  ];

  const economicOptions = [
    { label: "Yearly Export (in tonnes)", value: "Yearly_Export_in_tonnes" },
    { label: "Yearly Imports (in tonnes)", value: "Yearly_Imports_in_tonnes" },
    { label: "Costal Export", value: "Costal_Export" },
    { label: "Oversea Export", value: "Oversea_Export" },
    { label: "Costal Import", value: "Costal_Import" },
    { label: "Oversea Import", value: "Oversea_Import" },
    { label: "Total Costal exp+imp", value: "Total_Costal_exp_n_imp" },
    { label: "Total Oversea Traffic exp+imp", value: "Total_Oversea_Trafic_exp_n_imp" },
    { label: "Total import and export", value: "Total_import_and_export" },
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
