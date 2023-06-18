import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { getCompanyDetailAction } from "../../actions/dashboard/dashboardActions";

const AccountComponent = () => {
  const dispatch = useDispatch();
  const companyDetails = useSelector(
    (state) => state.dashboardReducer.companyDetails
  );
  const loading = useSelector((state) => state.dashboardReducer.loading);

  useEffect(() => {
    dispatch(getCompanyDetailAction());
  }, [dispatch]);
  // useEffect(() => {
  //   const fetchCompanyDetails = async () => {
  //     try {
  //       await dispatch(getCompanyDetailAction());
  //     } catch (error) {
  //       console.log(error, "from account component");
  //     }
  //   };

  //   fetchCompanyDetails();
  // }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="text-blue"
            sx={{ fontWeight: "bold" }}
          >
            Account Dashboard
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                ) : companyDetails ? (
                  <>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{companyDetails.fullName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Company</TableCell>
                      <TableCell>{companyDetails.companyName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      <TableCell>{companyDetails.role}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{companyDetails.workEmail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Register Since</TableCell>
                      <TableCell>{companyDetails.createdAt}</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountComponent;
