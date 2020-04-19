import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper
} from "@material-ui/core/";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { getCommunications } from "../services/messages";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(5),
  },
  table: {
    minWidth: 650
  },
  replyRow: {
    backgroundColor: "lightGrey"
  },
  button: {
    marginBottom: "8px"
  }
}));

export default function Messages() {
  const classes = useStyles();
  const [rows, setData] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const appointmentId = location.pathname.split("/").pop();

  useEffect(() => {
    getCommunications(appointmentId).then(resp => {
      const messages = resp.messages.map(o => { return { sender: "Sanctuary", body: o.messageBody, datetime: o.timeSent, lang: o.language } })
      const replies = resp.replies.map(o => { return { sender: o.phoneNumber, body: o.body, datetime: o.time, lang: "", isReply: true } })
      const rows = [...messages, ...replies].sort((a, b) => new moment(b.datetime) - new moment(a.datetime))
      setData(rows)
    });
  }, []);

  return (
    <>
      {/* TODO: sending message manually. block this button unless manual sending is supported.
      <Button
        onClick={() => {
          const appointmentId = location.pathname.split("/").pop();
          history.push(`${appointmentId}/messages/new`);
        }}
        variant="contained"
        color="primary"
        className={classes.button}>
        New Message
      </Button> */}
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
            {rows.map(row => (
              <TableRow
                key={row.name}
                className={row.isReply ? classes.replyRow : null}>
                <TableCell component="th" scope="row">
                  {row.sender}
                </TableCell>
                <TableCell align="right">{row.body}</TableCell>
                <TableCell align="right">{row.datetime}</TableCell>
                <TableCell align="right">{row.lang}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
