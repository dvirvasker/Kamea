/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link, Navigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
} from "@mui/material";
// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";

const { user } = isAuthenticated();
// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const [dataStatus, setDataStatus] = useState({
    error: false,
    errorFile: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/NgCar/requsest/personalnumber`, {
  //       params: {
  //         personalnumber: user.personalnumber,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
  useEffect(() => {
    console.log(user.personalnumber);
    axios
      .get(`http://localhost:5000/NgCar/requsest/requestByPersonalnumber/${user.personalnumber}`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
  // const handleCloseSuccsecModal = () => {
  //   setDataStatus({
  //     ...dataStatus,
  //     loading: false,
  //     errorFile: false,
  //     error: false,
  //     successmsg: false,
  //     NavigateToReferrer: true,
  //   });
  // };
  // const handleCloseLoadingModal = () => {
  //   setDataStatus({ ...dataStatus, loading: false });
  // };
  // const handleCloseErrorModal = () => {
  //   setDataStatus({
  //     ...dataStatus,
  //     loading: false,
  //     error: false,
  //     errorFile: false,
  //     successmsg: false,
  //     NavigateToReferrer: false,
  //   });
  // };
  // const handleCloseErrorFileModal = () => {
  //   setDataStatus({
  //     ...dataStatus,
  //     loading: false,
  //     error: false,
  //     errorFile: false,
  //     successmsg: false,
  //     NavigateToReferrer: false,
  //   });
  // };
  // // const NavigateUser = () => {
  // //   if (dataStatus.NavigateToReferrer) {
  // //     return <Navigate to="/userRequestsTable" />;
  // //   }
  // // };

  // const showSuccess = () => (
  //   <Dialog
  //     open={dataStatus.successmsg}
  //     onClose={handleCloseSuccsecModal}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //   >
  //     <MDBox
  //       variant="gradient"
  //       bgColor="mekatnar"
  //       coloredShadow="mekatnar"
  //       borderRadius="l"
  //       // mx={2}
  //       // mt={2}
  //       p={3}
  //       // mb={2}
  //       textAlign="center"
  //     >
  //       <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
  //         הקובץ הועלה
  //       </MDTypography>

  //       <DialogContent>
  //         <MDTypography
  //           onMouseMove={(e) => window.location.reload()}
  //           variant="h4"
  //           fontWeight="medium"
  //           color="white"
  //           mt={1}
  //         >
  //           {dataStatus.fileName}
  //         </MDTypography>
  //       </DialogContent>
  //     </MDBox>
  //   </Dialog>
  // );
  // const showErrorFile = () => (
  //   <Dialog
  //     open={dataStatus.errorFile}
  //     onClose={handleCloseErrorFileModal}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //   >
  //     <MDBox
  //       variant="gradient"
  //       bgColor="error"
  //       coloredShadow="error"
  //       borderRadius="l"
  //       // mx={2}
  //       // mt={2}
  //       p={3}
  //       // mb={2}
  //       textAlign="center"
  //     >
  //       <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
  //         קובץ לא תקין
  //       </MDTypography>

  //       <DialogContent>
  //         <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
  //           אנא נסה קובץ תקין ממערכת א
  //         </MDTypography>
  //       </DialogContent>
  //     </MDBox>
  //   </Dialog>
  // );
  // const showError = () => (
  //   <Dialog
  //     open={dataStatus.error}
  //     onClose={handleCloseErrorModal}
  //     aria-labelledby="alert-dialog-title"
  //     aria-describedby="alert-dialog-description"
  //   >
  //     <MDBox
  //       variant="gradient"
  //       bgColor="error"
  //       coloredShadow="error"
  //       borderRadius="l"
  //       // mx={2}
  //       // mt={2}
  //       p={3}
  //       // mb={2}
  //       textAlign="center"
  //     >
  //       <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
  //         שגיאה בהעלאת קבצים
  //       </MDTypography>

  //       <DialogContent>
  //         <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
  //           אנא נסה שנית מאוחר יותר
  //         </MDTypography>
  //       </DialogContent>
  //     </MDBox>
  //   </Dialog>
  // );

  const deleteUpload = (id) => {
    axios
      .delete(`http://localhost:5000/NgCar/requsest/deleteUploadFile/${id}`)
      .then((responseData) => {
        setDataStatus({
          ...dataStatus,
          // work_id: res.data,
          // fileName: files[0].name,
          loading: false,
          error: false,
          errorFile: false,
          successmsg: true,
          NavigateToReferrer: false,
        });
        // window.location.reload();
        // showSuccess();
        console.log(responseData);
        // eslint-disable-next-line no-self-assign
        window.location.href = window.location.href;
      })
      .catch((error) => {
        console.log(error);
        setDataStatus({
          ...dataStatus,
          errortype: error.response,
          loading: false,
          error: true,
          errorFile: false,
          NavigateToReferrer: false,
        });
      });
  };
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  // const projectOptions = ["א", "ב", "ג", "ד", "ה", "ו"];
  const getWorkStuts = (value) => {
    let stutus = "בקשה נשלחה";
    let color = "error";
    if (value === 25) {
      stutus = "בקשה נשלחה";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };

  const setTypeRequest = (type) => {
    let typeName = "";
    let color = "mekatnar";
    let urlRequest = "";
    if (type === "ToraHeilit") {
      typeName = "תורה חילית";
      color = "info";
      urlRequest = "toraHeilitrequestForm";
    } else if (type === "HozlaRequest") {
      typeName = "הוצל''א";
      color = "success";
      urlRequest = "RequestForm";
    }
    return [typeName, color, urlRequest];
  };

  const dbRows = requestDB.map((ana, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    fileID: parseInt(ana._id.slice(-4), 36),
    fileName: ana.fileName,
    project: ana.workName,
    clearance:
      // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      clearanceOptions[parseInt(ana.workClearance, 10)],
    // </MDTypography>
    typeRequest: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(ana.typeRequest)[0]}
          color={setTypeRequest(ana.typeRequest)[1]}
          size="sm"
          container
        />
      </>
    ),
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(ana.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(ana.status)[1]}
          value={ana.status >= 125 ? 100 : ana.status}
        />
      </>
    ),
    NameRequester: ana.fullNameAsker,
    personalnumber: ana.personalnumber,
    diliveryDate: (
      <>
        <MDBadge
          badgeContent={ana.rangeOfDates}
          color="secondary"
          size="sm"
          variant="contained"
          container
        />
      </>
    ),
    startDate: ana.createdAt.split("T")[0],
    info: (
      <Link to={`/excelTable/${ana._id}`} key={ana._id}>
        <MDButton
          variant="gradient"
          color="mekatnar"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(ana._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>backup_table</Icon>
        </MDButton>
      </Link>
    ),
    statistics: (
      <Link to={`/AnaOneFile/${ana._id}`} key={ana._id}>
        <MDButton
          variant="gradient"
          color="mekatnar"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(ana._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>line_style</Icon>
        </MDButton>
      </Link>
    ),
    delete: (
      <MDButton
        variant="gradient"
        color="error"
        onClick={() => deleteUpload(ana._id)}
        circular="true"
        iconOnly="true"
        size="medium"
      >
        <Icon>delete</Icon>
      </MDButton>
    ),
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      // { Header: "אסמכתא", accessor: "fileID", align: "center" },
      { Header: "שם הקובץ", accessor: "fileName", align: "center" },
      // { Header: "סוג הבקשה", accessor: "typeRequest", align: "center" },
      { Header: "מ''א של המעלה", accessor: "personalnumber", align: "center" },
      // { Header: "שם העבודה", accessor: "project", align: "center" },
      // { Header: "סיווג העבודה", accessor: "clearance", align: "center" },
      // { Header: "סטטוס", accessor: "status", align: "center" },
      { Header: "תאריך העלאה", accessor: "startDate", align: "center" },
      { Header: "היסטוריית אירועים", accessor: "diliveryDate", align: "center" },
      { Header: "פרטי הקובץ", accessor: "info", align: "center" },
      { Header: "סטטיסטיקה", accessor: "statistics", align: "center" },
      { Header: "מחק", accessor: "delete", align: "center" },
      // { Header: "פרטי הוצלא", accessor: "anaInfo", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
