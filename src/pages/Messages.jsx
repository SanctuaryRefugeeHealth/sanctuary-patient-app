import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";
import { useLocation } from "react-router-dom";
import { getCommunications } from "../services/messages";
import { formatDatetime, formatPhoneNumber } from "../utils/format";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(5),
  },
  table: {
    minWidth: 650,
  },
  replyRow: {
    backgroundColor: "lightGrey",
  },
  button: {
    marginBottom: "8px",
  },
}));

export default function Messages() {
  const classes = useStyles();
  const [rows, setData] = useState([]);
  const location = useLocation();
  const appointmentId = location.pathname.split("/").pop();

  useEffect(() => {
    getCommunications(appointmentId).then((resp) => {
      const messages = resp.messages.map((o) => {
        return {
          sender: "Sanctuary",
          body: o.messageBody,
          datetime: o.timeSent,
          lang: o.language,
        };
      });
      const replies = resp.replies.map((o) => {
        return {
          sender: formatPhoneNumber(o.phoneNumber),
          body: o.body,
          datetime: o.time,
          lang: "",
          isReply: true,
        };
      });

      // Sort by time. Newest messagest at the top.
      const rows = [...messages, ...replies].sort((a, b) => {
        if (b.datetime > a.datetime) {
          return 1;
        } else if (b.datetime < a.datetime) {
          return -1;
        }
        return 0;
      });

      setData(rows);
    });
  }, [appointmentId]);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Date/Time</TableCell>
            <TableCell align="right">Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              className={row.isReply ? classes.replyRow : null}
            >
              <TableCell component="th" scope="row">
                {row.sender}
              </TableCell>
              <TableCell>{row.body}</TableCell>
              <TableCell align="right">
                {formatDatetime(row.datetime)}
              </TableCell>
              <TableCell align="right">{row.lang}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
