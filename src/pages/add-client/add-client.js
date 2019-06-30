import React from "react";
import { Link } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Header from "../../components/Header";
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
  ListItemText,
  Input,
  MenuItem,
  Chip,
  Checkbox
} from "@material-ui/core";
import classnames from "classnames";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const adapterList = ["mqtt", "http", "coap"];

const AddClient = ({ classes }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [adapters, setAdapters] = React.useState([]);

  function handleChangeMultiple(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setAdapters(value);
  }

  function handleChange(event) {
    setAdapters(event.target.value);
  }

  return (
    <Grid container className={classes.container}>
      <Header />
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
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          fullWidth
        />
        <FormControl
          className={classes.formControl}
          className={classes.textRow}
          fullWidth
        >
          <InputLabel htmlFor="select-multiple-chip">Adapters</InputLabel>
          <Select
            multiple
            value={adapters}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" fullWidth />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {adapterList.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={adapters.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider
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
              value={selectedDate}
              onChange={value => setSelectedDate(value)}
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
              value={selectedDate}
              onChange={value => setSelectedDate(value)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.backButton}
        >
          Add Client
        </Button>
      </Paper>
    </Grid>
  );
};

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //  backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0
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
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    width: 360
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
    fontSize: 22
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
  }
});

export default withStyles(styles, { withTheme: true })(AddClient);
