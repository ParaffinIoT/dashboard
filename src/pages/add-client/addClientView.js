import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Header from "../../components/Header/HeaderContainer";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Chip,
  Checkbox,
  CircularProgress,
  Fade,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationCustomComponent from "../../components/Notification";
import { green } from "@material-ui/core/colors";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const adapterList = ["mqtt", "http", "coap"];
function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const AddClient = ({ classes, ...props }) => {
  return (
    <Grid container className={classes.container}>
      <Header />
      <Fade in={props.error}>
        <Typography color="secondary" className={classes.errorMessage}>
          {props.errorMsg}
        </Typography>
      </Fade>

      {props.isSuccess && (
        <NotificationCustomComponent
          className={classes.notificationItem}
          shadowless
          type="customer"
          message="New client added"
          variant="contained"
          color="success"
        />
      )}

      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h4"
          color="primary"
          className={classnames(classes.textRow)}
        >
          Add New Client
        </Typography>
        <TextField
          placeholder="Client Name"
          className={classnames(classes.textRow)}
          onChange={e => props.setClientName(e.target.value)}
          value={props.clientName}
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          fullWidth
        />
        <FormControl
          component="fieldset"
          className={classes.radioFormControl}
          fullWidth
        >
          <FormLabel component="legend">Adapter</FormLabel>

          <RadioGroup
            aria-label="Gender"
            name="adapter"
            className={classes.group}
            value={props.adpter}
            onChange={props.addAdapter}
            row
          >
            <FormControlLabel
              value="http"
              control={<Radio />}
              label="HTTP"
              classes={{
                root: classes.labelRoot,
                label: classes.labelLabel
              }}
            />
            <FormControlLabel
              value="mqtt"
              control={<Radio />}
              label="MQTT"
              classes={{
                root: classes.labelRoot,
                label: classes.labelLabel
              }}
            />
            <FormControlLabel
              value="coap"
              control={<Radio />}
              label="COAP"
              classes={{
                root: classes.labelRoot,
                label: classes.labelLabel
              }}
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          fullWidth
          className={classes.radioFormControl}
        >
          <FormLabel component="legend">Topics</FormLabel>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              placeholder="Topic, eg garden/lamp"
              className={classnames(classes.textRow)}
              value={props.currentTopic}
              onChange={e => props.setCurrentTopic(e.target.value)}
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              fullWidth
            />

            {/* <Button
            style={{ marginRight: "auto", marginLeft: "auto" }}
            color="primary"
            size="small"
            className={classes.backButton}
            onClick={props.handleAddClientButtonClick}
          >
            Add Topic
          </Button> */}
            <Button
              variant="contained"
              size="small"
              onClick={props.addTopic}
              style={{
                height: "31px",
                marginLeft: "15px",
                paddingRight: "15px"
              }}
            >
              <AddIcon className={classes.iconSmall} />
              Add
            </Button>
          </div>
          <div className={classes.demo}>
            <List
              dense={true}
              fullWidth
              disablePadding={true}
              classes={{ dense: classes.dense }}
            >
              {props.topics.map((value, index) => {
                return (
                  <ListItem
                    dense={true}
                    classes={{ dense: classes.dense }}
                    key={index}
                  >
                    <ListItemText primary={value} />

                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </FormControl>

        {/* <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          className={classes.textRow}
        >
          <Grid container className={classes.grid} justify="space-around">
            <KeyboardDatePicker
              className={classes.textRow}
              margin="normal"
              style={{ width: "49%" }}
              id="mui-pickers-date"
              label="Start after"
              value={props.startAfter}
              onChange={value => props.setStartAfter(value)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardDatePicker
              className={classes.textRow}
              margin="normal"
              style={{ width: "49%" }}
              id="mui-pickers-date"
              label="Expires before"
              value={props.expiredBefore}
              onChange={value => props.setExpiredBefore(value)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider> */}
        {props.isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            style={{ marginTop: "25px" }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.backButton}
            onClick={props.handleAddClientButtonClick}
            classes={{
              containedPrimary: {
                fontSize: classes.buttonText
              }
            }}
          >
            Add Client
          </Button>
        )}
      </Paper>
    </Grid>
  );
};

const styles = theme => ({
  container: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    //  backgroundColor: theme.palette.primary.main,
  },
  logotype: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 12,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  paperRoot: {
    boxShadow: theme.customShadows.widgetDark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 90,
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    width: 340
  },
  textRow: {
    marginBottom: theme.spacing.unit * 3,
    textAlign: "center"
  },

  safetyText: {
    fontWeight: 300,
    color: theme.palette.text.hint
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: "1rem"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120,
    maxWidth: 300
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
    width: 460
  },
  radioFormControl: {
    margin: theme.spacing(1)
  },
  group: {
    width: 360
  },
  labelRoot: {
    fontSize: "0.9rem"
  },
  labelLabel: {
    fontSize: "0.9rem"
  },
  iconSmall: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: "-25px"
  },
  buttonText: {
    fontSize: "0.5rem"
  }
});

export default withStyles(styles, { withTheme: true })(AddClient);
