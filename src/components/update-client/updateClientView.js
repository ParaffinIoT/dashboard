import React, { Fragment } from "react";
import "date-fns";
import Header from "../Header/HeaderContainer";
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
  Popover
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import NotificationCustomComponent from "../Notification/Notification";
import EditableTextField from "../editableTextField/editableTextField";
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

const UpdateClient = ({ classes, selectedClient, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clientName, setClientName] = React.useState(null);
  const [adapters, setAdapters] = React.useState(null);
  const [selectedAdapter, setSelectedAdapter] = React.useState(null);
  const [adpterTopics, setAdapterTopics] = React.useState(null);
  const [currentlyEditting, setCurrentlyEditting] = React.useState(null);

  React.useEffect(() => {
    setClientName(selectedClient ? selectedClient.get("clientName") : null);
    setAdapters(selectedClient ? selectedClient.get("adapters") : null);
  }, [selectedClient]);

  const showConfirmDelete = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeConfirmDelete = () => {
    setAnchorEl(null);
  };

  const deleteAdapter = () => {
    let adapterDataIndex =
      adapters && adapters.findIndex(value => value.type === selectedAdapter);
    let cloneAdapters = [...adapters];
    cloneAdapters.splice(adapterDataIndex, 1);
    props.updateClient({
      clientName,
      adapters: cloneAdapters,
      className: selectedClient.className,
      clientId: selectedClient.id
    });
  };

  const updateAdapter = () => {
    if (selectedAdapter === null) {
      props.updateClient({
        clientName,
        adapters,
        className: selectedClient.className,
        clientId: selectedClient.id
      });
    } else {
      let cloneAdapters = [...adapters];
      let adapterDataIndex = cloneAdapters.findIndex(
        value => value.type === selectedAdapter
      );
      cloneAdapters[adapterDataIndex].topics = adpterTopics;
      props.updateClient({
        clientName,
        adapters: cloneAdapters,
        className: selectedClient.className,
        clientId: selectedClient.id
      });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
              message="Client has been updated"
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
              {/* {props.adapterClientName?"Add New Adapter": " Add New Client"} */}
              Edit Client
            </Typography>
            <Downshift
              id="downshift-simple"
              onChange={async value => {
                await props.setClientName(value);
                props.checkIfAdapterTypeExist();
              }}
              initialInputValue={props.adapterClientName}
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
                    await setClientName(e.target.value);
                    // props.checkIfAdapterTypeExist();
                  },
                  value: clientName,
                  //  disabled: props.adapterClientName ? true : false,
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
              <FormLabel component="legend">Choose adapter to edit</FormLabel>

              <RadioGroup
                aria-label="adapter"
                name="adapter"
                className={classes.group}
                value={props.adpter}
                onChange={e => {
                  setSelectedAdapter(e.target.value);
                  let adapterData = adapters.find(
                    value => value.type === e.target.value
                  );
                  let topics = adapterData && adapterData.topics;
                  setAdapterTopics(topics);
                }}
                row
              >
                {props.httpExist && (
                  <FormControlLabel
                    value="http"
                    control={<Radio />}
                    label="HTTP"
                    classes={{
                      root: classes.labelRoot,
                      label: classes.labelLabel
                    }}
                  />
                )}

                {props.mqttExist && (
                  <FormControlLabel
                    value="mqtt"
                    control={<Radio />}
                    label="MQTT"
                    classes={{
                      root: classes.labelRoot,
                      label: classes.labelLabel
                    }}
                  />
                )}

                {props.coapExist && (
                  <FormControlLabel
                    value="coap"
                    control={<Radio />}
                    label="COAP"
                    classes={{
                      root: classes.labelRoot,
                      label: classes.labelLabel
                    }}
                  />
                )}
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
                    disabled={props.currentTopic.length === 0}
                    onClick={() => {
                      let cloned = [...adpterTopics];
                      cloned.push({
                        action: "allow",
                        type: "rw",
                        topic: props.currentTopic
                      });
                      setAdapterTopics(cloned);
                    }}
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
                  {adpterTopics &&
                    adpterTopics.map((value, index) => {
                      return (
                        <ListItem
                          dense={true}
                          classes={{ dense: classes.dense }}
                          key={index}
                        >
                          <EditableTextField
                            defaultValue={value.topic}
                            editMode={index === currentlyEditting}
                            key={value.topic}
                            onChange={topic => {
                              let cloned = [...adpterTopics];
                              cloned[index] = {
                                action: value.action,
                                type: value.type,
                                topic
                              };
                              setAdapterTopics(cloned);
                            }}
                          />

                          {index === currentlyEditting ? (
                            <IconButton edge="end" aria-label="Save">
                              <SaveIcon
                                color="primary"
                                onClick={() => {
                                  setCurrentlyEditting(null);
                                  // let cloned = [...adpterTopics]
                                  // cloned.splice(index, 1);
                                  // setAdapterTopics(cloned);
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton edge="end" aria-label="Edit">
                              <EditIcon
                                color="primary"
                                onClick={() => {
                                  setCurrentlyEditting(index);
                                  // let cloned = [...adpterTopics]
                                  // cloned.splice(index, 1);
                                  // setAdapterTopics(cloned);
                                }}
                              />
                            </IconButton>
                          )}

                          <IconButton edge="end" aria-label="Delete">
                            <DeleteIcon
                              color="secondary"
                              onClick={() => {
                                let cloned = [...adpterTopics];
                                cloned.splice(index, 1);
                                setAdapterTopics(cloned);
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
                style={{ marginTop: "25px", marginRight: "10px" }}
                variant="contained"
                color="primary"
                size="small"
                className={classes.backButton}
                onClick={updateAdapter}
                disabled={
                  !props.clientName ||
                  (adpterTopics && adpterTopics.length === 0) || currentlyEditting !==null
                }
              >
                Update Client
              </Button>
            )}
            <Button
              style={{ marginTop: "25px" }}
              variant="outlined"
              color="secondary"
              size="small"
              className={classes.backButton}
              aria-describedby={id}
              onClick={showConfirmDelete}
              // onClick={props.handleAddClientButtonClick}
              disabled={!props.clientName || selectedAdapter === null}
            >
              Delete Adapter
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={closeConfirmDelete}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              <div>
                <div style={{ padding: "13px" }}>
                  <Typography className={classes.typography}>
                    Are you sure you want to delete this adapter?
                  </Typography>
                </div>
                <div style={{ padding: "2px 8px 7px 0px", float: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "10px" }}
                    onClick={deleteAdapter}
                  >
                    Yes
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={closeConfirmDelete}>
                    No
                  </Button>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

const styles = theme => ({
  container: {
    // width: "100vw",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
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
    paddingRight: theme.spacing.unit * 6
    // maxWidth: 340,
    // width: "90%",
    // minWidth: 310,
    // display: "absolute"
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
    fontSize: "0.9rem"
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
    width: "100%"
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

export default withStyles(styles, { withTheme: true })(UpdateClient);
