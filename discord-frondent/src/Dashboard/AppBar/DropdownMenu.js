import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../utils/auth";
import { getActions } from "../../app/actions/roomActions";

function BasicMenu({ audioOnly, setAudioOnly }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAudioOnlyChange = () => {
     setAudioOnly(!audioOnly)
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={handleAudioOnlyChange}>
          {audioOnly ? "Audio Only Enabled" : "Audio Only Disabled"}
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BasicMenu);
