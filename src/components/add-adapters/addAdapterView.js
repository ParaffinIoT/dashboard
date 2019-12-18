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
  RadioGroup,
} from "@material-ui/core";
import NotificationCustomComponent from "../../components/Notification";
import classnames from "classnames";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
            Add New Adapter
            </Typography>
            <div style={{ width: "400px" }}>
            <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Adapter Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.type}
           onChange={(e)=>props.setTyoe(e.target.value)}
        fullWidth
        >
          <MenuItem value="mqtt">MQTT</MenuItem>
          <MenuItem value="coap">COaP</MenuItem>
          <MenuItem value="http">HTTP</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch checked={props.enabled} onChange={(e)=>props.setEnabled(!props.enabled)} value={props.enabled} color="primary" />
        }
        label="Enable this adapter"
      />
      <br/>
          <FormControl component="fieldset">
      <FormLabel component="legend">Password Type</FormLabel>
      <RadioGroup aria-label="position" name="position" value={props.secretType} onChange={(e)=>props.setSecreteType(e.target.value)} row>
        <FormControlLabel
          value="basic"
          control={<Radio color="primary" />}
          label="Basic"
          labelPlacement="end"
        />
        <FormControlLabel
          value="pbkdf2"
          control={<Radio color="primary" />}
          label="Pbkdf2"
          labelPlacement="end"
        />
        </RadioGroup>
        </FormControl>
        <TextField
                required
                id="standard-required"
                label="Required"
                placeholder="Password"
                value={props.password}
                onChange={(e)=>props.setPassword(e.target.value)
                }
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                    type:"password"
                }}
              />

<MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Starts After"
          value={props.startAfter}
          onChange={(date)=>props.setStartAfter(date)}
          InputLabelProps={{
              shrink:true
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Expires Before"
          value={props.expiredBefore}
          onChange={(date)=>props.setExpiredBefore(date)}
          InputLabelProps={{
            shrink:true
        }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </div>
    </MuiPickersUtilsProvider>
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
                disabled={!props.type || !props.password}
              >
                Add Adapter
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
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export default withStyles(styles, { withTheme: true })(AddAdapter);
