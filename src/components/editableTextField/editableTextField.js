import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 50
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    color: "black",
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  btnIcons: {
    marginLeft: 10
  }
});

class EditableTextField extends React.Component {
  state = {
    email: "johndoe@domain.com",
    editMode: false,
    // mouseOver: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event.target.value);
  };

  handleMouseOver = event => {
    if (!this.state.mouseOver) {
      this.setState({ mouseOver: true });
    }
  };

  handleMouseOut = event => {
    // The problem is here!!!
    if (this.state.mouseOver) {
      this.setState({ mouseOver: false });
      this.setState({ editMode: false });
    }
  };

  handleClick = () => {
    this.setState({
      editMode: true,
      mouseOver: false
    });
  };

  onChange;

  render() {
    const { classes, defaultValue, editMode } = this.props;

    return (
      <TextField
        name="email"
        defaultValue={defaultValue}
        margin="normal"
        error={this.state.email === ""}
        onChange={this.handleChange}
        disabled={!editMode}
        className={classes.textField}
        // onMouseEnter={this.handleMouseOver}
        // onMouseLeave={this.handleMouseOut}
        InputProps={{
          fullWidth: true,
          classes: {
            disabled: classes.disabled
          }
          // endAdornment: this.state.mouseOver ? (
          //   <InputAdornment position="end">
          //     <IconButton onClick={this.handleClick}>
          //       <Edit />
          //     </IconButton>
          //   </InputAdornment>
          // ) : (
          //   ""
          // )
        }}
      />
    );
  }
}

export default withStyles(styles)(EditableTextField);
