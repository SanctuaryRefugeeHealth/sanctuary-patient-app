import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  TableSortLabel,
  Button,
} from "@material-ui/core";
import { getAppointments, getResponseText } from "../services/appointments";
import PaginationActions from "../components/PaginationActions";
import { formatDatetime, formatPhoneNumber } from "../utils/format";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(15),
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    height: 80,
    [theme.breakpoints.up("sm")]: {
      height: 40,
    },
  },
}));

const initHeaders = [
  {
    label: "Patient",
    field: "patientName",
    direction: undefined, // desc or asc,
  },
  {
    label: "Phone",
    field: "patientPhoneNumber",
    direction: undefined, // desc or asc,
  },
  {
    label: "Address",
    field: "practitionerAddress",
    direction: undefined, // desc or asc,
  },
  {
    label: "Date",
    field: "appointmentTime",
    direction: "desc", // Current default sorting on load
  },
  {
    label: "Language",
    field: "patientLanguage",
    direction: undefined,
  },
  {
    label: "Response",
    field: "response",
    direction: undefined, // desc or asc,
  },
];

const getNewDirection = (oldDirection) => {
  if (oldDirection === "asc") return "desc";
  if (oldDirection === "desc") return "asc";
  return "desc";
};

export default function Appointments() {
  const classes = useStyles();
  const [rows, setData] = useState([]);
  const [confirmed, setConfirmed] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [headers, setHeaders] = useState(initHeaders);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const onHeaderClick = (i) => {
    const direction = getNewDirection(headers[i].direction);
    /**
     * Iterate over headers and reset them all to default, except the one modified,
     * as there is no multi header sorting.
     */
    setHeaders((prev) => {
      return prev.map((header, index) => {
        if (index === i) {
          return {
            ...header,
            direction,
          };
        }
        return {
          label: header.label,
          field: header.field,
        };
      });
    });
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

  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await getAppointments();
      appointments.forEach((appointment) => {
        appointment.response = getResponseText(
          appointment.appointmentIsConfirmed
        );
      });
      // Sort on appointmentTime desc by default
      appointments.sort((a, b) => {
        return b["appointmentTime"] > a["appointmentTime"]
          ? 1
          : -1;
      });
      setData(appointments);
    }
    fetchAppointments();
  }, [setData]);

  useEffect(() => {
    setFilteredRows(
      rows
        .filter(
          (row) =>
            !searchText ||
            row.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
            row.patientPhoneNumber
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            row.patientLanguage
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            row.practitionerAddress
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
        .filter((row) => {
          switch (confirmed) {
            case "All":
              return true;
            default:
              return row.response === confirmed;
          }
        })
    );
  }, [searchText, confirmed, rows]);

  return (
    <div className={classes.root}>
      <Box p={1} display="flex">
        <TextField
          type="search"
          label="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <FormControl style={{ marginLeft: "auto" }}>
          <InputLabel id="confirmed">Response?</InputLabel>
          <Select
            labelId="confirmed"
            value={confirmed}
            onChange={(e) => setConfirmed(e.target.value)}
            style={{ width: "200px", marginRight: 10 }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>
            <MenuItem value="All">All</MenuItem>
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
              <TableCell key={i}>
                <TableSortLabel
                  direction={header.direction}
                  active={false}
                  onClick={() => onHeaderClick(i)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? filteredRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredRows
          ).map((row) => (
            <TableRow
              key={row.appointmentId}
              hover
              onClick={() => history.push(`/appointments/${row.appointmentId}`)}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell>{formatPhoneNumber(row.patientPhoneNumber)}</TableCell>
              <TableCell>{row.practitionerAddress}</TableCell>
              <TableCell>{formatDatetime(row.appointmentTime)}</TableCell>
              <TableCell>{row.patientLanguage}</TableCell>
              <TableCell>{row.response}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={7}
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
