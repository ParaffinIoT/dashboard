import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Card,
  Popover,
  Typography
} from "@material-ui/core";
import { Button } from "../Wrappers/Wrappers";

const TopicsTable = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showConfirmDelete = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeConfirmDelete = () => {
     setAnchorEl(null);
  };

  const rect = anchorEl && anchorEl.getBoundingClientRect();


  const id = open ? "topic-delete" : undefined;
  const open = Boolean(anchorEl)
  return (
    <React.Fragment>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <Card>
            <div style={{ padding: "25px 15px" }}>
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
                  {props.data.map(({ topic, action, type }, index) => (
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
                        <div style={{ position: "relative" }}>
                          <Button
                            color="secondary"
                            size="small"
                            className="px-2"
                            variant="contained"
                            aria-disabled={false}
                            id={topic}
                            onClick={showConfirmDelete}
                            key={topic}
                          >
                            Delete
                          </Button>
                          <Popover
                            id={id}
                            // style={style}
                            open={open}
                             anchorEl={anchorEl}
                            onClose={closeConfirmDelete}
                            anchorReference="anchorPosition"
                            anchorPosition={rect?{ top: rect.top -
                              rect.height -
                              80, left: rect.left - 130 }:null}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <div>
                              <div style={{ padding: "13px" }}>
                                <Typography>
                                  Are you sure you want to delete this topic?
                                </Typography>
                              </div>
                              <div
                                style={{
                                  padding: "2px 8px 7px 0px",
                                  float: "right"
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                  onClick={() =>
                                    props.fn({
                                      clientData: props.clientData,
                                      adapter: props.adapter,
                                      topic
                                    })
                                  }
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  onClick={closeConfirmDelete}
                                >
                                  No
                                </Button>
                              </div>
                            </div>
                          </Popover>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>{" "}
            </div>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TopicsTable;
