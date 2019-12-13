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
  TextField
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
  const [confirmed, setConfirmed] = useState("");
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAppointments().then(resp => setData(resp));
  }, [setData]);

  const filteredRows = rows
    .filter(
      row =>
        !searchText ||
        row.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        row.practitionerName.toLowerCase().includes(searchText.toLowerCase()) ||
        row.clinicName.toLowerCase().includes(searchText.toLowerCase()) ||
        row.clinicAddress.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(
      row =>
        !confirmed ||
        (confirmed === "Yes" && row.confirmed) ||
        (confirmed === "No" && !row.confirmed)
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
            value={confirmed}
            onChange={e => setConfirmed(e.target.value)}
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
