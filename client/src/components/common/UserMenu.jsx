import LogOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menuConfigs.js";
import { setUser } from "../../redux/features/userSlice.jsx";

const UserMenu = () => {
  return (
    <div>UserMenu</div>
  )
}

export default UserMenu