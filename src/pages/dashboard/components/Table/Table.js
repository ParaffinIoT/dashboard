import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import { Button } from "../../../../components/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary"
};

const TableComponent = ({ data }) => {
 // delete "id" key
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell>Topic</TableCell>
          <TableCell>Action</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ topic, action, type }, index) => (
          <TableRow key={index}>
            <TableCell className="pl-3 fw-normal">{topic}</TableCell>
            <TableCell>{action}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>
              <Button
                color="warning"
                size="small"
                className="px-2"
                variant="contained"
              >
                Edit
              </Button>
            </TableCell>
            <TableCell>
              <Button
                color="secondary"
                size="small"
                className="px-2"
                variant="contained"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
