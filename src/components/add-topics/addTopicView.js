import React, { Fragment } from "react";
import "date-fns";
import {
  Grid,
  Typography,
  withStyles,
  Button,
  TextField,
  CircularProgress,
  Fade,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Switch,
  Radio,
  FormLabel,
  RadioGroup
} from "@material-ui/core";
import NotificationCustomComponent from "../../components/Notification";
import classnames from "classnames";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const AddAdapter = ({ classes, ...props }) => {
  return (
    <Fragment>
      {/* <Header /> */}
      <Grid container className={classes.container}>
        <div style={{ position: "relative", marginTop: "40px" }}>
          <Fade in={!props.error}>
            <Typography color="secondary" className={classes.errorMessage}>
              {props.errorMsg}
            </Typography>
          </Fade>
          {props.isSuccess && (
            <NotificationCustomComponent
              className={classes.notificationItem}
              shadowless
              type="customer"
              message="Adapter added"
              variant="contained"
              color="success"
            />
          )}
          <div>
            <Typography
              variant="h4"
              color="primary"
              className={classnames(classes.textRow)}
            >
              Add Topic
            </Typography>
            <div style={{ width: "400px" }}>
              <TextField
                required
                id="standard-required"
                label="Required"
                placeholder="Topic"
                value={props.topic}
                onChange={e => props.setTopic(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Adapter Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.adapter}
                  onChange={e => props.setAdapter(e.target.value)}
                  fullWidth
                >

                  {props.client.adapters.map((value, index)=> <MenuItem key={index} value={value.type}>{value.type.toUpperCase()}</MenuItem>)}

                </Select>
              </FormControl>
              <br />
              <FormControl
                component="fieldset"
                className={classnames(classes.formControl)}
              >
                <FormLabel component="legend">Action</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={props.action}
                  onChange={e => props.setAction(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="allow"
                    control={<Radio color="primary" />}
                    label="Allow"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="disallow"
                    control={<Radio color="primary" />}
                    label="Disallow"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl
                component="fieldset"
                className={classnames(classes.formControl)}
              >
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={props.type}
                  onChange={e => props.setType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="rw"
                    control={<Radio color="primary" />}
                    label="Read/Write"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="r"
                    control={<Radio color="primary" />}
                    label="Read"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {props.isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                style={{ marginTop: "25px" }}
                variant="contained"
                color="primary"
                size="small"
                className={classes.backButton}
                onClick={props.handleAddAdapterButtonClick}
                disabled={!props.topic || !props.adapter}
              >
                Add Topic
              </Button>
            )}
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

const styles = theme => ({
  textRow: {
    marginBottom: theme.spacing.unit * 3,
    textAlign: "center"
  },

  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: "1rem"
  },
  formControl: { marginTop: theme.spacing.unit * 2 },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  grid: {
    display: "flex",
    justifyContent: "space-between"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  errorMessage: {
    textAlign: "center"
  },
  notificationItem: {
    marginBottom: theme.spacing.unit * 3,
    width: "100%"
  },
  textField: {
    marginTop: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

export default withStyles(styles, { withTheme: true })(AddAdapter);
