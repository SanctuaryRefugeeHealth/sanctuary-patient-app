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
  TableSortLabel,
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

const initHeaders = [
  {
    label: "Patient",
    field: "patientName",
    direction: undefined // desc or asc,
  },
  {
    label: "Phone",
    field: "patientPhone",
    direction: undefined // desc or asc,
  },
  {
    label: "Practitioner",
    field: "practitionerName",
    direction: undefined // desc or asc,
  },
  {
    label: "Clinic",
    field: "clinicName",
    direction: undefined // desc or asc,
  },
  {
    label: "Address",
    field: "clinicAddress",
    direction: undefined // desc or asc,
  },
  {
    label: "Date",
    field: "date",
    direction: undefined // desc or asc,
  },
  {
    label: "Confirmed",
    field: "confirmed",
    direction: undefined // desc or asc,
  }
];

const getNewDirection = oldDirection => {
  if (oldDirection === "asc") return "desc";
  if (oldDirection === "desc") return undefined;
  return "asc";
};

export default function Appointments() {
  const classes = useStyles();
  const [rows, setData] = useState([]);
  const [confirmed, setConfirmed] = useState("");
  const [searchText, setSearchText] = useState("");
  const [headers, setHeaders] = useState(initHeaders);
  const history = useHistory();
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    getAppointments().then(resp => setData(resp));
  }, [setData]);

  useEffect(() => {
    setFilteredRows(
      rows
        .filter(
          row =>
            !searchText ||
            row.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
            row.patientPhone.toLowerCase().includes(searchText.toLowerCase()) ||
            row.practitionerName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            row.clinicName.toLowerCase().includes(searchText.toLowerCase()) ||
            row.clinicAddress.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter(
          row =>
            !confirmed ||
            (confirmed === "Yes" && row.confirmed) ||
            (confirmed === "No" && !row.confirmed)
        )
    );
  }, [searchText, confirmed, rows]);

  const onHeaderClick = i => {
    const direction = getNewDirection(headers[i].direction);
    setHeaders(prev => [
      ...prev.slice(0, i),
      {
        ...prev[i],
        direction
      },
      ...prev.slice(i + 1)
    ]);
    const { field } = initHeaders[i];
    const sorted = [...rows];
    sorted.sort((a, b) => {
      return direction === "asc"
        ? a[field] > b[field]
          ? 1
          : -1
        : b[field] > a[field]
        ? 1
        : -1;
    });
    setFilteredRows(sorted);
  };

  return (
    <>
      <Box p={1} display="flex">
        <TextField
          type="search"
          label="search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <FormControl style={{ marginLeft: "auto" }}>
          <InputLabel id="confirmed">Confirmed?</InputLabel>
          <Select
            labelId="confirmed"
            value={confirmed}
            onChange={e => setConfirmed(e.target.value)}
            style={{ width: "200px", marginRight: 10 }}
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
        >
          New Appointment
        </Button>
      </Box>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell>
                <TableSortLabel
                  direction={header.direction}
                  active={header.direction}
                  onClick={() => onHeaderClick(i)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map(row => (
            <TableRow
              key={row.id}
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
