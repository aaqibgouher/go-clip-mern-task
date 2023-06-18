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
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
import { getCandidatesAction } from "../../actions/candidate/candidateActions";

const CandidateListComponent = () => {
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidateReducer.candidates);
  const loading = useSelector((state) => state.candidateReducer.loading);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        await dispatch(getCandidatesAction());
      } catch (error) {
        console.log(error, "from candidate list component");
      }
    };

    fetchCandidates();
  }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />

      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" mt={1}>
            <Grid item>
              <Typography
                mb={4}
                variant="h6"
                noWrap
                component="div"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                Candidates List
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/candidate/add">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "2rem" }}
                >
                  <AddIcon />
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Divider />
          {candidates.length > 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Created
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Modified
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow
                      key={candidate._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {candidate._id}
                      </TableCell>
                      <TableCell align="right">{candidate.name}</TableCell>
                      <TableCell align="right">
                        <Chip color="success" label={candidate.status} />
                      </TableCell>
                      <TableCell align="right">{candidate.createdAt}</TableCell>
                      <TableCell align="right">{candidate.updatedAt}</TableCell>
                      <TableCell align="right">
                        <Link to={`/register/${candidate._id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: "2rem" }}
                          >
                            <EditIcon />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ textAlign: "center" }} mt={2} variant="body1">
              No candidates found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CandidateListComponent;
