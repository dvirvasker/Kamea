/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import eventsTableData from "layouts/tables/data/eventsTableData";
import MDAlert from "components/MDAlert";
import { Dialog, DialogContent } from "@mui/material";
import { useState, useEffect } from "react";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import axios from "axios";
import { Outlet } from "react-router-dom";

const regulsrUserRequestsTable = () => {
  const tableTittle = "אירועים";

  const [dbError, setDbError] = useState(false);
  const [tabValue, setTabValue] = useState();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  //   const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows, dbError: dbe, setDBerror: setDbe } = eventsTableData();
  const handleErrorClose = () => {
    setDbError(true);
    setDbe(false);
  };
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const handleSetTabValue = (event, tabIndex) => {
    let tabIndexName = "";

    if (tabIndex === 0) {
      tabIndexName = "גדוד";
    } else if (tabIndex === 1) {
      tabIndexName = "חטיבה";
    } else if (tabIndex === 2) {
      tabIndexName = "אוגדה";
    } else if (tabIndex === 3) {
      tabIndexName = "פיקוד";
    } else if (tabIndex === 4) {
      tabIndexName = "מטכ''ל";
    }
    setTabValue(tabIndex);
    // props.setTabViewValue(tabIndex);

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("dashboardView", JSON.stringify({ tabIndexName, tabIndex }));
    // }
  };
  const showError = () => (
    <Dialog
      open={dbe}
      onClose={handleErrorClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בקבלת הבקשות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const table = () => (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
            >
              <MDTypography variant="h3" color="white">
                {tableTittle}
              </MDTypography>
              <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                <AppBar position="static">
                  <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                    <Tab
                      label="גדוד"
                      // icon={
                      //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      //     settings
                      //   </Icon>
                      // }
                    />
                    <Tab
                      label="חטיבה"
                      // icon={
                      //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      //     settings
                      //   </Icon>
                      // }
                    />
                    <Tab
                      label="אוגדה"
                      // icon={
                      //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      //     email
                      //   </Icon>
                      // }
                    />
                    <Tab
                      label="פיקוד"
                      // icon={
                      //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      //     home
                      //   </Icon>
                      // }
                    />
                    <Tab
                      label="מטכ''ל"
                      // icon={
                      //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      //     home
                      //   </Icon>
                      // }
                    />
                  </Tabs>
                </AppBar>
              </Grid>
            </MDBox>
            <MDBox pt={3}>
              {pRows.length !== 0 ? (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder={false}
                />
              ) : dbError || dbe ? (
                <MDTypography mx={30} variant="h3" color="error" textGradient={true}>
                  תקלת שרת{" "}
                </MDTypography>
              ) : (
                <MDTypography mx={30} variant="h3" color="mekatnar" textGradient={true}>
                  <FormGroup>
                    <MDBox
                      bgColor="light"
                      borderRadius="md"
                      opacity={5}
                      shadow="lg"
                      variant="contained"
                      p={1}
                      mx={0}
                      // mt={-3}
                      // p={3}
                      // mb={1}
                    >
                      <MDAlert sx={{ alignItems: "stretch" }} color="mekatnar">
                        <MDTypography variant="h6" color="white">
                          mnm
                        </MDTypography>
                      </MDAlert>
                    </MDBox>
                  </FormGroup>
                </MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showError()}
      {table()}
      <Outlet />
      <Footer />
    </DashboardLayout>
  );
};

export default regulsrUserRequestsTable;
