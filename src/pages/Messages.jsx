import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  replyRow: {
    backgroundColor: "lightGrey"
  }
});

function createMessageData(body, datetime, lang) {
  return { sender: "Sanctuary", body, datetime, lang };
}

const messages = [
  createMessageData(
    "a fourth message body sent by sancturary",
    moment()
      .subtract(1, "days")
      .format(),
    "English"
  ),
  createMessageData(
    "a third message body sent by sancturary",
    moment()
      .subtract(10, "days")
      .format(),
    "English"
  ),
  createMessageData(
    "a second message body sent by sancturary",
    moment()
      .subtract(11, "days")
      .format(),
    "English"
  ),
  createMessageData(
    "a message body sent by sancturary",
    moment()
      .subtract(20, "days")
      .format(),
    "English"
  )
];

function createReplyData(phone_number, body, datetime) {
  return { sender: phone_number, body, datetime, lang: "", isReply: true };
}
const replies = [
  createReplyData(
    "(123) 456-7890",
    "a third reply body sent by the patient",
    moment()
      .subtract(2, "days")
      .format()
  ),
  createReplyData(
    "(123) 456-7890",
    "a second reply body sent by the patient",
    moment()
      .subtract(4, "days")
      .format()
  ),
  createReplyData(
    "(123) 456-7890",
    "a reply body sent by the patient",
    moment()
      .subtract(15, "days")
      .format()
  )
];

const rows = [...messages, ...replies].sort(function(a, b) {
  return new moment(b.datetime) - new moment(a.datetime);
});

console.log("rows", rows);

export default function Messages() {
  const classes = useStyles();

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
          {rows.map(row => (
            <TableRow
              key={row.name}
              className={row.isReply ? classes.replyRow : null}
            >
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
  );
}
