import React from "react";
import classnames from "classnames";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
  Popover,
  Typography,
  Button
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";

const Widget = ({
  classes,
  children,
  title,
  menus,
  noBodyPadding,
  bodyClass,
  className,
  disableWidgetMenu,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showConfirmDelete = event => {
    console.log((event.currentTarget));
    
    setAnchorEl(event.currentTarget);
  };

  const closeConfirmDelete = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {props.header ? (
            props.header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => props.setMoreMenuOpen(true)}
                  buttonRef={props.setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={props.isMoreMenuOpen}
        anchorEl={props.moreButtonRef}
        onClose={() => props.setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        {menus &&
          menus.map((value, index) => {
            if (value.title != "Delete") {
              return (
                <MenuItem onClick={value.onClick} key={index}>
                  <Typography>{value.title}</Typography>
                </MenuItem>
              );
            } else
              return (
                <React.Fragment>
                  <MenuItem onClick={showConfirmDelete} key={index}>
                    <Typography>{value.title}</Typography>
                  </MenuItem>
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
                          Are you sure you want to delete {title}?
                        </Typography>
                      </div>
                      <div
                        style={{ padding: "2px 8px 7px 0px", float: "right" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginRight: "10px" }}
                          onClick={value.onClick}
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
                </React.Fragment>
              );
          })}
      </Menu>
    </div>
  );
};

const styles = theme => ({
  widgetWrapper: {
    display: "flex",
    minHeight: "100%"
  },
  widgetHeader: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget
  },
  widgetBody: {
    paddingBottom: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3
  },
  noPadding: {
    padding: 0
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden"
  },
  moreButton: {
    margin: -theme.spacing.unit,
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)"
    }
  }
});

export default withStyles(styles, { withTheme: true })(Widget);
