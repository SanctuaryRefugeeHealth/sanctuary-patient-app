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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Button
} from "@material-ui/core";
import { getAppointments } from "../services/appointments";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
  const history = useHistory();

  useEffect(() => {
    getAppointments().then(resp => setData(resp));
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
    <>
      <Box p={1} display="flex" justifyContent="space-between">
        <TextField
          type="search"
          label="search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <FormControl>
          <InputLabel id="confirmed">Confirmed?</InputLabel>
          <Select
            labelId="confirmed"
            value={isConfirmed}
            onChange={e => setIsConfirmed(e.target.value)}
            style={{ width: "200px" }}
          >
            <MenuItem value="">&nbsp;</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained" 
          color="primary" 
          onClick={() => history.push(`/appointments/new`)} 
          className={classes.button}
        >
          New Appointment
        </Button>
      </Box>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Practitioner</TableCell>
            <TableCell>Clinic</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Confirmed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map(row => (
            <TableRow
              key={row.name}
              hover
              onClick={() => history.push(`/appointments/${row.id}`)}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell>{row.patientPhone}</TableCell>
              <TableCell>{row.practitionerName}</TableCell>
              <TableCell>{row.clinicName}</TableCell>
              <TableCell>{row.clinicAddress}</TableCell>
              <TableCell>{moment(row.date).format("ll")}</TableCell>
              <TableCell>{row.confirmed ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
