import React from "react";
import {
  Grid,
  withStyles,
  Button,
  Modal,
  Fade,
  IconButton,
  Icon
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/WidgetContainer";
import CloseIcon from "@material-ui/icons/Close";
import AddAdapter from "../../components/add-adapters";
import moment from "moment";

const AdaptersPage = ({ classes, ...props }) => {
  const [adapterData, setAdapterData] = React.useState(null);
  return (
    <React.Fragment>
      <PageTitle
        title="Adapters"
        button="Add Adapter"
        onBtnClick={() => {
          setAdapterData(null);
          props.openAddAdapter(true);
        }}
      />
      <Grid container spacing={4}>
        {props.client.adapters &&
          props.client.adapters.map((value, index) => {
            return (
              <Grid item md={4} sm={6} xs={12}>
                <Widget
                  title={value.type.toUpperCase()}
                  /* disableWidgetMenu */ menus={[
                    {
                      title: "Edit",
                      onClick: () => {
                        setAdapterData(value);
                        props.openAddAdapter(true);
                      }
                    },
                    {
                      title: "Delete",
                      onClick: () =>
                        props.deleteAdapter({
                          type: value.type,
                          clientData: props.client
                        })
                    }
                  ]}
                >
                  <div className={classes.dashedBorder}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        Enabled
                      </Grid>
                      <Grid item xs={6}>
                        {value.enabled ? "Yes" : "No"}
                      </Grid>
                      <Grid item xs={6}>
                        Secret Type
                      </Grid>
                      <Grid item xs={6}>
                        {value.secret.type}
                      </Grid>
                      <Grid item xs={6}>
                        Start After
                      </Grid>
                      <Grid item xs={6}>
                        {value.secret.startAfter
                          ? moment(value.secret.startAfter).format("YYYY/MM/DD")
                          : "N/A"}
                      </Grid>
                      <Grid item xs={6}>
                        Expired Before
                      </Grid>
                      <Grid item xs={6}>
                        {value.secret.expiredBefore
                          ? moment(value.secret.expiredBefore).format(
                              "YYYY/MM/DD"
                            )
                          : "N/A"}
                      </Grid>
                    </Grid>
                  </div>
                  {/* <Button>View Topics</Button> */}
                </Widget>
              </Grid>
            );
          })}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.isOpen}
          onClose={() => {
            setAdapterData(null);
            props.openAddAdapter(false);
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}
        >
          <Fade in={props.isOpen}>
            <div>
              <div style={{ float: "right", marginRight: "10px" }}>
                <IconButton
                  edge="end"
                  aria-label="Close"
                  onClick={() => {
                    setAdapterData(null);
                    props.openAddAdapter(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className={classes.paper}>
                <AddAdapter adapterData={adapterData} />
              </div>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </React.Fragment>
  );
};

const styles = theme => ({
  titleBold: {
    fontWeight: 600
  },
  iconsBar: {
    marginBottom: theme.spacing.unit * 4,
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.text.hint + "80"
  },
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit
  },
  text: {
    marginBottom: theme.spacing.unit * 2
  },
  paper: {
    width: "90vw",
    maxWidth: "500px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.customShadows.widgetDark,
    paddingBottom: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    top: `25%`,
    margin: "auto"
    // transform: `translate(-10%, -10%)`,
  }
});

export default withStyles(styles, { withTheme: true })(AdaptersPage);
