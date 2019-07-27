import React, { Fragment } from "react";
import "date-fns";
import Header from "../../components/Header/HeaderContainer";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  Button,
  TextField,
  FormControl,
  MenuItem,
  CircularProgress,
  Fade,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationCustomComponent from "../../components/Notification";
import classnames from "classnames";
import Downshift from "downshift";
import PropTypes from "prop-types";


////start/////

function renderInput(inputProps) {
  const { InputProps, classes, ref, onChange, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    (selectedItem || "").indexOf(suggestion.get("clientName")) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.get("clientName")}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.get("clientName")}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

////end//////

const AddClient = ({ classes, ...props }) => {
  return (
    <Fragment>
      <Header />
      <Grid container className={classes.container}>
        <div style={{ position: "relative", marginTop: "100px" }}>
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
            <Downshift
              id="downshift-simple"
              onChange={async value => {
                await props.setClientName(value);
                props.checkIfAdapterTypeExist();
              }}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem
              }) => {
                const { onBlur, onFocus, ...inputProps } = getInputProps({
                  placeholder: "Select or provide new client",
                  onChange: async e => {
                    await props.setClientName(e.target.value);
                    props.checkIfAdapterTypeExist();
                  },
                  value: props.clientName,
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                });

                return (
                  <div className={classes.autoCompleteContainer}>
                    {renderInput({
                      fullWidth: true,
                      classes,
                      label: "Client",
                      InputLabelProps: getLabelProps({
                        shrink: true,
                        className: classes.clientLabel
                      }),
                      InputProps: { onBlur, onFocus },
                      inputProps
                    })}
                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <Paper className={classes.autoCompletePaper} square>
                          {props
                            .getSuggestions(inputValue)
                            .map((suggestion, index) =>
                              renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({
                                  item: suggestion.get("clientName")
                                }),
                                highlightedIndex,
                                selectedItem
                              })
                            )}
                        </Paper>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Downshift>
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
                  control={<Radio disabled={props.httpExist} />}
                  label="HTTP"
                  classes={{
                    root: classes.labelRoot,
                    label: classes.labelLabel
                  }}
                />
                <FormControlLabel
                  value="mqtt"
                  control={<Radio disabled={props.mqttExist} />}
                  label="MQTT"
                  classes={{
                    root: classes.labelRoot,
                    label: classes.labelLabel
                  }}
                />
                <FormControlLabel
                  value="coap"
                  control={<Radio disabled={props.coapExist} />}
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

                <div>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={props.currentTopic.length == 0}
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
              </div>
              <div className={classes.demo}>
                <List
                  dense={true}
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
                          <DeleteIcon
                            color="error"
                            onClick={() => {
                              let topics = props.topics;
                              topics.splice(index, 1);
                              props.setTopics(topics);
                            }}
                          />
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </FormControl>
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
                disabled={
                  !props.clientName || props.topics.length ==0 || !props.adapter
                }
              >
                Add Client
              </Button>
            )}
          </Paper>
        </div>
      </Grid>
    </Fragment>
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
    marginTop: 10,
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    maxWidth: 340,
    width: "90%",
    minWidth: 310,
    display: "absolute"
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
    marginTop: theme.spacing(3)
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
  },

  autoCompleteContainer: {
    flexGrow: 1,
    position: "relative",
    width: "100%"
  },
  autoCompletePaper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  autoCompleteChip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "100%",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  },
  clientLabel: {
    fontSize: "1.4rem"
  }
});

export default withStyles(styles, { withTheme: true })(AddClient);
