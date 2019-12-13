import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { APPOINTMENTS } from "../constants/apis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField
} from "@material-ui/core";
import service from "../services/appointments";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default function Appointments() {
  const classes = useStyles();
  const [rows, setData] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    service().then(resp => setData(resp));
  }, [setData]);

  const filteredRows = rows
    .filter(
      row =>
        !searchText ||
        row.patient.toLowerCase().includes(searchText.toLowerCase()) ||
        row.practitioner.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(
      row =>
        !isConfirmed ||
        (isConfirmed === "Yes" && row.isConfirmed) ||
        (isConfirmed === "No" && !row.isConfirmed)
    );

  return (
    <Paper className={classes.root}>
      <Box p={1} display="flex" justifyContent="space-between">
        <TextField
          type="search"
          label="search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Confirmed?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isConfirmed}
            onChange={e => setIsConfirmed(e.target.value)}
            style={{ width: "200px" }}
          >
            <MenuItem value="">&nbsp;</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Practitioner</TableCell>
            <TableCell>Clinic</TableCell>
            <TableCell>Address</TableCell>
            {/* <TableCell >Phone</TableCell> */}
            <TableCell>Address</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Confirmed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.patient}</TableCell>
              <TableCell>{row.practitioner}</TableCell>
              <TableCell>{row.patientPhone}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
